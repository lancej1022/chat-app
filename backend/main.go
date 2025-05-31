package main

import (
	"backend/internal/database"
	"backend/sql/migrations"
	"database/sql"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"sync/atomic"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/pressly/goose/v3"
)

type apiConfig struct {
	dbInstance     *database.Service
	platform       string
	jwtSecret      string
	polkaKey       string
	fileserverHits atomic.Int32
}

func main() {
	godotenv.Load()
	dbURL := os.Getenv("DB_URL")
	// TODO: Add a check to see if the database is running
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	err = MigrateFs(db, migrations.FS, ".")
	if err != nil {
		panic(err)
	}

	dbInstance := database.NewDbInstance()
	filepathRoot := "."
	port := "8080"
	apiCfg := &apiConfig{
		fileserverHits: atomic.Int32{},
		dbInstance:     dbInstance,
		platform:       os.Getenv("PLATFORM"),
		jwtSecret:      os.Getenv("JWT_SECRET"),
		polkaKey:       os.Getenv("POLKA_KEY"),
	}
	// ServeMux is an HTTP request multiplexer.
	// It matches the URL of each incoming request against a list of registered patterns
	// and calls the handler for the pattern that most closely matches the URL.
	// mux := http.NewServeMux()
	// If a pattern ends with a slash /, it matches all URL paths that have the same prefix.
	// For example, a pattern /images/ matches /images/, /images/logo.png, and /images/css/style.css.

	// mux.HandleFunc("GET /api/healthz", handlerReadiness)

	// mux.HandleFunc("POST /api/polka/webhooks", apiCfg.handleUpgradeToChirpyRed)

	// mux.HandleFunc("POST /api/users", apiCfg.handleAddUser)
	// mux.HandleFunc("PUT /api/users", apiCfg.handleUpdateUser)
	// mux.HandleFunc("POST /api/login", apiCfg.handleLogin)
	// mux.HandleFunc("POST /api/refresh", apiCfg.handleLoginRefresh)
	// mux.HandleFunc("POST /api/revoke", apiCfg.handleRevokeRefreshToken)
	// mux.HandleFunc("POST /api/chirps", apiCfg.handleChirp)
	// mux.HandleFunc("DELETE /api/chirps/{id}", apiCfg.handleDeleteChirp)
	// mux.HandleFunc("GET /api/chirps", apiCfg.handleGetChirps)
	// mux.HandleFunc("GET /api/chirps/{id}", apiCfg.handleGetChirp)

	// mux.HandleFunc("POST /admin/reset", apiCfg.handlerReset)
	router := chi.NewRouter()

	// router.Group(func(r chi.Router) {
	// 	r.Use(a.Middleware.Authenticate)
	// 	r.Get("/workouts/{id}", a.Middleware.RequireUser(a.WorkoutHandler.GetWorkoutByID))
	// 	r.Post("/workouts", a.Middleware.RequireUser(a.WorkoutHandler.CreateWorkout))
	// 	r.Put("/workouts/{id}", a.Middleware.RequireUser(a.WorkoutHandler.UpdateWorkoutById))
	// 	r.Delete("/workouts/{id}", a.Middleware.RequireUser(a.WorkoutHandler.DeleteWorkout))
	// })

	router.Get("/api/healthz", handlerReadiness)
	router.Post("/api/polka/webhooks", apiCfg.handleUpgradeToChirpyRed)
	router.Post("/api/users", apiCfg.handleAddUser)
	router.Put("/api/users", apiCfg.handleUpdateUser)
	router.Post("/api/login", apiCfg.handleLogin)
	router.Post("/api/refresh", apiCfg.handleLoginRefresh)
	router.Post("/api/revoke", apiCfg.handleRevokeRefreshToken)
	router.Post("/api/chirps", apiCfg.handleChirp)
	router.Delete("/api/chirps/{id}", apiCfg.handleDeleteChirp)
	router.Get("/api/chirps", apiCfg.handleGetChirps)
	router.Get("/api/chirps/{id}", apiCfg.handleGetChirp)
	router.Post("/admin/reset", apiCfg.handlerReset)
	// return router

	srv := &http.Server{
		Addr:         ":" + port,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		Handler:      router,
		// Handler: mux,
	}
	log.Printf("Serving files from %s on port: %s\n", filepathRoot, port)
	log.Fatal(srv.ListenAndServe())
}

func MigrateFs(db *sql.DB, migrationFS fs.FS, migrationsDir string) error {
	goose.SetBaseFS(migrationFS)
	defer func() {
		goose.SetBaseFS(nil)
	}()
	return Migrate(db, migrationsDir)
}

// Tell goose which database to use
func Migrate(db *sql.DB, migrationsDir string) error {
	err := goose.SetDialect("postgres")
	if err != nil {
		return fmt.Errorf("migrate:set-dialect %w", err)
	}

	err = goose.Up(db, migrationsDir)
	if err != nil {
		return fmt.Errorf("goose up: %w", err)
	}
	return nil
}
