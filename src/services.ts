// This file contains the fetch services to my own backend
// Some infos are redudant and can be abstract out

import { 
    FetchRequestOptions,
    FetchError,

    AlbumInfo, 
    AlbumReviews, 
    DeleteResponse, 
    Review, 
    UserLibrary 
} from "./types";

// variables
const api = '/api/v1';
const headers = {
    'content-type': 'application/json',
};


// fetchRequest is a helper function to handle fetch requests
async function fetchRequest<T>(url : string, options : FetchRequestOptions) : Promise<T> {
    try {
        const response = await fetch(url, options);

        if (response.ok) {
            return await response.json() as T;
        };
        
        const error = await response.json();
        return Promise.reject(error as FetchError);
    } catch {
        return Promise.reject({ error: 'network-error' } as FetchError);
    };
};


// All backend fetch services below
export async function fetchSession(): Promise<{username: string}> {
    const options: FetchRequestOptions = {
        method: 'GET',
        headers,
        credentials: 'include',
    };
    return fetchRequest<{username: string}>(`${api}/session`, options);
};

export async function fetchAlbumReviews(id: string): Promise<AlbumReviews> {
    const options: FetchRequestOptions = {
        method: 'GET',
        headers,
    };
    return fetchRequest<AlbumReviews>(`${api}/albums/${id}/reviews`, options);
};

export async function fetchLogin(username : string):Promise<UserLibrary> {
    const options: FetchRequestOptions = {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ username }),
    };
    return fetchRequest<UserLibrary>(`${api}/session`, options);
};

export async function fetchLogout(): Promise<{ username: string }> {
    const options: FetchRequestOptions = {
        method: 'DELETE',
    };
    return fetchRequest<{ username: string }>(`${api}/session`, options);
};

export async function fetchUserLibrary(): Promise<UserLibrary> {
    const options: FetchRequestOptions = {
        method: 'GET',
        headers,
        credentials: 'include',
    };
    return fetchRequest<UserLibrary>(`${api}/userLibrary`, options);
};

export async function fetchSaveAlbum(albumInfo : AlbumInfo) : Promise<AlbumInfo> {
    const options: FetchRequestOptions = {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ albumInfo }),
    };
    return fetchRequest<AlbumInfo>(`${api}/userLibrary/albums`, options);
};

export async function fetchDeleteAlbum(id : string): Promise<DeleteResponse> {
    const options: FetchRequestOptions = {
        method: 'DELETE',
    };
    return fetchRequest<DeleteResponse>(`${api}/userLibrary/albums/${id}`, options);
};

export async function fetchAddReview(content : string, reviewedAlbumInfo : AlbumInfo): Promise<Review>{
    const options: FetchRequestOptions = {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ content, reviewedAlbumInfo }),
    };
    return fetchRequest<Review>(`${api}/userLibrary/reviews`, options);
};

export async function fetchDeleteReview(id : string) : Promise<DeleteResponse> {
    const options: FetchRequestOptions = {
        method: 'DELETE',
    };
    return fetchRequest<DeleteResponse>(`${api}/userLibrary/reviews/${id}`, options);
};

export async function fetchUpdateReview(id : string, content : string) : Promise<Review> {
    const options: FetchRequestOptions = {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify({ content }),
    };
    return fetchRequest<Review>(`${api}/userLibrary/reviews/${id}`, options);
};
