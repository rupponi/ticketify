import React, { Component } from 'react';
import './navbar.css';

const BACKEND_URI = 'http://localhost:7000';


class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePicSrc: 'img/generic-profile-icon.jpg',
            displayName: ''
        };
    }

    componentDidMount() {
        let newState = {
            displayName: ''
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
            this.setState({
                profilePicSrc : userData.images[0].url,
                displayName : userData.display_name
            }); 
        });
    }

    render() {
        return (
            <div id = "navbar-component">
                <div class = "navbar-logo-button">
                    <img id = "navbar-logo" src = "img/spotify-logo-500.png" alt = "Spotify Navbar Logo"/>
                    <h1 id = "navbar-title">Ticketify</h1>
                </div>
                <div class = "navbar-divider"/>
                <div class = "navbar-button">
                    <img class = "navbar-button-logo" src = {this.state.profilePicSrc}></img>
                    <h1 class = "navbar-button-text unselectable">{this.state.displayName}</h1>
                </div>
                <div class = "navbar-divider"/>

                <h1 class = "navbar-section-title">PLAYLISTS</h1>
            </div>
        )
    }
}

export default NavBar;