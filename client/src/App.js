import React, { Component } from 'react';
import './App.css';

import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accessToken : '',
      user : null,
      playlists : null
    };
  }

  componentDidMount() {
    if (window.location.href.indexOf('?') !== -1) {
      this.setState({accessToken: window.location.href.split('=')});
      
    }
  }

  render() {
    const {accessToken} = this.state;

    return (
      accessToken === '' ? <Login/> : <Dashboard/>
    );
  }
}

export default App;
