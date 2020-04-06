import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.json';

class Register extends Component {
    state = {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: ''
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleRegister = async () => {
        const {username, password, name, surname, email} = this.state;
        const result = await axios.post(config.apiUrl + '/register', {
            username: username,
            password: password,
            name: name,
            surname: surname,
            email: email
        });
        if (result.data.result === "success") {
            this.props.history.push('/login');
        }
    }

    render() { 
        return (
            <div className="registerContent">
                <div className="formFields">
                    <h1 className="title">Register</h1>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Name</label>
                        <input type="text" className="form-control" name="name" id="nameInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Surname</label>
                        <input type="text" className="form-control" name="surname" id="surnameInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Email</label>
                        <input type="email" className="form-control" name="email" id="emailInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Username</label>
                        <input type="text" className="form-control" name="username" id="usernameInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password" className="form-control" name="password" id="passwordInput" onChange={this.handleChange}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleRegister}>Register</button>
                </div>
            </div>
        );
    }
}
 
export default Register;