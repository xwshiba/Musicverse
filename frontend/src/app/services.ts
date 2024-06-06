// This file contains the fetch services to my own backend
// Some infos are redudant and can be abstract out

import { 
    FetchRequestOptions,
    FetchError,

    ServerAlbumInfo, 
    ServerAlbumReviews, 
    ServerDeleteResponse, 
    ServerSingleReview, 
    ServerUserLibrary 
} from "./types";

// variables
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
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
    return fetchRequest<{username: string}>(`${apiBaseUrl}/session`, options);
};

export async function fetchAlbumReviews(id: string): Promise<ServerAlbumReviews> {
    const options: FetchRequestOptions = {
        method: 'GET',
        headers,
    };
    return fetchRequest<ServerAlbumReviews>(`${apiBaseUrl}/albums/${id}/reviews`, options);
};

export async function fetchLogin(username : string):Promise<ServerUserLibrary> {
    const options: FetchRequestOptions = {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ username }),
    };
    return fetchRequest<ServerUserLibrary>(`${apiBaseUrl}/session`, options);
};

export async function fetchLogout(): Promise<{ username: string }> {
    const options: FetchRequestOptions = {
        method: 'DELETE',
    };
    return fetchRequest<{ username: string }>(`${apiBaseUrl}/session`, options);
};

export async function fetchUserLibrary(): Promise<ServerUserLibrary> {
    const options: FetchRequestOptions = {
        method: 'GET',
        headers,
        credentials: 'include',
    };
    return fetchRequest<ServerUserLibrary>(`${apiBaseUrl}/userLibrary`, options);
};

export async function fetchSaveAlbum(albumInfo : ServerAlbumInfo) : Promise<ServerAlbumInfo> {
    const options: FetchRequestOptions = {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ albumInfo }),
    };
    return fetchRequest<ServerAlbumInfo>(`${apiBaseUrl}/userLibrary/albums`, options);
};

export async function fetchDeleteAlbum(id : string): Promise<ServerDeleteResponse> {
    const options: FetchRequestOptions = {
        method: 'DELETE',
    };
    return fetchRequest<ServerDeleteResponse>(`${apiBaseUrl}/userLibrary/albums/${id}`, options);
};

export async function fetchAddReview(content : string, reviewedAlbumInfo : ServerAlbumInfo): Promise<ServerSingleReview>{
    const options: FetchRequestOptions = {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ content, reviewedAlbumInfo }),
    };
    return fetchRequest<ServerSingleReview>(`${apiBaseUrl}/userLibrary/reviews`, options);
};

export async function fetchDeleteReview(id : string) : Promise<ServerDeleteResponse> {
    const options: FetchRequestOptions = {
        method: 'DELETE',
    };
    return fetchRequest<ServerDeleteResponse>(`${apiBaseUrl}/userLibrary/reviews/${id}`, options);
};

export async function fetchUpdateReview(id : string, content : string) : Promise<ServerSingleReview> {
    const options: FetchRequestOptions = {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify({ content }),
    };
    return fetchRequest<ServerSingleReview>(`${apiBaseUrl}/userLibrary/reviews/${id}`, options);
};
