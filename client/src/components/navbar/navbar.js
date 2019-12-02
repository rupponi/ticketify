import React, { Component } from 'react';
import './navbar.css';

const BACKEND_URI = 'http://localhost:7000';


async function getUser() {
    return fetch(`${BACKEND_URI}/user`, {
                method: 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(response => response.json());
}

async function getPlaylists() {
    return fetch(`${BACKEND_URI}/playlists`, {
                method: 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(response => response.json());
}

function getUserandPlaylists() {
    return Promise.all([getUser(), getPlaylists()]);
}


class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePicSrc: 'img/generic-profile-icon.jpg',
            displayName: '',
            playlistNames: []
        };
    }

    componentDidMount() {
        let loadState = {
            profilePicSrc: '',
            displayName: '',
            playlistNames: []
        };

        getUserandPlaylists()
            .then(([user, playlists]) => {
                let userData = JSON.parse(user), playlistData = JSON.parse(playlists);

                loadState.profilePicSrc = userData.images[0].url;
                loadState.displayName = userData.display_name;
                loadState.playlistNames = playlistData.items.map(item => (
                    item.name
                ));
            })
            .then(() => {
                this.setState(loadState);
            })
    }

    render() {
        const playlistNames = this.state.playlistNames;

        return (
            <div id = "navbar-component">
                <div class = "navbar-logo-button">
                    <img id = "navbar-logo" src = "img/spotify-logo-500.png" alt = "Spotify Navbar Logo"/>
                    <h1 id = "navbar-title">Ticketify</h1>
                </div>
                <div class = "navbar-divider"/>
                <div class = "navbar-profile-button">
                    <img class = "navbar-button-logo" src = {this.state.profilePicSrc} alt = "User Profile Thumbnail"/>
                    <h1 class = "navbar-profile-button-text unselectable">{this.state.displayName}</h1>
                </div>
                <div class = "navbar-divider"/>

                <h1 class = "navbar-section-title unselectable">PLAYLISTS</h1>

                <div>
                    {
                        playlistNames.map(playlistName =>
                            <div class = "navbar-button">
                                <h1 class = "navbar-button-text unselectable">{playlistName}</h1>
                            </div>
                        )
                    }
                </div>

            </div>
        )
    }
}

export default NavBar;