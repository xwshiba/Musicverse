package helpers

import (
    "encoding/json"
    "net/http"
    "log"

    "v2/pkg/models"
)

func GetSessionDetails(r *http.Request) (string, string) {
    // Get the session ID from the request's cookies
    cookie, err := r.Cookie("sid")
    if err != nil {
        // No session ID found in cookies
        log.Println("GetSessionDetails: No session ID found in cookies")
        return "", ""
    }
    sid := cookie.Value
    log.Println("GetSessionDetails: Session ID in cookie:", sid)

    // Retrieve the username associated with the session ID
    username := models.GetSessionUser(sid)
    log.Println("GetSessionDetails: Username associated with session ID:", username)

    return sid, username
}

func SendError(w http.ResponseWriter, statusCode int, errorMessage string) {
    w.WriteHeader(statusCode)
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"error": errorMessage})
}
