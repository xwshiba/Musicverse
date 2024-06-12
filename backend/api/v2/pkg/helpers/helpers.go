package helpers

import (
    "encoding/json"
    "net/http"

    "v2/pkg/models"
)

func GetSessionDetails(r *http.Request) (string, string) {
    // Get the session ID from the request's cookies
    cookie, err := r.Cookie("sid")
    if err != nil {
        return "", ""
    }
    sid := cookie.Value

    // Retrieve the username associated with the session ID
    username := models.GetSessionUser(sid)

    return sid, username
}

func SendError(w http.ResponseWriter, statusCode int, errorMessage string) {
    w.WriteHeader(statusCode)
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"error": errorMessage})
}
