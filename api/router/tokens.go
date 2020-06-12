package router

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	log "github.com/sirupsen/logrus"
)

func NewAccessToken(userID string) (string, error) {
	accessExpirationTime := time.Now().Add(5 * time.Second)
	accessClaims := &AccessTokenClaims{
		UserID:         userID,
		StandardClaims: jwt.StandardClaims{ExpiresAt: accessExpirationTime.Unix()},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessTokenString, err := accessToken.SignedString(jwtKey)
	if err != nil {
		return "", err
	}
	return accessTokenString, nil
}

func NewAccessTokenCustomExpiration(userID string, dur time.Duration) (string, error) {
	accessExpirationTime := time.Now().Add(dur)
	accessClaims := &AccessTokenClaims{
		UserID:         userID,
		StandardClaims: jwt.StandardClaims{ExpiresAt: accessExpirationTime.Unix()},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessTokenString, err := accessToken.SignedString(jwtKey)
	if err != nil {
		return "", err
	}
	return accessTokenString, nil
}

func ValidateAccessToken(accessTokenString string) (AccessTokenClaims, error) {
	accessClaims := &AccessTokenClaims{}
	accessToken, err := jwt.ParseWithClaims(accessTokenString, accessClaims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		return *accessClaims, nil
	}

	if accessToken.Valid {
		log.WithFields(log.Fields{
			"token":        accessTokenString,
			"timeToExpire": time.Unix(accessClaims.ExpiresAt, 0),
		}).Info("token is valid")
		return *accessClaims, nil
	}

	if ve, ok := err.(*jwt.ValidationError); ok {
		if ve.Errors&jwt.ValidationErrorMalformed != 0 {
			return AccessTokenClaims{}, &ErrMalformedToken{}
		} else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
			return AccessTokenClaims{}, &ErrExpiredToken{}
		}
	}
	return AccessTokenClaims{}, err
}

func NewRefreshToken(userID string) (string, time.Time, error) {
	refreshExpirationTime := time.Now().Add(24 * time.Hour)
	refreshClaims := &RefreshTokenClaims{
		UserID:         userID,
		StandardClaims: jwt.StandardClaims{ExpiresAt: refreshExpirationTime.Unix()},
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshTokenString, err := refreshToken.SignedString(jwtKey)
	if err != nil {
		return "", time.Time{}, err
	}
	return refreshTokenString, refreshExpirationTime, nil
}
