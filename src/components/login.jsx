import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleLogin = () => {

    }

    render() { 
        return (
            <div className="loginContent">
                <div className="formFields">
                    <h1 className="loginTitle">Login</h1>
                    <div className="form-group">
                        <label for="usernameInput">Username</label>
                        <input type="text" class="form-control" name="username" id="usernameInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="passwordInput">Password</label>
                        <input type="text" class="form-control" name="password" id="passwordInput" onChange={this.handleChange}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleLogin}>Login</button>
                </div>
            </div>
        );
    }
}
 
export default Login;