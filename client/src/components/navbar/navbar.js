import React, { Component } from 'react';
import './navbar.css';


class NavBar extends Component {


    render() {
        return (
            <div id = "navbar-component">
                <img id = "navbar-logo" src = "img/spotify-logo-500.png" alt = "Spotify Navbar Logo"/>
            </div>
        )
    }
}

export default NavBar;