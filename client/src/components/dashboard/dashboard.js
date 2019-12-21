import React, { Component } from 'react';
import './dashboard.css';

import NavBar from '../navbar/navbar';
import Profile from '../profile/profile';

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

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      view: <Profile/>,
      navbarState: {
        profilePicSrc: 'img/generic-profile-icon.jpg',
        displayName: '',
        playlistNames: []
      }
    };
  }

  componentDidMount() {
    let loadState = {
      view: <Profile/>,
      navbarState: {
        profilePicSrc: 'img/generic-profile-icon.jpg',
        displayName: '',
        playlistNames: []
      }
    };

    getUserandPlaylists()
      .then(([user, playlists]) => {
        let userData = JSON.parse(user), playlistData = JSON.parse(playlists);

        loadState.navbarState.profilePicSrc = userData.images[0].url;
        loadState.navbarState.displayName = userData.display_name;
        loadState.navbarState.playlistNames = playlistData.items.map(item => (
          item.name
        ));
      })
      .finally(() => {
        this.setState(loadState);
      });
  }

  render() {
    return (
      <div id = "dashboard">
        <meta name="viewport" content = "width=device-width, initial-scale=1"/>
        <div id = "navbar-container">
          <NavBar id = "navbar" state = {this.state.navbarState}/>
        </div>
        <div id = "view-container">
          {this.state.view}
        </div>
      </div>
    );
  }
}

export default Dashboard;
