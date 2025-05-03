package server

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/joho/godotenv/autoload"

	"backend/internal/database"
)

type Server struct {
	port int

	// db database.Service
	db *database.Queries
}

var (
	dataBase = os.Getenv("BLUEPRINT_DB_DATABASE") // TODO: rename this to avoid conflicts with `database`
	password = os.Getenv("BLUEPRINT_DB_PASSWORD")
	username = os.Getenv("BLUEPRINT_DB_USERNAME")
	port     = os.Getenv("BLUEPRINT_DB_PORT")
	host     = os.Getenv("BLUEPRINT_DB_HOST")
	schema   = os.Getenv("BLUEPRINT_DB_SCHEMA")
	// dbInstance *service
)

func NewServer() *http.Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))

	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable&search_path=%s", username, password, host, port, dataBase, schema)
	log.Println(connStr)
	db, err := sql.Open("pgx", connStr)
	if err != nil {
		log.Fatal(err)
	}
	// dbInstance = &service{
	// 	db: db,
	// }
	// return dbInstance

	NewServer := &Server{
		port: port,

		db: database.New(db),
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
