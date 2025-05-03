package server

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"

	"backend/internal/database"

	_ "github.com/lib/pq"
)

type Server struct {
	port int

	// db database.Service // old from blueprint-boiler
	db *database.Queries

	platform  string
	jwtSecret string
	polkaKey  string // TODO: remove this -- carried over from boot.dev
}

func NewServer() *http.Server {
	godotenv.Load()
	dbURL := os.Getenv("DB_URL")
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	dbQueries := database.New(db)
	envPort := os.Getenv("PORT")
	log.Printf("PORT: %d", envPort)
	port, _ := strconv.Atoi(os.Getenv("PORT")) // TODO: might need to hardcode 8080 for now
	NewServer := &Server{
		port:      port,
		db:        dbQueries,
		platform:  os.Getenv("PLATFORM"),
		jwtSecret: os.Getenv("JWT_SECRET"),
		polkaKey:  os.Getenv("POLKA_KEY"),
	}

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
