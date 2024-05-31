// All the revisions to this object
// will need to go through user-library check first
// and save to the whole database here

const albumReviews = {}; // contains all reviews for all albums
const allReviews = {}; // contains all reviews for a single album

albumReviews.getAllReviews = function getAllReviews(albumId) {
    return allReviews[albumId];
};

albumReviews.addReview = function addReview(albumId, review) {
    // don't need to return anything 
    // won't affect the current user's other reviews
    if (!allReviews[albumId]) {
        allReviews[albumId] = {}; // open a new slot for this album
    };

    allReviews[albumId][review.id] = review;
};

albumReviews.updateReview = function updateReview(albumId, review) {
    // don't need to return anything 
    // won't affect the current user's other reviews
    allReviews[albumId][review.id] = review;
};

albumReviews.deleteReview = function deleteReview(albumId, review) {
    delete allReviews[albumId][review.id];
};

module.exports = albumReviews;
