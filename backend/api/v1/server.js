const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 4000;


// Use CORS middleware to allow requests from your frontend
const corsOptions = {
    origin: process.env.FRONT_END_URL || 'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials (cookies, etc.) to be included
};

app.use(cors(corsOptions));


const sessions = require('./sessions');
const users = require('./users');
const userLibrary = require('./user-library'); // acts as the database portion relates with the user
const albumReviews = require('./album-reviews'); // acts as the global database


// middleware setup
app.use(cookieParser());
app.use(express.static('./build')); // dev/prod proxy settings
app.use(express.json());


// handle spotify token fetching
require('dotenv').config();

/************* helper functions *************/

/**
 * Retrieves the session details from the request.
 */
function getSessionDetails(req) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    return { sid, username };
};

/**
 * Sends an error response with the specified status code and error message.
 */
function sendError(res, statusCode, errorMessage) {
    res.status(statusCode).json({ error: errorMessage });
};

/************* handle sessions *************/
// backend routes
app.get('/api/v1/spotify-token', async (req, res) => {
    const authTokenBody = `grant_type=client_credentials&client_id=` +
        `${process.env.SPOTIFY_CLIENT_ID}` +
        `&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`;

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: authTokenBody,
        });

        if (!response.ok) {
            sendError(res, response.status, 'token-error');
            return;
        };

        const data = await response.json();
        res.json(data);
    } catch (error) {
        sendError(res, 500, 'internal-error');
    }
});

app.get('/api/v1/session', (req, res) => {
    const { sid, username } = getSessionDetails(req);
    if (!sid || !users.isValidUsername(username)) {
        return sendError(res, 401, 'auth-missing');
    };

    res.json({ username });
});

app.get('/api/v1/albums/:id/reviews', (req, res) => {
    // reviews are accessible to the public
    // don't need sessions check
    const { id } = req.params;
    res.json({ albumReviews: albumReviews.getAllReviews(id) });
});

app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    if (!users.isValidUsername(username)) {
        return sendError(res, 400, 'required-username');
    };

    if (username === 'dog') {
        return sendError(res, 403, 'auth-insufficient');
    };

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);

    if (!existingUserData) {
        users.addUserData(username, userLibrary.makeUserLibrary());
    };

    res.cookie('sid', sid, { httpOnly: true, sameSite: 'None', secure: true });
    res.json({
        albums: users.getUserData(username).getAlbums(),
        reviews: users.getUserData(username).getReviews()
    });
});

app.delete('/api/v1/session', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    if (sid) {
        res.clearCookie('sid');
    };

    if (username) {
        // Delete the session, but not the user data
        sessions.deleteSession(sid);
    };

    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ username });
});

app.get('/api/v1/userLibrary', (req, res) => {
    // Session checks for these are very repetitive - a good place to abstract out

    // when users get to their account pages
    const { sid, username } = getSessionDetails(req);

    if (!sid || !username) {
        return sendError(res, 401, 'auth-missing');
    };

    res.json({
        albums: users.getUserData(username).getAlbums(),
        reviews: users.getUserData(username).getReviews()
    });
});

app.post('/api/v1/userLibrary/albums', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    if (!sid || !users.isValidUsername(username)) {
        return sendError(res, 401, 'auth-missing');
    };
    const { albumInfo } = req.body;
    const userLibrary = users.getUserData(username);

    if (!Object.keys(albumInfo).length === 0 || !albumInfo.id) { // if it's empty object
        return sendError(res, 400, 'required-info');
    };

    const id = userLibrary.addAlbum(albumInfo);
    res.json(userLibrary.getAlbum(id));
});

app.delete('/api/v1/userLibrary/albums/:id', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    if (!sid || !users.isValidUsername(username)) {
        return sendError(res, 401, 'auth-missing');
    };

    const { id } = req.params;
    const userLibrary = users.getUserData(username);
    const exists = userLibrary.containsAlbum(id);
    if (exists) { // if it's empty object
        userLibrary.deleteAlbum(id);
    };

    res.json({ message: exists ? `Album ${id} deleted` : `Album ${id} did not exist` });
});

app.post('/api/v1/userLibrary/reviews', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    if (!sid || !users.isValidUsername(username)) {
        return sendError(res, 401, 'auth-missing');
    };

    const { content, reviewedAlbumInfo } = req.body;
    const userLibrary = users.getUserData(username);

    if (!content || !reviewedAlbumInfo) { // reject if either is empty
        return sendError(res, 400, 'required-info');
    };

    if (!users.isValidReview(content)) { // reject if review contains bad tokens
        return sendError(res, 400, 'invalid-info');
    };

    const exists = userLibrary.getReviewByAlbum(reviewedAlbumInfo.id);
    if (exists) { // prevent review again
        return sendError(res, 400, 'duplicate-review');
    };

    const id = userLibrary.addReview(content, reviewedAlbumInfo, username);

    // then add to the global database
    const addedReview = userLibrary.getReviewById(id);
    albumReviews.addReview(reviewedAlbumInfo.id, addedReview);

    res.json(userLibrary.getReviewById(id));
});

app.delete('/api/v1/userLibrary/reviews/:id', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    if (!sid || !users.isValidUsername(username)) {
        return sendError(res, 401, 'auth-missing');
    };

    const { id } = req.params;
    const userLibrary = users.getUserData(username);
    const exists = userLibrary.containsReview(id);

    if (exists) { // if the library contains the review
        const toDeleteReview = userLibrary.getReviewById(id);
        userLibrary.deleteReview(id);

        // handle the global database next
        albumReviews.deleteReview(toDeleteReview.albumInfo.id, toDeleteReview);
    };
    res.json({ message: exists ? `Review deleted` : `Your review did not exist` });
});

app.patch('/api/v1/userLibrary/reviews/:id', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    if (!sid || !users.isValidUsername(username)) {
        return sendError(res, 401, 'auth-missing');
    };

    const { id } = req.params;
    const { content } = req.body;

    if (!content) { // reject if either is empty
        return sendError(res, 400, 'required-info');
    };

    if (!users.isValidReview(content)) { // reject if review contains bad tokens
        return sendError(res, 400, 'invalid-info');
    };

    const userLibrary = users.getUserData(username);
    const exists = userLibrary.containsReview(id);

    if (!exists) {
        return sendError(res, 404, 'invalid-info');
    };
    userLibrary.updateReview(id, content);

    // then revise the global database
    const patchedReview = userLibrary.getReviewById(id);
    albumReviews.updateReview(patchedReview?.albumInfo?.id, patchedReview);

    res.json(userLibrary.getReviewById(id));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
