package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/joho/godotenv"

	"v2/pkg/handlers"
	"v2/pkg/models"
)

func init() {
    // Load environment variables from the .env file
    if err := godotenv.Load(); err != nil {
        log.Fatalf("Error loading .env file: %v", err)
    }
}

func main() {
	// Create a new router
	r := mux.NewRouter()

	// Create the instance of albumReviews
    albumReviews := models.NewAlbumReviews()

	// Define routes
	r.HandleFunc("/api/v2/session", handlers.HandleGetSessionDetails).Methods("GET")
    r.HandleFunc("/api/v2/albums/{id}/reviews", handlers.HandleGetAlbumReviews(albumReviews)).Methods("GET")
	r.HandleFunc("/api/v2/spotify-token", handlers.HandleGetSpotifyToken).Methods("GET")
	r.HandleFunc("/api/v2/session", handlers.HandleCreateSession).Methods("POST")
	r.HandleFunc("/api/v2/session", handlers.HandleDeleteSession).Methods("DELETE")
	r.HandleFunc("/api/v2/userLibrary", handlers.HandleGetUserLibrary).Methods("GET")
	r.HandleFunc("/api/v2/userLibrary/albums", handlers.HandleAddAlbum).Methods("POST")
	r.HandleFunc("/api/v2/userLibrary/albums/{id}", handlers.HandleDeleteAlbum).Methods("DELETE")
	r.HandleFunc("/api/v2/userLibrary/reviews", handlers.HandleAddReview(albumReviews)).Methods("POST")
	r.HandleFunc("/api/v2/userLibrary/reviews/{id}", handlers.HandleDeleteReview(albumReviews)).Methods("DELETE")
	r.HandleFunc("/api/v2/userLibrary/reviews/{id}", handlers.HandleUpdateReview(albumReviews)).Methods("PATCH")


	// Fetch front-end URL from environment variable
    frontEndURL := os.Getenv("FRONT_END_URL")
    if frontEndURL == "" {
        frontEndURL = "http://localhost:3000"
    }

	// Setup CORS middleware
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{frontEndURL},
        AllowCredentials: true,
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Content-Type", "Authorization"},
    })

    // Use the CORS middleware
    handler := c.Handler(r)

	// Start the server
	log.Println("Server is running on http://localhost:4000")
	log.Fatal(http.ListenAndServe(":4000", handler))
}
