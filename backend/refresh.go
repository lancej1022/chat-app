package main

import (
	"backend/internal/auth"
	"backend/utils"
	"net/http"
	"time"
)

func (cfg *apiConfig) handleLoginRefresh(w http.ResponseWriter, r *http.Request) {
	type response struct {
		Token string `json:"token"`
	}

	refreshToken, err := auth.GetBearerToken(r.Header)
	if err != nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "Invalid refresh token", err)
		return
	}

	user, err := cfg.dbInstance.Queries.GetUserFromRefreshToken(r.Context(), refreshToken)
	if err != nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "Couldn't get user for refresh token", err)
		return
	}

	accessToken, err := auth.MakeJWT(user.ID, cfg.jwtSecret, time.Hour)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Couldn't create JWT", err)
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, response{
		Token: accessToken,
	})
}

func (cfg *apiConfig) handleRevokeRefreshToken(w http.ResponseWriter, r *http.Request) {
	refreshToken, err := auth.GetBearerToken(r.Header)
	if err != nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "Invalid refresh token", err)
		return
	}
	err = cfg.dbInstance.Queries.RevokeRefreshToken(r.Context(), refreshToken)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Couldn't revoke refresh token", err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
