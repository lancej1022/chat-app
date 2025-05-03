package server

import "net/http"

func (s *Server) handlerReset(w http.ResponseWriter, r *http.Request) {
	if s.platform != "dev" {
		respondWithError(w, http.StatusForbidden, "Reset is only allowed in dev mode", nil)
		return
	}

	err := s.db.ResetUsers(r.Context())
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Something went wrong when trying to delete the users", err)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hits reset to 0"))
}
