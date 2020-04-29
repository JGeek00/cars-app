import React, {useEffect, useState} from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json';

function UserForm (props) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [submit, setSubmit] = useState(true);

    async function loadData() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            props.history.push('/login');
        }

        if (props.userType !== "admin") {
            props.history.push('/home');
        }

        const id = props.match.params.id;
        if (id !== "new") {
            const token = window.sessionStorage.getItem('token');
            const user = await axios.get(config.apiUrl + "/users/"+id, {
                headers: {
                    'x-access-token': token
                }
            });
            if (user.data.result === "fail" && user.data.message === "no-token") {
                window.sessionStorage.removeItem('token');
                props.history.push('/login');
            }

            setId(id);
            setName(user.data.name);
            setSurname(user.data.surname);
            setEmail(user.data.email);
            setUserType(user.data.type);
            setUsername(user.data.username);
            setPageTitle("Edit an user");
            setSubmit(false);
        }
        else {
            setId(id);
            setPageTitle("Create a new user")
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    const handleUpdate = async () => {
        if (id !== "" && name !== "" && surname !== "" && email !== "" && userType !== "" && username !== "") {
            if (id === "new") {
                const updatedUser = {
                    "name": name,
                    "surname": surname,
                    "email": email,
                    "userType": userType,
                    "username": username, 
                    "password": password
                }
                try {
                    const token = window.sessionStorage.getItem('token');
                    const result = await axios.post(config.apiUrl + "/users", updatedUser, {
                        headers: {
                            'x-access-token': token
                        }
                    });
                    if (result.data.result === "fail" && result.data.message === "no-token") {
                        window.sessionStorage.removeItem('token');
                        props.history.push('/login');
                    }
                    else if (result.data.result === "fail" && result.data.message === "username-not-available") {
                        toast.error("This username is not available");
                    }
                    else if (result.data.result === "success") {
                        props.history.push('/users');
                    }
                    else {
                        toast.error("Error when creating the user");
                    }
                } catch (err) {
                    toast.error("An error has occurred when creating the user");
                }
            }
            else {
                const updatedUser = {
                    "name": name,
                    "surname": surname,
                    "email": email,
                    "userType": userType,
                    "username": username
                }
                try {
                    const token = window.sessionStorage.getItem('token');
                    const result = await axios.put(config.apiUrl + "/users/" + id, updatedUser, {
                        headers: {
                            'x-access-token': token
                        }
                    });
                    if (result.data.result === "fail" && result.data.message === "no-token") {
                        window.sessionStorage.removeItem('token');
                        props.history.push('/login');
                    }
                    else if (result.data.result === "fail" && result.data.message !== "no-token") {
                        toast.error("An error has occurred when updating the user");
                    }
                    else if (result.data.result === "success") {
                        props.history.push('/users');
                    }
                } catch (error) {
                    toast.error("An error has occurred when updating the user");
                }
            }
        }
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
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
                
            case "userType":
                setUserType(value);
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
        if (id !== "" && name !== "" && surname !== "" && email !== "" && userType !== "" && username !== "") {
            setSubmit(false);
        }
        else {
            setSubmit(true);
        }
    }

    return (
        <div className="createUserForm">
            <ToastContainer position="top-right"/>
            <h3>{pageTitle}</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" id="name" value={name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Surname</label>
                    <input type="text" className="form-control" name="surname" id="surname" value={surname} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" id="email" value={email} onChange={handleChange}/>
                </div>
                <select className="custom-select" name="userType" onChange={handleChange} value={userType}>
                    <option value="">Select a type</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" id="username" value={username} onChange={handleChange}/>
                </div>
                {
                    id === "new" ? (
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" id="password" value={password} onChange={handleChange}/>
                        </div>
                    ) : (
                        <div></div>
                    )
                }
                <button type="button" className="btn btn-primary" onClick={handleUpdate} disabled={submit}>Save</button>
            </form>
        </div>
    )
}

export default UserForm