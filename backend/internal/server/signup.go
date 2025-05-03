package server

import (
	"backend/internal/auth"
	"backend/internal/database"
	"encoding/json"
	"net/http"
	"time"

	"github.com/google/uuid"
)

// TODO: some of this logic overlaps with handleLogin -- extract shared logic that should be identical into a helper function
func (s *Server) handleSignup(w http.ResponseWriter, r *http.Request) {
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
		respondWithError(w, http.StatusBadRequest, "Something went wrong decoding the request", err)
		return
	}

	hashedPass, err := auth.HashPassword(params.Password)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Unable to generate password", err)
		return
	}

	user, err := s.db.CreateUser(r.Context(), database.CreateUserParams{
		Email:          params.Email,
		HashedPassword: hashedPass,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Something went wrong when creating the user", err)
		return
	}

	accessToken, err := auth.MakeJWT(user.ID, s.jwtSecret, time.Hour)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't create JWT", err)
		return
	}

	refreshToken, err := auth.MakeRefreshToken()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't create refresh token", err)
		return
	}

	now := time.Now()
	_, err = s.db.CreateRefreshToken(r.Context(), database.CreateRefreshTokenParams{
		Token:     refreshToken,
		UserID:    user.ID,
		ExpiresAt: now.Add(time.Hour * 24 * 60), // 60 days
		CreatedAt: now,
		UpdatedAt: now,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't save refresh token", err)
		return
	}

	respondWithJSON(w, http.StatusCreated, returnVals{
		Id:           user.ID,
		Email:        user.Email,
		IsChirpyRed:  user.IsChirpyRed,
		CreatedAt:    user.CreatedAt,
		UpdatedAt:    user.UpdatedAt,
		Token:        accessToken,
		RefreshToken: refreshToken,
	})
}
