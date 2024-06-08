package models

import (
	"sync"
	"time"

	"github.com/google/uuid"
)

type AlbumInfo struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Images      []string `json:"images"`
	Artists     []string `json:"artists"`
	ReleaseDate string   `json:"release_date"`
	AlbumType   string   `json:"album_type"`
}

type Review struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	Date      string    `json:"date"`
	AlbumInfo AlbumInfo `json:"album_info"`
	Username  string    `json:"username"`
}

type UserLibrary struct {
	albums  map[string]AlbumInfo
	reviews map[string]Review
	mu      sync.RWMutex
	ar      *AlbumReviews
}

func NewUserLibrary() *UserLibrary {
	return &UserLibrary{
		albums:  make(map[string]AlbumInfo),
		reviews: make(map[string]Review),
		ar:	     ar,
	}
}

func (ul *UserLibrary) ContainsAlbum(id string) bool {
	ul.mu.RLock()
	defer ul.mu.RUnlock()
	_, exists := ul.albums[id]
	return exists
}

func (ul *UserLibrary) GetAlbums() map[string]AlbumInfo {
	ul.mu.RLock()
	defer ul.mu.RUnlock()
	return ul.albums
}

func (ul *UserLibrary) AddAlbum(albumInfo AlbumInfo) string {
	ul.mu.Lock()
	defer ul.mu.Unlock()
	ul.albums[albumInfo.ID] = albumInfo
	return albumInfo.ID
}

func (ul *UserLibrary) GetAlbum(id string) AlbumInfo {
	ul.mu.RLock()
	defer ul.mu.RUnlock()
	return ul.albums[id]
}

func (ul *UserLibrary) DeleteAlbum(id string) {
	ul.mu.Lock()
	defer ul.mu.Unlock()
	delete(ul.albums, id)
}

func (ul *UserLibrary) GetReviews() map[string]Review {
	ul.mu.RLock()
	defer ul.mu.RUnlock()
	return ul.reviews
}

func (ul *UserLibrary) GetReviewByAlbum(albumId string) (string, bool) {
	ul.mu.RLock()
	defer ul.mu.RUnlock()
	for id, review := range ul.reviews {
		if review.AlbumInfo.ID == albumId {
			return id, true
		}
	}
	return "", false
}

func (ul *UserLibrary) ContainsReview(id string) bool {
	ul.mu.RLock()
	defer ul.mu.RUnlock()
	_, exists := ul.reviews[id]
	return exists
}

func (ul *UserLibrary) GetReviewById(id string) (Review, bool) {
	ul.mu.RLock()
	defer ul.mu.RUnlock()
	review, exists := ul.reviews[id]
	return review, exists
}

func (ul *UserLibrary) AddReview(content string, albumInfo AlbumInfo, username string) string {
	ul.mu.Lock()
	defer ul.mu.Unlock()
	id := uuid.New().String()
	date := time.Now().Format("2006-01-02")
	ul.reviews[id] = Review{
		ID:        id,
		Content:   content,
		Date:      date,
		AlbumInfo: albumInfo,
		Username:  username,
	}
	return id
}

func (ul *UserLibrary) DeleteReview(id string) {
	ul.mu.Lock()
	defer ul.mu.Unlock()
	if review, exists := ul.reviews[id]; exists {
		ul.ar.DeleteReview(review.AlbumInfo.ID, id)
		delete(ul.reviews, id)
	}
}

func (ul *UserLibrary) UpdateReview(id, content string) {
	ul.mu.Lock()
	defer ul.mu.Unlock()
	if review, exists := ul.reviews[id]; exists {
		review.Content = content
		review.Date = time.Now().Format("2006-01-02")
		ul.reviews[id] = review
		ul.ar.UpdateReview(review.AlbumInfo.ID, review)
	}
}
