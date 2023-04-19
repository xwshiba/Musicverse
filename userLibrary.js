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
        const {id, name, images, artists} = albumInfo;

        albums[id] = {
            id,
            name,
            images,
            artists,
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
        for (let review of reviews) {
            if (review.albumId === albumId) {
                return review;
            };
        };
    };

    userLibrary.getReviewById = function getReviewById(id) {
        return reviews[id]; // might return undefined
    };

    userLibrary.addReview = function addReview(albumId, content) {
        const id = uuid();
        const date = Date.now();
        reviews[id] = {
            id,
            content,
            date,
            albumId: userLibrary.getAlbum(albumId),
        };
        albums[albumId].reviewId = id;
    };

    userLibrary.deleteReview = function deleteReview(id) {
        delete reviews[id];
    };

    userLibrary.updateReview = function updateReview(id, content) {
        // reject empty values
        reviews[id].content = content || reviews[id].content;
    };

    return userLibrary;
};

module.exports = {
    makeUserLibrary,
};