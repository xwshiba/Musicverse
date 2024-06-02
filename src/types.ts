// Include types that will be used multiple times in the application

import { MESSAGES } from '@/constants';

// Fetch related types
export interface FetchRequestOptions extends RequestInit {
    headers?: HeadersInit;
};

export interface FetchError {
    error: string;
};


// other server response types
export interface ServerDeleteResponse {
    message: string;
};

export type ErrorKeys = keyof typeof MESSAGES | '';


// Spotify & Server API related types
export interface SpotifyAuthTokenResponse {
    access_token: string;
    token_type: string;
};

export interface ServerArtist {
    id: string;
    name: string;
};

export interface ServerAlbumInfo {
    id: string;
    name: string;
    images: { url: string }[];
    artists: ServerArtist[];
    album_type: string;
    release_date: string;
    tracks?: { items: ServerTrackItem[] }; // Optional to handle both albumInfo and albumTracks
};

export interface SpotifyReturnedAlbums {
    items: ServerAlbumInfo[];
};

export interface ServerAlbums {
    [key: string]: ServerAlbumInfo;
};

export interface ServerTrackItem {
    id: string;
    name: string;
    duration_ms: number;
};

export interface SpotifyAlbumTracks {
    items: ServerTrackItem[];
};

export interface SpotifySearch {
    albums: {
        items: ServerAlbumInfo[];
    };
};

export interface ServerAlbumTracks {
    id: string;
    tracks: {
        items: ServerTrackItem[];
    };
};


// User related types, match user-libary.js file
export interface ServerSingleReview { // single review
    id: string;
    content: string;
    date: string;
    albumInfo: ServerAlbumInfo;
    username: string;
};

export interface ServerUserReviews {
    [key: string]: ServerSingleReview; // multiple reviews
};

export interface ServerUserLibrary {
    albums: ServerAlbums;
    reviews: ServerUserReviews;
};


// album reviews related types, match album-reviews.js file

export interface ServerAlbumReviews { // contains all reviews for a single album
    [key: string]: ServerSingleReview;
};

export interface ServerAllAlbumReviews { // contains all reviews for all albums, only used by the server. Shouldn't be used anywhere in the client.
    [key: string]: ServerAlbumReviews;
};
