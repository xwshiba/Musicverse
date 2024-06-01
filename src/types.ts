// Include types that will be used multiple times in the application

// Fetch related types
export interface FetchRequestOptions extends RequestInit {
    headers?: HeadersInit;
};

export interface FetchError {
    error: string;
};


// other server response types
export interface DeleteResponse {
    message: string;
};


// Spotify API related types
export interface AuthTokenResponse {
    access_token: string;
    token_type: string;
};

export interface Artist {
    id: string;
    name: string;
};

export interface AlbumInfo {
    id: string;
    name: string;
    images: { url: string }[];
    artists: Artist[];
    album_type: string;
    release_date: string;
    tracks?: { items: TrackItem[] }; // Optional to handle both albumInfo and albumTracks
};

export interface SpotifyReturnedAlbums {
    items: AlbumInfo[];
};

export interface Album {
    [key: string]: AlbumInfo;
};

export interface TrackItem {
    id: string;
    name: string;
    duration_ms: number;
};

export interface SpotifyAlbumTracks {
    items: TrackItem[];
};

export interface SpotifySearch {
    albums: {
        items: AlbumInfo[];
    };
};

export interface AlbumTracks {
    id: string;
    tracks: {
        items: TrackItem[];
    };
};


// User related types, match user-libary.js file
export interface Review { // single review
    id: string;
    content: string;
    date: string;
    albumInfo: AlbumInfo;
    username: string;
};

export interface UserReview {
    [key: string]: Review; // multiple reviews
};

export interface UserLibrary {
    albums: Album;
    reviews: UserReview;
};


// album reviews related types, match album-reviews.js file

export interface AllReviews {
    [key: string]: Review;
};

export interface AlbumReviews {
    [key: string]: AllReviews;
};
