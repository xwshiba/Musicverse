import {
    LOGIN_STATUS,
    CLIENT,
    ACTIONS,
} from './constants';

import {
    UserLibrary,
    AlbumTracks,
    AllReviews,
    SpotifyReturnedAlbums,
} from './types';


// Define the state shape
export interface State {
    page: string;
    error: string;
    username: string;
    loginStatus: LOGIN_STATUS;
    isUserLibraryPending: boolean;
    userLibrary: UserLibrary;
    prompt: string;
    albums: SpotifyReturnedAlbums;
    isAlbumsPending: boolean;
    albumTracks: AlbumTracks;
    isAlbumTracksPending: boolean;
    albumId: string;
    reviewId: string;
    albumReviews: AllReviews;
    isAlbumsReviewsPending: boolean;
}

export const initialState : State = {
    page: 'Home',
    error: '',
    username: '',
    loginStatus: LOGIN_STATUS.PENDING,
    isUserLibraryPending: false,
    userLibrary: {
        albums: {},
        reviews: {}
    },
    prompt: '',
    albums: { items: [] },
    isAlbumsPending: false,
    albumTracks: { id: '', tracks: { items: [] } },
    isAlbumTracksPending: false,
    albumId: '',
    reviewId: '',
    albumReviews: {},
    isAlbumsReviewsPending: false,
};

// Define the actions
export interface Action<T = any> {
    type: ACTIONS;
    payload?: T;
};

function reducer(state: State, action: Action): State {
    switch (action.type) {

        case ACTIONS.LOG_IN:
            return {
                ...state,
                error: '',
                loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
                username: action.payload?.username,
                page: action.payload?.page,
            };

        case ACTIONS.START_LOADING_USER_LIBRARY:  // actions are the change in state, not how that change happened
            return {
                ...state,
                error: '',
                isUserLibraryPending: true,
            };

        case ACTIONS.REPLACE_USER_LIBRARY:
            return {
                ...state,
                error: '',
                isUserLibraryPending: false,
                userLibrary: action.payload?.userLibrary,
            };

        case ACTIONS.LOG_OUT:
            return {
                ...state,
                error: '',
                isUserLibraryPending: false,
                userLibrary: {
                    albums: {},
                    reviews: {}
                },
                loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
                username: '',
                reviewId: '',
                page: 'Home',
            };

        case ACTIONS.REPORT_ERROR:
            // We could move the "pick the message" logic from Status.jsx here. Better? It depends.
            return {
                ...state,
                error: action.payload?.error || 'ERROR', // ERROR is just to ensure a truthy value
                isUserLibraryPending: false,
                isAlbumsPending: false,
                isAlbumTracksPending: false,
                isAlbumsReviewsPending: false,
            };

        case ACTIONS.START_LOADING_ALBUMS:
            return {
                ...state,
                error: '',
                isAlbumsPending: true,
                page: action.payload?.page,
                prompt: action.payload?.prompt,
            };

        case ACTIONS.REPLACE_ALBUMS:
            return {
                ...state,
                error: '',
                isAlbumsPending: false,
                albums: action.payload?.albums,
            };

        case ACTIONS.START_LOADING_ALBUM_TRACKS:
            return {
                ...state,
                error: '',
                isAlbumTracksPending: true,
                page: action.payload?.page,
                prompt: '',
            };

        case ACTIONS.REPLACE_ALBUM_TRACKS:
            return {                
                ...state,
                error: '',
                isAlbumTracksPending: false,
                albumId: action.payload?.id,
                albumTracks: action.payload?.albumTracks,
            };

        case ACTIONS.START_SEARCH_ALBUMS:
            return {
                ...state,
                error: '',
                isAlbumsPending: true,
                page: action.payload?.page,
                prompt: action.payload?.prompt,
            };

        case ACTIONS.SAVE_ALBUM:
                return {
                    ...state,
                    userLibrary: { // because userLibrary is an object, we have to make an altered copy
                        ...state.userLibrary, // copy the existing library...
                        albums: {
                            ...state.userLibrary.albums,
                            [action.payload?.savedAlbum.id]: action.payload?.savedAlbum, // ...but override this one
                        },
                    },
                    isUserLibraryPending: false,
                };

        case ACTIONS.ADD_REVIEW:
                return {
                    ...state,
                    userLibrary: {
                        ...state.userLibrary,
                        reviews: {
                            ...state.userLibrary.reviews,
                            [action.payload?.addedReview.id]: action.payload?.addedReview,
                        },
                    },
                    isUserLibraryPending: false,
                };

        case ACTIONS.GET_ITEM_DETAILS:
            return {
                ...state,
                albumId: action.payload?.albumId,
                reviewId: action.payload?.reviewId,
                page: action.payload?.page,
                error: '',
                albumTracks: { id: '', tracks: { items: [] } }, // otherwise might show the cached tracks
            };

        case ACTIONS.UPDATE_REVIEW:
            if ('reviews' in state.userLibrary) {  // Handle the case where `userLibrary` does not have `reviews`
                return {
                    ...state,
                    userLibrary: {
                        ...state.userLibrary,
                        reviews: {
                            ...state.userLibrary.reviews,
                            [action.payload?.updatedReview.id]: action.payload?.updatedReview,
                        },
                    },
                    isUserLibraryPending: false,
                };

                return state;
            };

        case ACTIONS.SET_PAGE:
            return {
                ...state,
                page: action.payload?.page,
            };

        case ACTIONS.START_LOADING_ALBUM_REVIEWS:
            return {
                ...state,
                isAlbumsReviewsPending: true,
                error: '',
            };

        case ACTIONS.REPLACE_ALBUM_REVIEWS:
            return {
                ...state,
                albumReviews: action.payload?.albumReviews,
                isAlbumsReviewsPending: false,
            };

        default:
            throw new Error(JSON.stringify({ error: CLIENT.UNKNOWN_ACTION, detail: action })); // reporting detail for debugging aid, not shown to user

    }
}

export default reducer;
