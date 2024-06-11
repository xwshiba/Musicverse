package models

import (
    "sync"

    "github.com/google/uuid"
)

var (
    mu                  sync.RWMutex
    sessionStore        map[string]string // Map to store session data
    sessionSecretKey    string
)

func init() {
    // Initialize the sessionStore map
    sessionStore = make(map[string]string)
}

// AddSession adds a new session with the given username and returns the session ID.
func AddSession(username string) string {
    // Generate a unique session ID
    sessionID := uuid.New().String()

    // Store session data in the sessionStore map
    mu.Lock()
    defer mu.Unlock()
    sessionStore[sessionID] = username

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
        return ""
    }

    return username
}

// DeleteSession deletes the session with the given session ID.
func DeleteSession(sid string) {
    // Delete the session ID from the sessionStore
    mu.Lock()
    defer mu.Unlock()
    delete(sessionStore, sid)
}
