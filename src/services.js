export function fetchAlbumReviews(id) {
    return fetch(`/api/v1/albums/${id}/reviews`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
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

export function fetchUserLibrary() {
    return fetch('/api/v1/userLibrary', {
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

export function fetchSaveAlbum(albumInfo) {
    return fetch('/api/v1/userLibrary/albums', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ albumInfo }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
};

export function fetchDeleteAlbum(id) {
    return fetch(`/api/v1/userLibrary/albums/${id}`, {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};

export function fetchAddReview(content, reviewedAlbumInfo) {
    return fetch('/api/v1/userLibrary/reviews', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content, reviewedAlbumInfo }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};

export function fetchDeleteReview(id) {
    return fetch(`/api/v1/userLibrary/reviews/${id}`, {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};

export function fetchUpdateReview(id, content) {
    return fetch(`/api/v1/userLibrary/reviews/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content }),
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};