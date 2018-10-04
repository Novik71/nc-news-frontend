import React, { Component } from 'react'

export default class LoginControl extends Component {
    state = {
        userName: '',
        password: '',
    }
    render() {
        return (
            <div className="login_control">
                <h4><strong>Login</strong></h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
            <input type="text" name="userName" />
                    </label>
                    <br />
                    <label>
                        Password:
            <input type="password" name="password" />
                    </label>
                    <br />

                    <button>Login</button>
                    <br />

                </form>
            </div>
        )
    }
}
