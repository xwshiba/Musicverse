const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');

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
    const storedWord = users.wordFor[username] || "";

    res.cookie('sid', sid);
    res.json({ username, storedWord });
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

app.get('/api/v1/words', (req, res) => {
    // Session checks for these are very repetitive - a good place to abstract out
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const storedWord = users.wordFor[username] || "";

    res.json({ username, storedWord });
});

app.put('/api/v1/words', (req, res) => {
    // Session checks for these are very repetitive - a good place to abstract out
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { word } = req.body;

    if (!word && word !== '') {
        res.status(400).json({ error: 'required-word' });
        return;
    }

    if (!users.isValidWord(word)) {
        res.status(400).json({ error: 'invalid-word' });
        return;
    }

    users.wordFor[username] = word;

    res.json({ username, storedWord: word });
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));