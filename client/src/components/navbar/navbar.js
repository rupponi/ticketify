import React, { Component } from 'react';
import './navbar.css';

const BACKEND_URI = 'http://localhost:7000';
var userPlaylists = null;


class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePicSrc: 'img/generic-profile-icon.jpg',
            displayName: '',
            playlists: ['No Playlists']
        };
    }

    componentDidMount() {
        let loadState = {
            profilePicSrc: '',
            displayName: '',
            playlists: ['No Playlists']
        };

        fetch(`${BACKEND_URI}/user`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            let userData = JSON.parse(data);
            // Use this if you want to see the JSON user data for debugging.
            //alert(data);
            loadState.profilePicSrc = userData.images[0].url;
            loadState.displayName = userData.display_name;
        })
        .then(() => {
            fetch(`${BACKEND_URI}/playlists`, {
                method: 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                userPlaylists = JSON.parse(data);
                loadState.playlists = userPlaylists.items;
                alert(userPlaylists.items[0].name);
            });
        })
        .finally(() => {
            this.setState({
                profilePicSrc : loadState.profilePicSrc,
                displayName : loadState.displayName,
                playlists : loadState.playlists
            }); 
        });
    }

    render() {
        const playlists = this.state.playlists;

        /*

        for (const currentPlaylist of playlists.entries()) {
            playlistNames.push(
                <div class = "navbar-button">
                    <h1 class = "navbar-button-text unselectable">{currentPlaylist.name}</h1>
                </div>
            );
        }
        */

        return (
            <div id = "navbar-component">
                <div class = "navbar-logo-button">
                    <img id = "navbar-logo" src = "img/spotify-logo-500.png" alt = "Spotify Navbar Logo"/>
                    <h1 id = "navbar-title">Ticketify</h1>
                </div>
                <div class = "navbar-divider"/>
                <div class = "navbar-button">
                    <img class = "navbar-button-logo" src = {this.state.profilePicSrc} alt = "User Profile Thumbnail"/>
                    <h1 class = "navbar-button-text unselectable">{this.state.displayName}</h1>
                </div>
                <div class = "navbar-divider"/>

                <h1 class = "navbar-section-title unselectable">PLAYLISTS</h1>

            </div>
        )
    }
}

export default NavBar;