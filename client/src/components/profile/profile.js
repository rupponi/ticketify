import React, { Component } from 'react';
import './profile.css';

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

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePic: 'img/generic-profile-icon.jpg',
            name: '',
            following: 0,
            followers: 0
        };
    }

    componentDidMount() {
        let loadState = {
            profilePic: 'img/generic-profile-icon.jpg',
            name: '',
            following: 0,
            followers: 0
        };

        getUser()
            .then(user => {
                let userData = JSON.parse(user);

                loadState.profilePic = userData.images[0].url;
                loadState.name = userData.display_name;
                loadState.followers = userData.followers.total;
            })
            .then(() => {
                this.setState(loadState);
            });
    }

    render() {
        return(
            <div id = "profile-component">
                <img id = "profile-picture" class = "unselectable" src = {this.state.profilePic} alt = "Profile Thumbnail"/>
                <h1 id = "profile-name" class = "unselectable">{this.state.name}</h1>

                <div id = "follow-section">
                    <div id = "followers-section">
                        <h1 class = "follow-text unselectable">FOLLOWERS</h1>
                        <h1 class = "follow-num unselectable">{this.state.followers}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;