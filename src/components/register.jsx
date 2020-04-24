import React, {useState} from 'react';
import axios from 'axios';
import config from '../config.json';

function Register (props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        switch (name) {
            case "name":
                setName(value);
                break;

            case "surname":
                setSurname(value);
                break;

            case "email":
                setEmail(value);
                break;

            case "username":
                setUsername(value);
                break;

            case "password":
                setPassword(value);
                break;

            default:
                break;
        }
    }

    const handleRegister = async () => {
        const result = await axios.post(config.apiUrl + '/register', {
            username: username,
            password: password,
            name: name,
            surname: surname,
            email: email
        });
        if (result.data.result === "success") {
            props.history.push('/login');
        }
    }

    return (
        <div className="registerContent">
            <div className="formFields">
                <h1 className="title">Register</h1>
                <div className="form-group">
                    <label htmlFor="usernameInput">Name</label>
                    <input type="text" className="form-control" name="name" id="nameInput" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="usernameInput">Surname</label>
                    <input type="text" className="form-control" name="surname" id="surnameInput" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="usernameInput">Email</label>
                    <input type="email" className="form-control" name="email" id="emailInput" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" className="form-control" name="username" id="usernameInput" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" className="form-control" name="password" id="passwordInput" onChange={handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
}
 
export default Register;