const users = {};

function isValidUsername(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9]{1,20}$/);
    return isValid;
};

function getUserData(username) {
    return users[username];
};

function addUserData(username, userData) {
    users[username] = userData;
};

function isValidReview(text) {
    // Allowlist plain text isn't ideal. But it's better than getting XSS injection
    let isValid = true;
    isValid = isValid && text.match(/^[a-zA-Z\s.!']*$/);
    return isValid;
};

module.exports = {
    isValidUsername,
    getUserData,
    addUserData,
    isValidReview,
};