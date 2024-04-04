const express = require('express');
const cookieParser = require('cookie-parser');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.NEXT_PUBLIC_PORT || 3000;


const sessions = require('./sessions');
const users = require('./users');
const userLibrary = require('./user-library'); // acts as the database portion relates with the user
const albumReviews = require('./album-reviews'); // acts as the global database


app.prepare().then(() => {
    const server = express();

    // middleware setup
    server.use(cookieParser());
    server.use(express.static('./build')); // dev/prod proxy settings
    server.use(express.json());

    // backend routes
    server.get('/api/v1/session', (req, res) => {
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';
        if (!sid || !users.isValidUsername(username)) {
            res.status(401).json({ error: 'auth-missing' });
            return;
        };

        res.json({ username });
    });

    server.get('/api/v1/albums/:id/reviews', (req, res) => {
        // reviews are accessible to the public
        // don't need sessions check
        const { id } = req.params;
        res.json({ albumReviews: albumReviews.getAllReviews(id) });
    });

    server.post('/api/v1/session', (req, res) => {
        const { username } = req.body;

        if (!users.isValidUsername(username)) {
            res.status(400).json({ error: 'required-username' });
            return;
        };

        if (username === 'dog') {
            res.status(403).json({ error: 'auth-insufficient' });
            return;
        };

        const sid = sessions.addSession(username);
        const existingUserData = users.getUserData(username);

        if (!existingUserData) {
            users.addUserData(username, userLibrary.makeUserLibrary());
        };

        res.cookie('sid', sid);
        res.json({
            albums: users.getUserData(username).getAlbums(),
            reviews: users.getUserData(username).getReviews()
        });
    });

    server.delete('/api/v1/session', (req, res) => {
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';

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

    server.get('/api/v1/userLibrary', (req, res) => {
        // Session checks for these are very repetitive - a good place to abstract out

        // when users get to their account pages
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';

        if (!sid || !username) {
            res.status(401).json({ error: 'auth-missing' });
            return;
        };

        res.json({
            albums: users.getUserData(username).getAlbums(),
            reviews: users.getUserData(username).getReviews()
        });
    });

    server.post('/api/v1/userLibrary/albums', (req, res) => {
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';
        if (!sid || !users.isValidUsername(username)) {
            res.status(401).json({ error: 'auth-missing' });
            return;
        };

        const { albumInfo } = req.body;
        const userLibrary = users.getUserData(username);

        if (!Object.keys(albumInfo).length === 0 || !albumInfo.id) { // if it's empty object
            res.status(400).json({ error: 'required-info' });
            return;
        };

        const id = userLibrary.addAlbum(albumInfo);
        res.json(userLibrary.getAlbum(id));
    });

    server.delete('/api/v1/userLibrary/albums/:id', (req, res) => {
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';
        if (!sid || !users.isValidUsername(username)) {
            res.status(401).json({ error: 'auth-missing' });
            return;
        };

        const { id } = req.params;
        const userLibrary = users.getUserData(username);
        const exists = userLibrary.containsAlbum(id);
        if (exists) { // if it's empty object
            userLibrary.deleteAlbum(id);
        };

        res.json({ message: exists ? `Album ${id} deleted` : `Album ${id} did not exist` });
    });

    server.post('/api/v1/userLibrary/reviews', (req, res) => {
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';
        if (!sid || !users.isValidUsername(username)) {
            res.status(401).json({ error: 'auth-missing' });
            return;
        };

        const { content, reviewedAlbumInfo } = req.body;
        const userLibrary = users.getUserData(username);

        if (!content || !reviewedAlbumInfo) { // reject if either is empty
            res.status(400).json({ error: 'required-info' });
            return;
        };

        if (!users.isValidReview(content)) { // reject if review contains bad tokens
            res.status(400).json({ error: 'invalid-info' });
            return;
        };

        const exists = userLibrary.getReviewByAlbum(reviewedAlbumInfo.id);
        if (exists) { // prevent review again
            res.status(400).json({ error: 'duplicate-review' });
            return;
        };

        const id = userLibrary.addReview(content, reviewedAlbumInfo, username);

        // then add to the global database
        const addedReview = userLibrary.getReviewById(id);
        albumReviews.addReview(reviewedAlbumInfo.id, addedReview);

        res.json(userLibrary.getReviewById(id));
    });

    server.delete('/api/v1/userLibrary/reviews/:id', (req, res) => {
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';
        if (!sid || !users.isValidUsername(username)) {
            res.status(401).json({ error: 'auth-missing' });
            return;
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

    server.patch('/api/v1/userLibrary/reviews/:id', (req, res) => {
        const sid = req.cookies.sid;
        const username = sid ? sessions.getSessionUser(sid) : '';
        if (!sid || !users.isValidUsername(username)) {
            res.status(401).json({ error: 'auth-missing' });
            return;
        };

        const { id } = req.params;
        const { content } = req.body;

        if (!content) { // reject if either is empty
            res.status(400).json({ error: 'required-info' });
            return;
        };

        if (!users.isValidReview(content)) { // reject if review contains bad tokens
            res.status(400).json({ error: 'invalid-info' });
            return;
        };

        const userLibrary = users.getUserData(username);
        const exists = userLibrary.containsReview(id);

        if (!exists) {
            res.status(404).json({ error: `invalid-info` });
            return;
        };
        userLibrary.updateReview(id, content);

        // then revise the global database
        const patchedReview = userLibrary.getReviewById(id);
        albumReviews.updateReview(patchedReview?.albumInfo?.id, patchedReview);

        res.json(userLibrary.getReviewById(id));
    });

    
    // Proxy API requests to Express backend
    server.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));


    // Next.js request handler
    server.get('*', (req, res) => handle(req, res));

    server.listen(PORT, () => console.log(`http://localhost:${PORT}`));

});
