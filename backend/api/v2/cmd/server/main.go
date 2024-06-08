package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"v2/pkg/handlers"
	"v2/pkg/models"
)

func main() {
	r := mux.NewRouter()

	// Create the instance of albumReviews
    albumReviews := models.NewAlbumReviews()

	// Define routes
	r.HandleFunc("/api/v2/session", handlers.GetSessionDetails).Methods("GET")
    r.HandleFunc("/api/v2/albums/{id}/reviews", handlers.GetAlbumReviews(albumReviews)).Methods("GET")
	r.HandleFunc("/api/v2/spotify-token", handlers.GetSpotifyToken).Methods("GET")
	r.HandleFunc("/api/v2/session", handlers.CreateSession).Methods("POST")
	r.HandleFunc("/api/v2/session", handlers.DeleteSession).Methods("DELETE")



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
