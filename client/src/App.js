import React, { Component } from 'react';
import './App.css';

import NavBar from './components/navbar/navbar';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      loading: true,
      display_name: ''
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <meta name="viewport" content = "width=device-width, initial-scale=1"/>
        <NavBar id = "navbar"/>
      </div>
    );
  }
}

export default App;
