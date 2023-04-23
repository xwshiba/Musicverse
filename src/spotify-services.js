const authTokenBody = `grant_type=client_credentials&client_id=` +
    `${process.env.REACT_APP_CLIENT_ID}` +
    `&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

export function fetchAuthToken() {
    return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `${authTokenBody}`,
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
};

const sharedParams = {
    country: "US",
    limit: 30,
    offset: 0,
};

const sharedParamsUrl =
    `country=${sharedParams.country}&` +
    `limit=${sharedParams.limit}&` +
    `offset=${sharedParams.offset}`;

export function fetchNewAlbums(accessToken, tokenType) {
    return fetch(`https://api.spotify.com/v1/browse/new-releases?` +
        `${sharedParamsUrl}`, {
        method: 'GET',
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};

export function fetchAlbumTracks(accessToken, tokenType, id) {
    return fetch(`https://api.spotify.com/v1/albums/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};

export function fetchSearch(query, accessToken, tokenType) {
    // user's input will be sanitized by spotify services
    return fetch(`https://api.spotify.com/v1/search?q=${query}&type=album&` +
        `${sharedParamsUrl}`, {
        method: 'GET',
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};