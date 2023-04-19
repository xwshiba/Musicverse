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

module.exports = {
    isValidUsername,
    getUserData,
    addUserData,
};