import React, { Component } from 'react';
import * as api from '../api';

export default class LoginControl extends Component {

    state = {
        username: '',
        password: '',
        userMatch: null
    }

    render() {
        if (!this.props.loggedInUser) {
            return (
                <div className="login_control">
                    <form className="login_form">
                        <label for="username" id="username_label">Username:</label>
                        <input id="username" type="text" name="username" onChange={this.handleChange} value={this.state.username} />
                        <label for="password" id="password_label">Password:</label>
                        <input id="password" type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                        <button className="login_button" onClick={this.handleLogin}>Login</button><br />
                    </form>
                </div>
            )
        } else {
            return <div className="login_control" id="login_info">
                <h5 className="logged_in">Logged in as <strong>{this.props.loggedInUser.username}</strong></h5>
                <button className="login_button" id="logout_button" onClick={this.handleLogout}>Logout</button>
            </div>
        }
    }

    handleChange = ({ target }) => {
        const { value, name } = target;
        return this.setState({
            [name]: value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        return api.fetchUsers()
            .then((users) => {
                const userMatch = users.filter((user) => {
                    return user.username === this.state.username;
                })[0];
                this.setState({
                    userMatch, username: '', password: ''
                });
                return this.props.logInUser(this.state.userMatch)
            })
    }

    handleLogout = (e) => {
        e.preventDefault();
        return this.props.logInUser(null)
    }
}

