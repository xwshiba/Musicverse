import {
    LOGIN_STATUS,
    CLIENT,
    ACTIONS,
} from './constants';

export const initialState = {
    page: 'Albums',
    error: '',
    username: '',
    loginStatus: LOGIN_STATUS.PENDING,
    isUserLibraryPending: false,
    userLibrary: {},
    prompt: '',
    albums: {},
    isAlbumsPending: false,
    albumTracks: {},
    isAlbumTracksPending: false,
    albumId: '',
    reviewId: '',
};

function reducer(state, action) {
    switch(action.type) {

        case ACTIONS.LOG_IN:
            return {
                ...state,
                error: '',
                loginStatus:LOGIN_STATUS.IS_LOGGED_IN,
                username: action.username,
                page: action.page,
            };

        case ACTIONS.START_LOADING_USER_LIBRARY:  // actions are the change in state, not how that change happened
            return {
                ...state,
                error: '',
                isUserLibraryPending:true,
            };

        case ACTIONS.REPLACE_USER_LIBRARY:
            return {
                ...state,
                error: '',
                isUserLibraryPending: false,
                userLibrary: action.userLibrary,
            };

        case ACTIONS.LOG_OUT:
            return {
                ...state,
                error: '',
                isUserLibraryPending: false,
                userLibrary: {},
                loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
                username: '',
            };
        
        case ACTIONS.REPORT_ERROR:
            // We could move the "pick the message" logic from Status.jsx here. Better? It depends.
            return {
                ...state,
                error: action.error || 'ERROR', // ERROR is just to ensure a truthy value
                isUserLibraryPending: false,
                isAlbumsPending: false,
                isAlbumTracksPending: false,
            };
        
        case ACTIONS.START_LOADING_ALBUMS:
            return {
                ...state,
                error: '',
                isAlbumsPending: true,
                page: action.page,
                prompt: action.prompt,
            };
        
        case ACTIONS.REPLACE_ALBUMS:
            return {
                ...state,
                error: '',
                isAlbumsPending: false,
                albums: action.albums,
            };
        
        case ACTIONS.START_LOADING_ALBUM_TRACKS:
            return {
                ...state,
                error: '',
                isAlbumTracksPending: true,
                page: action.page,
                prompt: '',
            };
        
        case ACTIONS.REPLACE_ALBUM_TRACKS:
            return {
                ...state,
                error: '',
                isAlbumTracksPending: false,
                albumTracks: action.albumTracks,
            };
        
        case ACTIONS.START_SEARCH_ALBUMS:
            return {
                ...state,
                error: '',
                isAlbumsPending: true,
                page: action.page,
                prompt: action.prompt,
            };
        
        case ACTIONS.SAVE_ALBUM:
            return {
                ...state,
                userLibrary: { // because userLibrary is an object, we have to make an altered copy
                    ...state.userLibrary, // copy the existing library...
                    albums: { 
                        ...state.userLibrary.albums,
                        [action.savedAlbum.id]: action.savedAlbum, // ...but override this one
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
                        [action.addedReview.id]: action.addedReview,
                    },
                },
                isUserLibraryPending: false,
            };

        case ACTIONS.GET_ITEM_DETAILS:
            return {
                ...state,
                albumId: action.albumId,
                reviewId: action.reviewId,
                page: action.page,
                error: '',
                albumTracks: {}, // otherwise might show the cached tracks
            };
        
        case ACTIONS.UPDATE_REVIEW:
            return {
                ...state,
                userLibrary: {
                    ...state.userLibrary,
                    reviews: {
                        ...state.userLibrary.reviews,
                        [action.updatedReview.id]: action.updatedReview,
                    },
                },
                isUserLibraryPending: false,
            };

        case ACTIONS.SET_PAGE:
            return {
                ...state,
                page: action.page,
            };
        
        default:
            throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); // reporting detail for debugging aid, not shown to user

    };
};

export default reducer;