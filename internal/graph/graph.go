package graph

import (
	"context"
	"database/sql"
	"errors"
	"net/http"
	"os"
	"reflect"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/google/uuid"
	"github.com/jordanknott/taskcafe/internal/auth"
	"github.com/jordanknott/taskcafe/internal/db"
	"github.com/jordanknott/taskcafe/internal/logger"
	"github.com/jordanknott/taskcafe/internal/utils"
	log "github.com/sirupsen/logrus"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// NewHandler returns a new graphql endpoint handler.
func NewHandler(repo db.Repository) http.Handler {
	c := Config{
		Resolvers: &Resolver{
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
		in := graphql.GetFieldContext(ctx).Args["input"]
		val := reflect.ValueOf(in) // could be any underlying type
		if val.Kind() == reflect.Ptr {
			val = reflect.Indirect(val)
		}
		var fieldName string
		switch typeArg {
		case ObjectTypeTeam:
			fieldName = "TeamID"
		case ObjectTypeTask:
			fieldName = "TaskID"
		case ObjectTypeTaskGroup:
			fieldName = "TaskGroupID"
		case ObjectTypeTaskChecklist:
			fieldName = "TaskChecklistID"
		case ObjectTypeTaskChecklistItem:
			fieldName = "TaskChecklistItemID"
		default:
			fieldName = "ProjectID"
		}
		logger.New(ctx).WithFields(log.Fields{"typeArg": typeArg, "fieldName": fieldName}).Info("getting field by name")
		subjectField := val.FieldByName(fieldName)
		if !subjectField.IsValid() {
			logger.New(ctx).Error("subject field name does not exist on input type")
			return nil, errors.New("subject field name does not exist on input type")
		}
		if fieldName == "TeamID" && subjectField.IsNil() {
			// Is a personal project, no check
			// TODO: add config setting to disable personal projects
			return next(ctx)
		}
		subjectID, ok = subjectField.Interface().(uuid.UUID)
		if !ok {
			logger.New(ctx).Error("error while casting subject UUID")
			return nil, errors.New("error while casting subject uuid")
		}

		var err error
		if level == ActionLevelProject {
			logger.New(ctx).WithFields(log.Fields{"subjectID": subjectID}).Info("fetching subject ID by typeArg")
			if typeArg == ObjectTypeTask {
				subjectID, err = repo.GetProjectIDForTask(ctx, subjectID)
			}
			if typeArg == ObjectTypeTaskGroup {
				subjectID, err = repo.GetProjectIDForTaskGroup(ctx, subjectID)
			}
			if typeArg == ObjectTypeTaskChecklist {
				subjectID, err = repo.GetProjectIDForTaskChecklist(ctx, subjectID)
			}
			if typeArg == ObjectTypeTaskChecklistItem {
				subjectID, err = repo.GetProjectIDForTaskChecklistItem(ctx, subjectID)
			}
			if err != nil {
				logger.New(ctx).WithError(err).Error("error while getting subject ID")
				return nil, err
			}
			projectRoles, err := GetProjectRoles(ctx, repo, subjectID)
			if err != nil {
				if err == sql.ErrNoRows {
					return nil, &gqlerror.Error{
						Message: "not authorized",
						Extensions: map[string]interface{}{
							"code": "401",
						},
					}
				}
				logger.New(ctx).WithError(err).Error("error while getting project roles")
				return nil, err
			}
			for _, validRole := range roles {
				logger.New(ctx).WithFields(log.Fields{"validRole": validRole}).Info("checking role")
				if CompareRoleLevel(projectRoles.TeamRole, validRole) || CompareRoleLevel(projectRoles.ProjectRole, validRole) {
					logger.New(ctx).WithFields(log.Fields{"teamRole": projectRoles.TeamRole, "projectRole": projectRoles.ProjectRole}).Info("is team or project role")
					return next(ctx)
				}
			}
			return nil, &gqlerror.Error{
				Message: "not authorized",
				Extensions: map[string]interface{}{
					"code": "401",
				},
			}
		} else if level == ActionLevelTeam {
			userID, ok := GetUserID(ctx)
			if !ok {
				return nil, errors.New("user id is missing")
			}
			role, err := repo.GetTeamRoleForUserID(ctx, db.GetTeamRoleForUserIDParams{UserID: userID, TeamID: subjectID})
			if err != nil {
				logger.New(ctx).WithError(err).Error("error while getting team roles for user ID")
				return nil, err
			}
			for _, validRole := range roles {
				if CompareRoleLevel(role.RoleCode, validRole) || CompareRoleLevel(role.RoleCode, validRole) {
					return next(ctx)
				}
			}
			return nil, &gqlerror.Error{
				Message: "not authorized",
				Extensions: map[string]interface{}{
					"code": "401",
				},
			}

		}
		return nil, &gqlerror.Error{
			Message: "bad path",
			Extensions: map[string]interface{}{
				"code": "500",
			},
		}
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

// GetUserID retrieves the UserID out of a context
func GetUserID(ctx context.Context) (uuid.UUID, bool) {
	userID, ok := ctx.Value(utils.UserIDKey).(uuid.UUID)
	return userID, ok
}

// GetUserRole retrieves the user role out of a context
func GetUserRole(ctx context.Context) (auth.Role, bool) {
	role, ok := ctx.Value(utils.OrgRoleKey).(auth.Role)
	return role, ok
}

// GetUser retrieves both the user id & user role out of a context
func GetUser(ctx context.Context) (uuid.UUID, auth.Role, bool) {
	userID, userOK := GetUserID(ctx)
	role, roleOK := GetUserRole(ctx)
	return userID, role, userOK && roleOK
}

// GetRestrictedMode retrieves the restricted mode code out of a context
func GetRestrictedMode(ctx context.Context) (auth.RestrictedMode, bool) {
	restricted, ok := ctx.Value(utils.RestrictedModeKey).(auth.RestrictedMode)
	return restricted, ok
}

// GetProjectRoles retrieves the team & project role for the given project ID
func GetProjectRoles(ctx context.Context, r db.Repository, projectID uuid.UUID) (db.GetUserRolesForProjectRow, error) {
	userID, ok := GetUserID(ctx)
	if !ok {
		return db.GetUserRolesForProjectRow{}, errors.New("user ID is not found")
	}
	return r.GetUserRolesForProject(ctx, db.GetUserRolesForProjectParams{UserID: userID, ProjectID: projectID})
}

// CompareRoleLevel compares a string against a role level
func CompareRoleLevel(a string, b RoleLevel) bool {
	if strings.ToLower(a) == strings.ToLower(b.String()) {
		return true
	}
	return false
}

// ConvertToRoleCode converts a role code string to a RoleCode type
func ConvertToRoleCode(r string) RoleCode {
	if r == RoleCodeAdmin.String() {
		return RoleCodeAdmin
	}
	if r == RoleCodeMember.String() {
		return RoleCodeMember
	}
	return RoleCodeObserver
}

// GetEntityType converts integer to EntityType enum
func GetEntityType(entityType int32) EntityType {
	switch entityType {
	case 1:
		return EntityTypeTask
	default:
		panic("Not a valid entity type!")
	}
}

// GetActionType converts integer to ActionType enum
func GetActionType(actionType int32) ActionType {
	switch actionType {
	case 1:
		return ActionTypeTaskMemberAdded
	default:
		panic("Not a valid entity type!")
	}
}

type MemberType string

const (
	MemberTypeInvited MemberType = "INVITED"
	MemberTypeJoined  MemberType = "JOINED"
)

type MasterEntry struct {
	MemberType MemberType
	ID         uuid.UUID
}

const (
	TASK_ADDED_TO_TASK_GROUP int32 = 1
	TASK_MOVED_TO_TASK_GROUP int32 = 2
	TASK_MARK_COMPLETE       int32 = 3
	TASK_MARK_INCOMPLETE     int32 = 4
	TASK_DUE_DATE_CHANGED    int32 = 5
	TASK_DUE_DATE_ADDED      int32 = 6
	TASK_DUE_DATE_REMOVED    int32 = 7
	TASK_CHECKLIST_CHANGED   int32 = 8
	TASK_CHECKLIST_ADDED     int32 = 9
	TASK_CHECKLIST_REMOVED   int32 = 10
)
