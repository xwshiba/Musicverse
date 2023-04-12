export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_WORD: 'required-word',
    INVALID_WORD: 'invalid-word',
};

export const CLIENT = {
    NETWORK_ERROR: 'network-error',
    NO_SESSION: 'no-session',
};

export const MESSAGES = {
    // The [] below uses the variable value as the key
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    // Here we use 'dog' to simulate a bad password
    [SERVER.AUTH_MISSING]: `You may have logged out or your session has expired. Please try login again`,
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (1 to 20 letters and/or numbers) username',
    [SERVER.REQUIRED_WORD]: `Your input was empty.Please submit your word again.`,
    [SERVER.INVALID_WORD]: `Your input was invalid. 
                     Please submit a word that contains at least one letter, 
                     and only contains English letters. Please try again.`,
    default: 'Something went wrong.  Please try again',
};