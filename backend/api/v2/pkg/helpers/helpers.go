package helpers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/sessions"
)

var (
	Store = sessions.NewCookieStore([]byte("your-secret-key"))
)

func GetSessionDetails(r *http.Request) (string, string) {
	session, _ := Store.Get(r, "sid")
	username, ok := session.Values["username"].(string)
	if !ok {
		return "", ""
	}
	return session.ID, username
}

func SendError(w http.ResponseWriter, statusCode int, errorMessage string) {
	w.WriteHeader(statusCode)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"error": errorMessage})
}
