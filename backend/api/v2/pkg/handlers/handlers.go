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
func HandleGetSpotifyToken(w http.ResponseWriter, r *http.Request) {

    clientID := os.Getenv("SPOTIFY_CLIENT_ID")
    clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
    authTokenBody := "grant_type=client_credentials&client_id=" + 
					 clientID + "&client_secret=" + clientSecret

	// Create a new POST request
    req, err := http.NewRequest("POST", "https://accounts.spotify.com/api/token", strings.NewReader(authTokenBody))
    if err != nil {
        helpers.SendError(w, http.StatusInternalServerError, "internal-error")
        return
    }

    req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	// Execute the request
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
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
func HandleGetSessionDetails(w http.ResponseWriter, r *http.Request) {
    sid, username := helpers.GetSessionDetails(r)

    if sid == "" || !models.IsValidUsername(username) {
		// if sid is unauthorized, clear the "sid" cookie
		if sid != "" {
			http.SetCookie(w, &http.Cookie{
				Name:     "sid",
				Value:    "",
				Path:     "/",
				SameSite: http.SameSiteNoneMode,
				Secure:   true,
				MaxAge:   -1,
			})
    	}
    
		helpers.SendError(w, http.StatusUnauthorized, "auth-missing")
    	return
    }

    response := map[string]string{"username": username}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

// Function to get album reviews, now taking albumReviews as a parameter
func HandleGetAlbumReviews(albumReviews *models.AlbumReviews) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        id := vars["id"]
        reviews := albumReviews.GetAllReviews(id)
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]interface{}{"albumReviews": reviews})
    }
}

// Function to create a new session
func HandleCreateSession(w http.ResponseWriter, r *http.Request) {
    var reqBody struct {
        Username string `json:"username"`
    }

    if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
        helpers.SendError(w, http.StatusBadRequest, "invalid-request")
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
    sessionID := models.AddSession(username)

    // Initialize user data if not present
    existingUserData := models.GetUserData(username)
    if existingUserData == nil {
        models.AddUserData(username, models.NewUserLibrary())
    }

    // Set the "sid" cookie in the response
    http.SetCookie(w, &http.Cookie{
        Name:     "sid",
        Value:    sessionID,
        Path:     "/", // Set the path to root to ensure consistency
        SameSite: http.SameSiteNoneMode, // Ensures the cookie is sent for cross-site requests
        Secure:   true, // Ensures the cookie is sent only over HTTPS
        MaxAge:   3600, // Set the cookie to expire in 1 hour
    })

    // Return user data
    userData := models.GetUserData(username)
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "albums":  userData.GetAlbums(),
        "reviews": userData.GetReviews(),
    })
}

func HandleDeleteSession(w http.ResponseWriter, r *http.Request) {
    sid, username := helpers.GetSessionDetails(r)

    if sid != "" {
        // Clear the "sid" cookie
        http.SetCookie(w, &http.Cookie{
            Name:     "sid",
            Value:    "",
            Path:     "/",
            SameSite: http.SameSiteNoneMode,
            Secure:   true,
            MaxAge:   -1,
        })

        // Delete the session data
        models.DeleteSession(sid)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"username": username})
}

func HandleGetUserLibrary(w http.ResponseWriter, r *http.Request) {
	sid, username := helpers.GetSessionDetails(r)

	if sid == "" || username == "" {
		helpers.SendError(w, http.StatusUnauthorized, "auth-missing")
		return
	}

	userData := models.GetUserData(username)

	response := map[string]interface{}{
		"albums":  userData.GetAlbums(),
		"reviews": userData.GetReviews(),
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func HandleAddAlbum(w http.ResponseWriter, r *http.Request) {
	sid, username := helpers.GetSessionDetails(r)

	if sid == "" || !models.IsValidUsername(username) {
		helpers.SendError(w, http.StatusUnauthorized, "auth-missing")
		return
	}

	var reqBody struct {
		AlbumInfo models.AlbumInfo  `json:"albumInfo"`
	}

	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		helpers.SendError(w, http.StatusBadRequest, "invalid-request")
		return
	}

	albumInfo := reqBody.AlbumInfo

	if albumInfo.ID == "" { // Assuming ID is a string and cannot be empty
		helpers.SendError(w, http.StatusBadRequest, "required-info")
		return
	}

	userLibrary := models.GetUserData(username)

	id := userLibrary.AddAlbum(albumInfo)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(userLibrary.GetAlbum(id))
}

func HandleDeleteAlbum(w http.ResponseWriter, r *http.Request) {
	sid, username := helpers.GetSessionDetails(r)

	if sid == "" || !models.IsValidUsername(username) {
		helpers.SendError(w, http.StatusUnauthorized, "auth-missing")
		return
	}

	vars := mux.Vars(r)
	id := vars["id"]

	userLibrary := models.GetUserData(username)
	if userLibrary == nil {
		helpers.SendError(w, http.StatusNotFound, "user-not-found")
		return
	}

	exists := userLibrary.ContainsAlbum(id)
	if exists {
		userLibrary.DeleteAlbum(id)
	}

	responseMessage := map[string]string{
        "message": func() string {
            if exists {
                return "Album deleted"
            }
            return "Your saved album did not exist in our records. Please try again."
        }(),
    }

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responseMessage)
}

func HandleAddReview(albumReviews *models.AlbumReviews) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sid, username := helpers.GetSessionDetails(r)

		if sid == "" || !models.IsValidUsername(username) {
			helpers.SendError(w, http.StatusUnauthorized, "auth-missing")
			return
		}

		var requestData struct {
			Content          	string              `json:"content"`
			ReviewedAlbumInfo 	models.AlbumInfo  	`json:"reviewedAlbumInfo"`
		}

		if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
			helpers.SendError(w, http.StatusBadRequest, "invalid-request")
			return
		}

		content := requestData.Content
		reviewedAlbumInfo := requestData.ReviewedAlbumInfo

		if content == "" || reviewedAlbumInfo.IsEmpty() { 
			helpers.SendError(w, http.StatusBadRequest, "required-info")
			return
		}

		if !models.IsValidReview(content) {
			helpers.SendError(w, http.StatusBadRequest, "invalid-info")
			return
		}

		userLibrary := models.GetUserData(username)
		if userLibrary == nil {
			helpers.SendError(w, http.StatusNotFound, "user-not-found")
			return
		}

		_, exists := userLibrary.GetReviewByAlbum(reviewedAlbumInfo.ID)
		if exists {
			helpers.SendError(w, http.StatusBadRequest, "duplicate-review")
			return
		}

		id := userLibrary.AddReview(content, reviewedAlbumInfo, username)

		// then add to the global review data
		addedReview, exist := userLibrary.GetReviewByID(id)
		if exist == false {
			helpers.SendError(w, http.StatusInternalServerError, "internal-error")
			return
		}
		albumReviews.AddReview(reviewedAlbumInfo.ID, addedReview)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(addedReview)
	}
}

func HandleDeleteReview(albumReviews *models.AlbumReviews) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sid, username := helpers.GetSessionDetails(r)

		if sid == "" || !models.IsValidUsername(username) {
			helpers.SendError(w, http.StatusUnauthorized, "auth-missing")
			return
		}

		vars := mux.Vars(r)
		id := vars["id"]

		userLibrary := models.GetUserData(username)
		if userLibrary == nil {
			helpers.SendError(w, http.StatusNotFound, "user-not-found")
			return
		}

		exists := userLibrary.ContainsReview(id)
		if exists {
			toDeleteReview, _ := userLibrary.GetReviewByID(id)
			userLibrary.DeleteReview(id)

			// handle the global review data next
			albumReviews.DeleteReview(toDeleteReview.AlbumInfo.ID, toDeleteReview.ID)
		}

		responseMessage := map[string]string{
			"message": func() string {
				if exists {
					return "Review deleted"
				}
				return "Your review did not exist in our records. Please try again."
			}(),
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(responseMessage)
	}
}

func HandleUpdateReview(albumReviews *models.AlbumReviews) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sid, username := helpers.GetSessionDetails(r)

		if sid == "" || !models.IsValidUsername(username) {
			helpers.SendError(w, http.StatusUnauthorized, "auth-missing")
			return
		}

		vars := mux.Vars(r)
		id := vars["id"]

		var requestData struct {
			Content string `json:"content"`
		}

		err := json.NewDecoder(r.Body).Decode(&requestData)
		if err != nil || requestData.Content == "" {
			helpers.SendError(w, http.StatusBadRequest, "required-info")
			return
		}

		if !models.IsValidReview(requestData.Content) {
			helpers.SendError(w, http.StatusBadRequest, "invalid-request")
			return
		}

		userLibrary := models.GetUserData(username)
		if userLibrary == nil {
			helpers.SendError(w, http.StatusNotFound, "user-not-found")
			return
		}

		exists := userLibrary.ContainsReview(id)
		if !exists {
			helpers.SendError(w, http.StatusNotFound, "invalid-info")
			return
		}

		userLibrary.UpdateReview(id, requestData.Content)

		// handle the global review data next
		patchedReview, _ := userLibrary.GetReviewByID(id)
		albumReviews.UpdateReview(patchedReview.AlbumInfo.ID, patchedReview)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(patchedReview)
	}
}
