package route

import (
	"context"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/jordanknott/project-citadel/api/internal/auth"
	log "github.com/sirupsen/logrus"
)

func AuthenticationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		bearerTokenRaw := r.Header.Get("Authorization")
		splitToken := strings.Split(bearerTokenRaw, "Bearer")
		if len(splitToken) != 2 {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		accessTokenString := strings.TrimSpace(splitToken[1])
		accessClaims, err := auth.ValidateAccessToken(accessTokenString)
		if err != nil {
			if _, ok := err.(*auth.ErrExpiredToken); ok {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte(`{
	"data": {},
	"errors": [
	{
		"extensions": {
			"code": "UNAUTHENTICATED"
		}
	}
	]
				}`))
				return
			}
			log.Error(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		var userID uuid.UUID
		if accessClaims.Restricted == auth.InstallOnly {
			userID = uuid.New()
		} else {
			userID, err = uuid.Parse(accessClaims.UserID)
			if err != nil {
				log.WithError(err).Error("middleware access token userID parse")
				w.WriteHeader(http.StatusBadRequest)
				return
			}
		}
		ctx := context.WithValue(r.Context(), "userID", userID)
		ctx = context.WithValue(ctx, "restricted_mode", accessClaims.Restricted)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
