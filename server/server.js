const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
require('dotenv').config();

const port = process.env.PORT || 7000;
let CLIENT_URI = process.env.CLIENT_URI || 'http://localhost:3000';
let SERVER_URI = process.env.SERVER_URI || `http://localhost:${port}`
let REDIRECT_URI = process.env.REDIRECT_URI || `${SERVER_URI}/callback`;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SCOPES = 'playlist-read-private user-follow-read user-read-email';

var accessToken = null, refreshToken = null;

const app = express();
var router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


/*

LOGIN FLOW: /login -> /callback -> logged in, authorized to use other endpoints;

*/


function loggedIn() {
    return (accessToken != null && refreshToken != null);
}

app.get('/login', (req, res) => {
    // Authorization call for user and trigger callback.
    res.redirect(
        'https://accounts.spotify.com/authorize/?' +
        'response_type=code' +
        '&client_id=' + CLIENT_ID +
        '&scope=' + SCOPES +
        '&redirect_uri=' + REDIRECT_URI
    );
});

app.get('/callback', (req, res) => {

    let userCode = req.query.code || null,    
        postOptions = {
            uri: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                'Authorization' : `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: `code=${userCode}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}`
        }

    request(postOptions, (error, response, body) => {
        if (error) {
            console.log('Error: Problem at POST request in initial authorization callback. Check /callback for issues.');
            return;
        }
        else {
            console.log(`Success! Response is ${response.statusCode}`);

            JSON.parse(response.body, (key, value) => {
                if (key == 'access_token') {
                    accessToken = value;
                }
                if (key == 'refresh_token') {
                    refreshToken = value;
                }
            });

            /*
            if (accessToken != null) {
                console.log(`Access token acquired:\n ${accessToken}\n`);
            }
            if (refreshToken != null) {
                console.log(`Refresh token acquired:\n ${refreshToken}\n`);
            }*/

            if (accessToken != null && refreshToken != null) {
                console.log('Congrats! You successfully logged in!');
                res.redirect(`${CLIENT_URI}?access_token=${accessToken}`);
                console.log('Front-end provided with token. Can load dashboard now!');
            }
        }

        return;
    });
});

app.get('/refresh-token', (req, res) => {
    if (refreshToken == null) {
        console.log('Error: Cannot acquire new access token. No refresh token present. Must authorize first.');
        return;
    }

    res.send({ express: 'Refreshing token!'});

    let postOptions = {
        uri: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization' : `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    };

    request(postOptions, (error, response, body) => {
        if (error) {
            console.log(`Error: Issue at /refresh-token`);
        }
        else {
            JSON.parse(response.body, (key, value) => {
                if (key == 'access_token') {
                    accessToken = value;
                }
            });
            console.log(`Access token refreshed: ${accessToken}`);
        }
    });

    return;
});

app.get('/status', (req, res) => {
    res.send({ express: `I'm still alive. I'm on port ${ port }.`});
});


app.get('/user', (req, res) => {
    if (!loggedIn()) {
        res.send('Error: User not found. Please login first.');
    }
    else {
        let getOptions = {
            uri: 'https://api.spotify.com/v1/me',
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            }
        };

        request(getOptions, (error, response, body) => {
            if (error) {
                console.log(`Error: issue at /user`);
            }
            else {
                let userPayload = '';
                JSON.parse(response.body, (key, value) => {
                    
                    if (key == 'display_name') {
                        userPayload = userPayload.concat(` ${value}`);
                    }

                    //userPayload = userPayload.concat(`${key}:${value} \r\n`);
                });

                res.send(userPayload);
            }
        });
    }
    return;
});

app.get('/playlists', (req, res) => {
    if (!loggedIn()) {
        res.send('Error: User not found. Please login first.');
    }
    let getOptions = {
        uri: 'https://api.spotify.com/v1/me/playlists',
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    };

    request(getOptions, (error, response, body) => {
        if (error) {
            console.log('Error: Issue at /playlists.');
        }
        else {
            let playlistPayload = ``;
            JSON.parse(response.body, (key, value) => {
                playlistPayload = playlistPayload.concat(`${key} : ${value}`);
            });
            res.send(playlistPayload);
        }
    });

    

    return;
});


app.listen(port, ()=> console.log(`Listening on port ${ port }`));