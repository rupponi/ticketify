import React, { Component } from 'react';
import './navbar.css';
import { genericImage } from '../../img/generic-profile-icon.jpg';


class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profileImage : genericImage,
            displayName : ''
        };
    }

    componentDidMount() {
        this.setState({profileImage: genericImage, displayName: 'Rohan Upponi'});
    }

    async getUserData() {

    }

    render() {
        const {profileImage, displayName} = this.state;

        return (
            <div id = "navbar-component">
                <div class = "navbar-logo-button">
                    <img id = "navbar-logo" src = "img/spotify-logo-500.png" alt = "Spotify Navbar Logo"/>
                    <h1 id = "navbar-title">Ticketify</h1>
                </div>
                <div class = "navbar-button">
                    <img class = "navbar-button-image" src = { genericImage }></img>
                    <h1 class = "navbar-button-text">{displayName}</h1>
                </div>
            </div>
        )
    }
}

export default NavBar;