 package models

import (
    "log"
    "os"
    "net/http"
    "sync"

    "github.com/gorilla/sessions"
    "github.com/joho/godotenv"
)

var (
    mu                  sync.RWMutex
    sessionStore        = make(map[string]string) // Map to store session data
    Store               *sessions.CookieStore
    sessionSecretKey    string
)

func init() {
    // Load environment variables from the .env file
    if err := godotenv.Load(); err != nil {
        log.Fatalf("Error loading .env file: %v", err)
    }

    // Load session secret key from environment variable
    sessionSecretKey = os.Getenv("SESSION_SECRET")
	log.Println("SESSION_SECRET:", sessionSecretKey) // Add this line to debug
    if sessionSecretKey == "" {
        panic("SESSION_SECRET environment variable not set")
    }

    // Initialize the session store with a secret key
    Store = sessions.NewCookieStore([]byte(sessionSecretKey))
}

// AddSession adds a new session with the given username and returns the session ID.
func AddSession(w http.ResponseWriter, r *http.Request, username string) string {
    log.Println("Session start adding", sessionStore)
    session, err := Store.Get(r, "sid")
    if err != nil {
        log.Println("Error getting session:", err)
        return ""
    }

    log.Println("Storing username in session:", username)
    session.Values["username"] = username
    if err := session.Save(r, w); err != nil {
        log.Println("Error saving session:", err)
        return ""
    }

    // Store session data in the sessionStore map
    mu.Lock()
    defer mu.Unlock()
    sessionStore[session.ID] = username
    log.Println("Session added", sessionStore)

    return session.ID
}

// GetSessionUser returns the username associated with the given session ID.
func GetSessionUser(r *http.Request) string {
	log.Println("Session start retrieving", sessionStore)
    session, err := Store.Get(r, "sid")
    if err != nil {
		log.Println("Error getting session")
        return ""
    }

    mu.RLock()
    defer mu.RUnlock()
    username, ok := sessionStore[session.ID]
    if !ok {
		log.Println("Session not found")
        return ""
    }

    return username
}

// DeleteSession deletes the session with the given session ID.
func DeleteSession(w http.ResponseWriter, r *http.Request) {
    session, _ := Store.Get(r, "sid")

    // Remove session data from the sessionStore map
    mu.Lock()
    defer mu.Unlock()
    delete(sessionStore, session.ID)

    session.Options.MaxAge = -1 // Expire the session immediately
    session.Save(r, w)
}
