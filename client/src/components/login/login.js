import React, { Component } from 'react';
import './login.css';

const LOGIN_URI = 'http://localhost:7000/login';

class Login extends Component {
    render() {
        return (
            <div id = "login-view">
                <div id = "login-button-container">
                    <div id = "login-button">
                        <a id = "login-button-text" className = "unselectable" href = {LOGIN_URI}>Log In with Spotify</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;