const uuid = require('uuid').v4;

// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it
function makeUserLibrary() {
    // These are hardcoded initial state when we restart the server

    const userLibrary = {};
    const albums = {}; // albums will use id as a key
    const reviews = {}; // reviews will use uuid as a key, can also search by albumId

    userLibrary.containsAlbum = function containsAlbum(id) {
        // This !! syntax coerces the value to a boolean
        // First by giving us the reverse of the truthy/falsy value,
        // then by reversing it to true/false
        return !!albums[id];
    };

    userLibrary.getAlbums = function getAlbums() {
        return albums;
    };

    userLibrary.addAlbum = function addAlbum(albumInfo) {
        // tracks received but ignored here
        const { id, name, images, artists, release_date, album_type } = albumInfo;

        albums[id] = {
            id,
            name,
            images,
            artists,
            release_date,
            album_type,
        };
        return id;
    };

    userLibrary.getAlbum = function getAlbum(id) {
        return albums[id]; // also need to return reviews
    };

    userLibrary.deleteAlbum = function deleteAlbum(id) {
        delete albums[id];
    };

    userLibrary.getReviews = function getReviews() {
        return reviews;
    };

    userLibrary.getReviewByAlbum = function getReviewByAlbum(albumId) {
        for (let id in reviews) {
            if (reviews[id].albumInfo.id === albumId) {
                return id;
            };
        };
    };

    userLibrary.containsReview = function containsReview(id) {
        // This !! syntax coerces the value to a boolean
        // First by giving us the reverse of the truthy/falsy value,
        // then by reversing it to true/false
        return !!reviews[id];
    };

    userLibrary.getReviewById = function getReviewById(id) {
        return reviews[id]; // might return undefined
    };

    userLibrary.addReview = function addReview(content, albumInfo, username) {
        const id = uuid();
        const date = (new Date()).toDateString();
        reviews[id] = {
            id,
            content,
            date,
            albumInfo,
            username,
        };
        return id;
    };

    userLibrary.deleteReview = function deleteReview(id) {
        delete reviews[id];
    };

    userLibrary.updateReview = function updateReview(id, content) {
        // reject empty values
        reviews[id].content = content || reviews[id].content;
        reviews[id].date = (new Date()).toDateString(); // update date as well
    };

    return userLibrary;
};

module.exports = {
    makeUserLibrary,
};