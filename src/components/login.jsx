import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
                    <h1 className="title">Login</h1>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Username</label>
                        <input type="text" className="form-control" name="username" id="usernameInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input type="text" className="form-control" name="password" id="passwordInput" onChange={this.handleChange}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleLogin}>Login</button>
                    <Link to="/register" className="register-button btn btn-primary">Register</Link>
                </div>
            </div>
        );
    }
}
 
export default Login;