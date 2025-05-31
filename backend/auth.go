package main

import (
	"backend/internal/auth"
	"backend/internal/database/sqlc"
	"backend/utils"
	"encoding/json"
	"net/http"
	"time"

	"github.com/google/uuid"
)

func (cfg *apiConfig) handleLogin(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	type returnVals struct {
		CreatedAt    time.Time `json:"created_at"`
		UpdatedAt    time.Time `json:"updated_at"`
		Email        string    `json:"email"`
		Token        string    `json:"token"`
		RefreshToken string    `json:"refresh_token"`
		Id           uuid.UUID `json:"id"`
		IsChirpyRed  bool      `json:"is_chirpy_red"`
	}

	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Something went wrong decoding the response", err)
		return
	}

	user, err := cfg.dbInstance.Queries.GetUserByEmail(r.Context(), params.Email)
	if err != nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "Incorrect email or password.", err)
		return
	}

	if ok := auth.CheckPasswordHash(params.Password, user.HashedPassword); ok != nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "Incorrect email or password.", err)
		return
	}

	accessToken, err := auth.MakeJWT(user.ID, cfg.jwtSecret, time.Hour)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Couldn't create JWT", err)
		return
	}
	refreshToken, err := auth.MakeRefreshToken()
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Couldn't create refresh token", err)
		return
	}

	now := time.Now()
	_, err = cfg.dbInstance.Queries.CreateRefreshToken(r.Context(), sqlc.CreateRefreshTokenParams{
		Token:     refreshToken,
		UserID:    user.ID,
		ExpiresAt: now.Add(time.Hour * 24 * 60), // 60 days
		CreatedAt: now,
		UpdatedAt: now,
	})
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Couldn't save refresh token", err)
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, returnVals{
		Id:           user.ID,
		IsChirpyRed:  user.IsChirpyRed,
		Email:        user.Email,
		CreatedAt:    user.CreatedAt,
		UpdatedAt:    user.UpdatedAt,
		Token:        accessToken,
		RefreshToken: refreshToken,
	})
}
