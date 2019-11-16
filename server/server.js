const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 7000;
let CLIENT_URI = process.env.CLIENT_URI || 'http://localhost:5000';
let REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${port}/callback`;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SCOPES = 'playlist-read-private user-follow-read user-read-email';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));



app.get('/callback', (req, res) => {
    res.send({express: 'Hello Spotiboi!'});
});

app.get('/login', (req, res) => {
    // We need authorization from the user first.

    
    res.redirect(
        'https://accounts.spotify.com/authorize/?' +
        'response_type=code' +
        '&client_id=' + CLIENT_ID +
        '&scope=' + SCOPES +
        '&redirect_uri=' + REDIRECT_URI
    );
});

app.get('/refresh-token', (req, res) => {
    res.send({ express: 'Refreshing token!'});
});

app.get('/status', (req, res) => {
    res.send({ express: `I'm still alive. I'm on port ${ port }.`});
});


app.listen(port, ()=> console.log(`Listening on port ${ port }`));