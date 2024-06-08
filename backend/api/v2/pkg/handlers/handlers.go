package handlers

import (
	"io/ioutil"
	"log"
	"os"
	"strings"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"v2/pkg/helpers"
	"v2/pkg/models"
)

// Function to get Spotify token
func GetSpotifyToken(w http.ResponseWriter, r *http.Request) {
    clientID := os.Getenv("SPOTIFY_CLIENT_ID")
    clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
    authTokenBody := "grant_type=client_credentials&client_id=" + clientID + "&client_secret=" + clientSecret

	// Create a new POST request
    req, err := http.NewRequest("POST", "https://accounts.spotify.com/api/token", strings.NewReader(authTokenBody))
    if err != nil {
        log.Println("Failed to create request:", err)
        helpers.SendError(w, http.StatusInternalServerError, "internal-error")
        return
    }

    req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	// Execute the request
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        log.Println("Spotify server error:", err)
        helpers.SendError(w, http.StatusInternalServerError, "internal-error")
        return
    }
    defer resp.Body.Close()

	// Check if the response is not OK
    if resp.StatusCode != http.StatusOK {
        log.Println("Failed to fetch Spotify token:", resp.Status)
        helpers.SendError(w, resp.StatusCode, "token-error")
        return
    }

	// Read the response body
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        log.Println("Failed to read response body:", err)
		helpers.SendError(w, http.StatusInternalServerError, "internal-error")
        return
    }

	// Parse the JSON response
    var data map[string]interface{}
    if err := json.Unmarshal(body, &data); err != nil {
        log.Println("Failed to parse JSON response:", err)
		helpers.SendError(w, http.StatusInternalServerError, "internal-error")
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(data)
}

// Function to get session details
func GetSessionDetails(w http.ResponseWriter, r *http.Request) {
	_, username := helpers.GetSessionDetails(r)
	if username == "" || !models.IsValidUsername(username) {
		helpers.SendError(w, http.StatusUnauthorized, "auth-missing")
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"username": username})
}

// Function to get album reviews, now taking albumReviews as a parameter
func GetAlbumReviews(albumReviews *models.AlbumReviews) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        id := vars["id"]
        reviews := albumReviews.GetAllReviews(id)
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]interface{}{"albumReviews": reviews})
    }
}

// Function to create a new session
func CreateSession(w http.ResponseWriter, r *http.Request) {
	var reqBody struct {
		Username string `json:"username"`
	}
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		helpers.SendError(w, http.StatusBadRequest, "required-username")
		return
	}
	username := reqBody.Username

	// Validate username
	if !models.IsValidUsername(username) {
		helpers.SendError(w, http.StatusBadRequest, "required-username")
		return
	}
	if username == "dog" {
		helpers.SendError(w, http.StatusForbidden, "auth-insufficient")
		return
	}

	// Create session
	session, _ := helpers.Store.Get(r, "session")
	session.Values["username"] = username
	session.Save(r, w)


	// Initialize user data if not present
	existingUserData := models.GetUserData(username)
	if existingUserData == nil {
		models.AddUserData(username, models.NewUserLibrary())
	}

	// Return user data
	userData := models.GetUserData(username)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"albums":  userData.GetAlbums(),
		"reviews": userData.GetReviews(),
	})
}

func DeleteSession(w http.ResponseWriter, r *http.Request) {
	_, username := helpers.GetSessionDetails(r)

	// Clear session
	session, _ := helpers.Store.Get(r, "session")
	session.Options.MaxAge = -1
	if err := session.Save(r, w); err != nil {
		helpers.SendError(w, http.StatusInternalServerError, "internal-error")
		return
	}

	// Return username
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"username": username})
}