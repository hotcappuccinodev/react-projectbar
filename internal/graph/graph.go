package graph

import (
	"context"
	"errors"
	"net/http"
	"os"
	"reflect"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/google/uuid"
	"github.com/jordanknott/taskcafe/internal/auth"
	"github.com/jordanknott/taskcafe/internal/config"
	"github.com/jordanknott/taskcafe/internal/db"
	log "github.com/sirupsen/logrus"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// NewHandler returns a new graphql endpoint handler.
func NewHandler(config config.AppConfig, repo db.Repository) http.Handler {
	c := Config{
		Resolvers: &Resolver{
			Config:     config,
			Repository: repo,
		},
	}
	c.Directives.HasRole = func(ctx context.Context, obj interface{}, next graphql.Resolver, roles []RoleLevel, level ActionLevel, typeArg ObjectType) (interface{}, error) {
		role, ok := GetUserRole(ctx)
		if !ok {
			return nil, errors.New("user ID is missing")
		}
		if role == "admin" {
			return next(ctx)
		} else if level == ActionLevelOrg {
			return nil, errors.New("must be an org admin")
		}

		var subjectID uuid.UUID
		in := graphql.GetResolverContext(ctx).Args["input"]
		if typeArg == ObjectTypeProject || typeArg == ObjectTypeTeam {
			val := reflect.ValueOf(in) // could be any underlying type
			fieldName := "ProjectID"
			if typeArg == ObjectTypeTeam {
				fieldName = "TeamID"
			}
			subjectID, ok = val.FieldByName(fieldName).Interface().(uuid.UUID)
			if !ok {
				return nil, errors.New("error while casting subject uuid")
			}
		}

		if level == ActionLevelProject {
			roles, err := GetProjectRoles(ctx, repo, subjectID)
			if err != nil {
				return nil, err
			}
			if roles.TeamRole == "admin" || roles.ProjectRole == "admin" {
				log.WithFields(log.Fields{"teamRole": roles.TeamRole, "projectRole": roles.ProjectRole}).Info("is team or project role")
				return next(ctx)
			}
			return nil, errors.New("must be a team or project admin")
		} else if level == ActionLevelTeam {
			userID, ok := GetUserID(ctx)
			if !ok {
				return nil, errors.New("user id is missing")
			}
			role, err := repo.GetTeamRoleForUserID(ctx, db.GetTeamRoleForUserIDParams{UserID: userID, TeamID: subjectID})
			if err != nil {
				return nil, err
			}
			if role.RoleCode == "admin" {
				return next(ctx)
			}
			return nil, errors.New("must be a team admin")

		}
		return nil, errors.New("invalid path")
	}
	srv := handler.New(NewExecutableSchema(c))
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
	})
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})

	srv.SetQueryCache(lru.New(1000))

	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})
	if isProd := os.Getenv("PRODUCTION") == "true"; isProd {
		srv.Use(extension.FixedComplexityLimit(10))
	} else {
		srv.Use(extension.Introspection{})
	}
	return srv
}

// NewPlaygroundHandler returns a new GraphQL Playground handler.
func NewPlaygroundHandler(endpoint string) http.Handler {
	return playground.Handler("GraphQL Playground", endpoint)
}

func GetUserID(ctx context.Context) (uuid.UUID, bool) {
	userID, ok := ctx.Value("userID").(uuid.UUID)
	return userID, ok
}
func GetUserRole(ctx context.Context) (auth.Role, bool) {
	role, ok := ctx.Value("org_role").(auth.Role)
	return role, ok
}

func GetUser(ctx context.Context) (uuid.UUID, auth.Role, bool) {
	userID, userOK := GetUserID(ctx)
	role, roleOK := GetUserRole(ctx)
	return userID, role, userOK && roleOK
}

func GetRestrictedMode(ctx context.Context) (auth.RestrictedMode, bool) {
	restricted, ok := ctx.Value("restricted_mode").(auth.RestrictedMode)
	return restricted, ok
}

func GetProjectRoles(ctx context.Context, r db.Repository, projectID uuid.UUID) (db.GetUserRolesForProjectRow, error) {
	userID, ok := GetUserID(ctx)
	if !ok {
		return db.GetUserRolesForProjectRow{}, errors.New("user ID is not found")
	}
	return r.GetUserRolesForProject(ctx, db.GetUserRolesForProjectParams{UserID: userID, ProjectID: projectID})
}

func ConvertToRoleCode(r string) RoleCode {
	if r == RoleCodeAdmin.String() {
		return RoleCodeAdmin
	}
	if r == RoleCodeMember.String() {
		return RoleCodeMember
	}
	return RoleCodeObserver
}

func RequireTeamAdmin(ctx context.Context, r db.Repository, teamID uuid.UUID) error {
	userID, role, ok := GetUser(ctx)
	if !ok {
		return errors.New("internal: user id is not set")
	}
	teamRole, err := r.GetTeamRoleForUserID(ctx, db.GetTeamRoleForUserIDParams{UserID: userID, TeamID: teamID})
	isAdmin := role == auth.RoleAdmin
	isTeamAdmin := err == nil && ConvertToRoleCode(teamRole.RoleCode) == RoleCodeAdmin
	if !(isAdmin || isTeamAdmin) {
		return &gqlerror.Error{
			Message: "organization or team admin role required",
			Extensions: map[string]interface{}{
				"code": "2-400",
			},
		}
	} else if err != nil {
		return err
	}
	return nil
}

func RequireProjectOrTeamAdmin(ctx context.Context, r db.Repository, projectID uuid.UUID) error {
	role, ok := GetUserRole(ctx)
	if !ok {
		return errors.New("user ID is not set")
	}
	if role == auth.RoleAdmin {
		return nil
	}
	roles, err := GetProjectRoles(ctx, r, projectID)
	if err != nil {
		return err
	}
	if !(roles.ProjectRole == "admin" || roles.TeamRole == "admin") {
		return &gqlerror.Error{
			Message: "You must be a team or project admin",
			Extensions: map[string]interface{}{
				"code": "4-400",
			},
		}
	}
	return nil
}
