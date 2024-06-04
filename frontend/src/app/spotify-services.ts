// This file contains the fetch services to Spotify
// use .env file for the tokens

import { FetchRequestOptions, FetchError, SpotifyAuthTokenResponse, SpotifyAlbumTracks, SpotifySearch } from './types';

const baseUrl = 'https://api.spotify.com/v1';

// params required by Spotify
const sharedParams = {
    country: "US",
    limit: 30,
    offset: 0,
};

const sharedParamsUrl =
    `country=${sharedParams.country}&` +
    `limit=${sharedParams.limit}&` +
    `offset=${sharedParams.offset}`;


// fetchRequest is a helper function to handle fetch requests
async function fetchRequest<T>(url: string, options: FetchRequestOptions = {}): Promise<T> {
    try {
        const response = await fetch(url, options);

        if (response.ok) {
            return response.json() as Promise<T>;
        };

        const errorResponse = await response.json();
        return Promise.reject(errorResponse as FetchError);
    } catch (error) {
        return Promise.reject({ error: 'network-error' } as FetchError);
    };
};


// All Spotify fetch services below
// Spotify requires extra step to get API tokens that will expire in 1 hour
export async function fetchAuthToken(): Promise<SpotifyAuthTokenResponse> {
    return fetchRequest<SpotifyAuthTokenResponse>('/api/spotify-token');
};


export async function fetchNewAlbums(accessToken: string, tokenType: string): Promise<SpotifySearch> {
    const options: FetchRequestOptions = {
        method: 'GET',
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
    };
    return fetchRequest<SpotifySearch>(`${baseUrl}/browse/new-releases?` +
        `${sharedParamsUrl}`, options);
};

export async function fetchAlbumTracks(accessToken: string, tokenType: string, id: string): Promise<SpotifyAlbumTracks> {
    const options: FetchRequestOptions = {
        method: 'GET',
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
    };
    return fetchRequest<SpotifyAlbumTracks>(`${baseUrl}/albums/${id}/tracks`, options);
};

export async function fetchSearch(query: string, accessToken: string, tokenType: string): Promise<SpotifySearch> {
    // user's input will be sanitized by spotify services
    const options: FetchRequestOptions = {
        method: 'GET',
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
    };
    return fetchRequest<SpotifySearch>(`${baseUrl}/search?q=${query}&type=album&` + `${sharedParamsUrl}`, options);
};
