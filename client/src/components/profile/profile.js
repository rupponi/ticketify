import React, { Component } from 'react';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };
    }

    componentDidMount() {
        fetch('/login')
        .then((response) => response.json())
        .then((responseJson) => {
            alert(responseJson);
            this.setState({
                message: responseJson.data
            });
        })
    }

    render() {
        return(
            <div id = "profile-component">
            </div>
        );
    }
}

export default Profile;