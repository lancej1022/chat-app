package main

import (
	"backend/utils"
	"net/http"
)

func (cfg *apiConfig) handlerReset(w http.ResponseWriter, r *http.Request) {
	if cfg.platform != "dev" {
		utils.RespondWithError(w, http.StatusForbidden, "Reset is only allowed in dev mode", nil)
		return
	}

	cfg.fileserverHits.Store(0)
	err := cfg.dbInstance.Queries.ResetUsers(r.Context())
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Something went wrong when trying to delete the users", err)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hits reset to 0"))
}
