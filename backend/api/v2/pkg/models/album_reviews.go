package models

import (
	"sync"
)

type AlbumReviews struct {
	allReviews map[string]map[string]Review
	mu         sync.RWMutex
}

func NewAlbumReviews() *AlbumReviews {
	return &AlbumReviews{
		allReviews: make(map[string]map[string]Review),
	}
}

func (ar *AlbumReviews) GetAllReviews(albumId string) map[string]Review {
	ar.mu.RLock()
	defer ar.mu.RUnlock()
	return ar.allReviews[albumId]
}

func (ar *AlbumReviews) AddReview(albumId string, review Review) {
	ar.mu.Lock()
	defer ar.mu.Unlock()
	if _, exists := ar.allReviews[albumId]; !exists {
		ar.allReviews[albumId] = make(map[string]Review)
	}
	ar.allReviews[albumId][review.ID] = review
}

func (ar *AlbumReviews) UpdateReview(albumId string, review Review) {
	ar.mu.Lock()
	defer ar.mu.Unlock()
	if _, exists := ar.allReviews[albumId]; exists {
		ar.allReviews[albumId][review.ID] = review
	}
}

func (ar *AlbumReviews) DeleteReview(albumId string, reviewID string) {
	ar.mu.Lock()
	defer ar.mu.Unlock()
	if _, exists := ar.allReviews[albumId]; exists {
		delete(ar.allReviews[albumId], reviewID)
	}
}
