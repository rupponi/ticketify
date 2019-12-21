import React, { Component } from 'react';
import './navbar.css';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePicSrc: 'img/generic-profile-icon.jpg',
            displayName: '',
            playlistNames: []
        };
    }

    render() {
        let playlistNames = this.props.state.playlistNames;

        return (
            <div id = "navbar-component">
                <div class = "navbar-logo-button">
                    <img id = "navbar-logo" src = "img/spotify-logo-500.png" alt = "Spotify Navbar Logo"/>
                    <h1 id = "navbar-title">Ticketify</h1>
                </div>
                <div class = "navbar-divider"/>
                <div class = "navbar-profile-button">
                    <img class = "navbar-button-logo" src = {this.props.state.profilePicSrc} alt = "User Profile Thumbnail"/>
                    <h1 class = "navbar-profile-button-text unselectable">{this.props.state.displayName}</h1>
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