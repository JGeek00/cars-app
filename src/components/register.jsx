import React, { Component } from 'react';

class Register extends Component {
    state = {
        name: '',
        surname: '',
        username: '',
        password: ''
    }

    state = {
        username: "",
        password: ""
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() { 
        return (
            <div className="registerContent">
                <div className="formFields">
                    <h1 className="title">Register</h1>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Name</label>
                        <input type="text" class="form-control" name="name" id="nameInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Surname</label>
                        <input type="text" class="form-control" name="surname" id="surnameInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Email</label>
                        <input type="email" class="form-control" name="email" id="emailInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Username</label>
                        <input type="text" class="form-control" name="username" id="usernameInput" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input type="text" class="form-control" name="password" id="passwordInput" onChange={this.handleChange}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleLogin}>Register</button>
                </div>
            </div>
        );
    }
}
 
export default Register;