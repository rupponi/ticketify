import React, { Component } from 'react';
import './dashboard.css';

import NavBar from '../navbar/navbar';
import Profile from '../profile/profile';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      view: 'profile'
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id = "dashboard">
        <meta name="viewport" content = "width=device-width, initial-scale=1"/>
        <div id = "navbar-container">
          <NavBar id = "navbar"/>
        </div>
        <div id = "view-container">
          {this.state.view} == 'profile' ? <Profile/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
