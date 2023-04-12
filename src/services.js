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

export function fetchNewRelease(accessToken, tokenType) {
    return fetch('https://api.spotify.com/v1/browse/new-releases', {
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

export function fetchSession() {
    return fetch('/api/v1/session', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
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

export function fetchLogin(username) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username }),
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

export function fetchLogout() {
    return fetch('/api/v1/session', {
        method: 'DELETE',
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

export function fetchUserWords() {
    return fetch('/api/v1/words', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
};

export function fetchChangeUserWords(word) {
    return fetch('/api/v1/words', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ word }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
};