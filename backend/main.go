package main

import (
	"backend/internal/api"
	"backend/internal/database"
	"log"
	"net/http"
	"os"
	"sync/atomic"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	godotenv.Load()
	dbURL := os.Getenv("DB_URL")

	dbInstance, err := database.NewDbInstance(dbURL)
	if err != nil {
		log.Fatal(err)
	}

	filepathRoot := "."
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("PORT not defined in env")
	}

	apiInstance := &api.Api{
		FileserverHits: atomic.Int32{},
		DbInstance:     dbInstance,
		Platform:       os.Getenv("PLATFORM"),
		JwtSecret:      os.Getenv("JWT_SECRET"),
		PolkaKey:       os.Getenv("POLKA_KEY"),
	}

	router := chi.NewRouter()
	// router.Group(func(r chi.Router) {
	// 	r.Use(a.Middleware.Authenticate)
	// 	r.Get("/workouts/{id}", a.Middleware.RequireUser(a.WorkoutHandler.GetWorkoutByID))
	// 	r.Post("/workouts", a.Middleware.RequireUser(a.WorkoutHandler.CreateWorkout))
	// 	r.Put("/workouts/{id}", a.Middleware.RequireUser(a.WorkoutHandler.UpdateWorkoutById))
	// 	r.Delete("/workouts/{id}", a.Middleware.RequireUser(a.WorkoutHandler.DeleteWorkout))
	// })

	router.Get("/api/healthz", handlerReadiness)
	router.Post("/api/polka/webhooks", apiInstance.HandleUpgradeToChirpyRed)
	router.Post("/api/users", apiInstance.HandleAddUser)
	router.Put("/api/users", apiInstance.HandleUpdateUser)
	router.Post("/api/login", apiInstance.HandleLogin)
	router.Post("/api/refresh", apiInstance.HandleLoginRefresh)
	router.Post("/api/revoke", apiInstance.HandleRevokeRefreshToken)
	router.Post("/api/chirps", apiInstance.HandleChirp)
	router.Delete("/api/chirps/{id}", apiInstance.HandleDeleteChirp)
	router.Get("/api/chirps", apiInstance.HandleGetChirps)
	router.Get("/api/chirps/{id}", apiInstance.HandleGetChirp)
	router.Post("/admin/reset", apiInstance.HandlerReset)

	srv := &http.Server{
		Addr:         ":" + port,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		Handler:      router,
	}
	log.Printf("Serving files from %s on port: %s\n", filepathRoot, port)
	log.Fatal(srv.ListenAndServe())
}
