// constants are just references to values (string values here)
// collected in one place and defined as const
//
// You do not have to use constants
// But done well they:
// - Make it easier to avoid typos
// - Help make use of IDE completion
// - Make it easy if the value changes
//    - only need to change the value here
//    - the constant reference doesn't change

export enum LOGIN_STATUS {
    PENDING = 'pending',
    NOT_LOGGED_IN = 'notLoggedIn',
    IS_LOGGED_IN = 'loggedIn',
};

export enum SERVER {
    AUTH_MISSING = 'auth-missing',
    AUTH_INSUFFICIENT = 'auth-insufficient',
    REQUIRED_USERNAME = 'required-username',
    REQUIRED_INFO = 'required-info',
    INVALID_INFO = 'invalid-info',
    DUPLICATE_REVIEW = 'duplicate-review',
    TOKEN_ERROR = 'token-error',
    INTERNAL_ERROR = 'internal-error',
    USER_NOT_FOUND = 'user-not-found',
    INVALID_REQUEST = 'invalid-request',
};

export enum CLIENT {
    NETWORK_ERROR = 'network-error',
    NO_SESSION = 'no-session', // don't need message to display
    UNKNOWN_ACTION = 'unknown-action',
};

export const MESSAGES = {
    // The [] below uses the variable value as the key
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    // Here we use 'dog' to simulate a bad password
    [CLIENT.UNKNOWN_ACTION]: 'We apologize for the inconvenience. Please try again',
    [SERVER.AUTH_MISSING]: `You may have logged out or your session has expired. Please try login again`,
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (1 to 20 letters and/or numbers) username',
    [SERVER.REQUIRED_INFO]: `Your submitted info was incorrect. Please check and send it again.`,
    [SERVER.INVALID_INFO]: `Your submitted info was invalid. It doesn't seem to exist in our library, 
                            or your reviews include invalid tokens. We only accept English sentences for now. 
                            Sorry for the inconvenience. Please revise and try again.`,
    [SERVER.DUPLICATE_REVIEW]: `You have already reviewed the album. We do not allow duplicate reviews. Please revise your review.`,
    [SERVER.TOKEN_ERROR]: `Our server is experiencing some issues. Please try again later.`,
    [SERVER.INTERNAL_ERROR]: `Our server is experiencing some issues. Please try again later.`,
    [SERVER.USER_NOT_FOUND]: `Your account was not found. Please register through our website.`,
    [SERVER.INVALID_REQUEST]: `Your request was invalid. Please try again.`,
    ERROR: 'Something went wrong.  Please try again',
    default: 'Something went wrong.  Please try again',
};


export enum ACTIONS {
    LOG_IN = 'logIn',
    LOG_OUT = 'logOut',
    START_LOADING_USER_LIBRARY = 'startLoadingUserLibrary',
    SAVE_ALBUM = 'saveAlbum',
    REPORT_ERROR = 'reportError',
    REPLACE_USER_LIBRARY = 'replaceUserLibrary',
    START_LOADING_ALBUMS = 'startLoadingAlbums',
    REPLACE_ALBUMS = 'replaceAlbums',
    START_LOADING_ALBUM_TRACKS = 'startLoadingAlbumTracks',
    REPLACE_ALBUM_TRACKS = 'replaceAlbumTracks',
    START_SEARCH_ALBUMS = 'startSearchAlbums',
    ADD_REVIEW = 'addReview',
    GET_ITEM_DETAILS = 'getItemDetails',
    UPDATE_REVIEW = 'updateReview',
    START_LOADING_ALBUM_REVIEWS = 'startLoadingAlbumReviews',
    REPLACE_ALBUM_REVIEWS = 'replaceAlbumReviews',
    SET_PAGE = 'setPage',
};
