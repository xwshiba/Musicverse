// This file contains the fetch services to my own backend
// Some infos are redudant and can be abstract out

// variables
const api = '/api/v1';
const headers = {
    'content-type': 'application/json',
};


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


// All backend fetch services below
export function fetchAlbumReviews(id) {
    return fetchRequest(`${api}/albums/${id}/reviews`, {
        method: 'GET',
        headers: headers,
    });
};

export function fetchSession() {
    return fetchRequest(`${api}/session`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
    });
};

export function fetchLogin(username) {
    return fetchRequest(`${api}/session`, {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({ username }),
    });
};

export function fetchLogout() {
    return fetchRequest(`${api}/session`, {
        method: 'DELETE',
    });
};

export function fetchUserLibrary() {
    return fetchRequest(`${api}/userLibrary`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
    })
};

export function fetchSaveAlbum(albumInfo) {
    return fetchRequest(`${api}/userLibrary/albums`, {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({ albumInfo }),
    })
};

export function fetchDeleteAlbum(id) {
    return fetchRequest(`${api}/userLibrary/albums/${id}`, {
        method: 'DELETE',
    });
};

export function fetchAddReview(content, reviewedAlbumInfo) {
    return fetchRequest(`${api}/userLibrary/reviews`, {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({ content, reviewedAlbumInfo }),
    })
};

export function fetchDeleteReview(id) {
    return fetchRequest(`${api}/userLibrary/reviews/${id}`, {
        method: 'DELETE',
    });
};

export function fetchUpdateReview(id, content) {
    return fetchRequest(`${api}/userLibrary/reviews/${id}`, {
        method: 'PATCH',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({ content }),
    });
};
