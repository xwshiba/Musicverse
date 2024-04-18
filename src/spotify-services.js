// This file contains the fetch services to Spotify
// use .env file for the tokens

const baseUrl = 'https://api.spotify.com/v1';

// params required by Spotify
const authTokenBody = `grant_type=client_credentials&client_id=` +
    `${process.env.NEXT_PUBLIC_CLIENT_ID}` +
    `&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}`;

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
function fetchRequest(url, options) {
    return fetch(url, options)
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};

// All Spotify fetch services below
// Spotify requires extra step to get API tokens that will expire in 1 hour
export function fetchAuthToken() {
    return fetchRequest('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `${authTokenBody}`,
    });
};


export function fetchNewAlbums(accessToken, tokenType) {
    return fetchRequest(`${baseUrl}/browse/new-releases?` +
        `${sharedParamsUrl}`, {
        method: 'GET',
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
    });
};

export function fetchAlbumTracks(accessToken, tokenType, id) {
    return fetchRequest(`${baseUrl}/albums/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
    });
};

export function fetchSearch(query, accessToken, tokenType) {
    // user's input will be sanitized by spotify services
    return fetchRequest(`${baseUrl}/search?q=${query}&type=album&` +
        `${sharedParamsUrl}`, {
        method: 'GET',
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
    });
};
