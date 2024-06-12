package models

import (
    "regexp"
    "sync"
)

var (
    users        = make(map[string]*UserLibrary)
    usersMutex   sync.RWMutex
    usernameRegex = regexp.MustCompile(`^[A-Za-z0-9]{1,20}$`)
    reviewRegex   = regexp.MustCompile(`^[a-zA-Z\s.!']*$`)
	ar		      = NewAlbumReviews()
)

func IsValidUsername(username string) bool {
    if username == "" || !usernameRegex.MatchString(username) {
        return false
    }
    return true
}

func GetUserData(username string) *UserLibrary {
    usersMutex.RLock()
    defer usersMutex.RUnlock()
    return users[username]
}

func AddUserData(username string, userData *UserLibrary) {
    usersMutex.Lock()
    defer usersMutex.Unlock()
    users[username] = userData
}

func IsValidReview(text string) bool {
    return reviewRegex.MatchString(text)
}

func InitializeUserLibrary(username string) *UserLibrary {
	usersMutex.Lock()
	defer usersMutex.Unlock()
	userLibrary := NewUserLibrary()
	users[username] = userLibrary
	return userLibrary
}
