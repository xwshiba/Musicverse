const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');
const userLibrary = require('./userLibrary');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    };

    res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
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

app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        // Delete the session, but not the user data
        sessions.deleteSession(sid);
    }

    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ username });
});

app.get('/api/v1/userLibrary', (req, res) => {
    // Session checks for these are very repetitive - a good place to abstract out
    // when users get their own libraries
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

app.post('/api/v1/userLibrary/albums', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    };

    const { albumInfo } = req.body;
    const userLibrary = users.getUserData(username);

    // need to add some sort of validation
    if (!Object.keys(albumInfo).length === 0 || !albumInfo.id) { // if it's empty object
        res.status(400).json({ error: 'required-info' });
        return;
    };
    
    const id = userLibrary.addAlbum(albumInfo);
    res.json(userLibrary.getAlbum(id));
});

app.delete('/api/v1/userLibrary/albums/:id', (req, res) => {
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

app.post('/api/v1/userLibrary/reviews', (req, res) => {
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

    // user cannot post review if user didn't save the album
    // business logic
    // otherwise will need to find a way to save the album info somewhere

    const id = userLibrary.addReview(content, reviewedAlbumInfo);
    res.json(userLibrary.getReviewById(id));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));