package models

import (
    "log"
    "os"
    "sync"

    "github.com/google/uuid"
    "github.com/joho/godotenv"
)

var (
    mu                  sync.RWMutex
    sessionStore        map[string]string // Map to store session data
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

    // Initialize the sessionStore map
    sessionStore = make(map[string]string)
}

// AddSession adds a new session with the given username and returns the session ID.
func AddSession(username string) string {
    log.Println("Session start adding", sessionStore)

    // Generate a unique session ID
    sessionID := uuid.New().String()

    // Store session data in the sessionStore map
    mu.Lock()
    defer mu.Unlock()
    sessionStore[sessionID] = username
    log.Println("Session added", sessionStore)

    return sessionID
}

// GetSessionUser returns the username associated with the given session ID.
func GetSessionUser(sid string) string {
    // Protect access to sessionStore with a mutex
    mu.RLock()
    defer mu.RUnlock()

    // Retrieve the username from the session store
    username, ok := sessionStore[sid]
    if !ok {
        log.Println("Session not found.")
        return ""
    }

    return username
}

// DeleteSession deletes the session with the given session ID.
func DeleteSession(sid string) {
    log.Println("Session start deleting, sid: ", sid)
    // Delete the session ID from the sessionStore
    mu.Lock()
    defer mu.Unlock()
    delete(sessionStore, sid)
    log.Println("Session deleted", sessionStore)
}
