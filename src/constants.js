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

export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_INFO: 'required-info',
    INVALID_INFO: 'invalid-info',
    DUPLICATE_REVIEW: 'duplicate-review',
};

export const CLIENT = {
    NETWORK_ERROR: 'network-error',
    NO_SESSION: 'no-session', // don't need message to display
};

export const MESSAGES = {
    // The [] below uses the variable value as the key
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    // Here we use 'dog' to simulate a bad password
    [SERVER.AUTH_MISSING]: `You may have logged out or your session has expired. Please try login again`,
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (1 to 20 letters and/or numbers) username',
    [SERVER.REQUIRED_INFO]: `Your submitted info was incorrect. Please check and send it again.`,
    [SERVER.INVALID_INFO]: `Your submitted info was invalid. It doesn't seem to exist in our library. Please try again.`,
    [SERVER.DUPLICATE_REVIEW]: `You have already reviewed the album. We do not allow duplicate reviews. Please revise your review.`,
    default: 'Something went wrong.  Please try again',
};

export const ACTIONS = {
    LOG_IN: 'logIn',
    LOG_OUT: 'logOut',
    START_LOADING_USER_LIBRARY: 'startLoadingUserLibrary',
    SAVE_ALBUM: 'saveAlbum',
    REPORT_ERROR: 'reportError',
    REPLACE_USER_LIBRARY: 'replaceUserLibrary',
    START_LOADING_ALBUMS: 'startLoadingAlbums',
    REPLACE_ALBUMS: 'replaceAlbums',
    START_LOADING_ALBUM_TRACKS: 'startLoadingAlbumTracks',
    REPLACE_ALBUM_TRACKS: 'replaceAlbumTracks',
    START_SEARCH_ALBUMS: 'startSearchAlbums',
    ADD_REVIEW: 'addReview',
    GET_ITEM_DETAILS:'getItemDetails',
    UPDATE_REVIEW: 'updateReview',
    SET_PAGE: 'setPage',
};