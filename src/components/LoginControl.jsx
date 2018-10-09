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
                    <h4><strong>Login</strong></h4>
                    <form >
                        <label>Username:<input type="text" name="username" onChange={this.handleChange} value={this.state.username} /></label><br />
                        <label>Password:<input type="password" name="password" onChange={this.handleChange} value={this.state.password} /></label><br />
                        <button className="login_button" onClick={this.handleLogin}>Login</button><br />
                    </form>
                </div>
            )
        } else {
            return <div className="login_control">
                <h5>Logged in as <strong>{this.props.loggedInUser.username}</strong></h5>
                <button className="login_button" onClick={this.handleLogout}>Logout</button>
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

