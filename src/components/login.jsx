import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import config from '../config.json';
import {ToastContainer, toast} from 'react-toastify';

function Login (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitStatus, setSubmitStatus] = useState(true);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "username") {
            setUsername(value);
        }
        else if (name === "password") {
            setPassword(value);
        }

        if (username !== '' && password !== '') {
            setSubmitStatus(false);
        }
        else {
            setSubmitStatus(true);
        }
    }

    const handleLogin = async () => {
        if (username !== '' && password !== '') {
            try {
                const response = await axios.post(config.apiUrl + '/login', {
                    username: username,
                    password: password
                });
                if (response.data.result === "success") {
                    window.sessionStorage.setItem('token', response.data.token);
                    props.onLogin(response.data.userData);
                    props.history.push('/home');
                }
                else if (response.data.result === "fail" && response.data.message === "password-not-match") {
                    toast.error("Invalid password");
                }
            } catch (error) {
                toast.error("Invalid username or password");
            }
        }
        else {
            toast.warn("Username and password can't be empty");
        }
    }

    return (
        <div className="loginContent">
            <ToastContainer position="top-right"/>
            <div className="formFields">
                <h1 className="title">Login</h1>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" className="form-control" name="username" id="usernameInput" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" className="form-control" name="password" id="passwordInput" onChange={handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={handleLogin} disabled={submitStatus}>Login</button>
                <Link to="/register" className="register-button btn btn-primary">Register</Link>
            </div>
        </div>
    );
}
 
export default Login;