import React, {Component} from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json';

class UserForm extends Component {
    state = {
        id: "",
        name: "",
        surname:"",
        email: "",
        userType: "",
        username: "", 
        password: "",
        pageTitle: "",
        submit: true
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
        }

        if (this.props.userType !== "admin") {
            this.props.history.push('/home');
        }

        const id = this.props.match.params.id;
        if (id !== "new") {
            const token = window.sessionStorage.getItem('token');
            const user = await axios.get(config.apiUrl + "/users/"+id, {
                headers: {
                    'x-access-token': token
                }
            });
            if (user.data.result === "fail" && user.data.message === "no-token") {
                window.sessionStorage.removeItem('token');
                this.props.history.push('/login');
            }
            this.setState({
                id: id,
                name: user.data.name,
                surname: user.data.surname,
                email: user.data.email,
                userType: user.data.type,
                username: user.data.username,
                pageTitle: "Edit an user",
                submit: false
            });
        }
        else {
            this.setState({
                id: id,
                pageTitle: "Create a new user"
            });
        }
    }

    handleUpdate = async () => {
        const {id, name, surname, email, userType, username, password} = this.state;
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
                        this.props.history.push('/login');
                    }
                    else if (result.data.result === "fail" && result.data.message === "username-not-available") {
                        toast.error("This username is not available");
                    }
                    else if (result.data.result === "success") {
                        this.props.history.push('/users');
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
                        this.props.history.push('/login');
                    }
                    else if (result.data.result === "fail" && result.data.message !== "no-token") {
                        toast.error("An error has occurred when updating the user");
                    }
                    else if (result.data.result === "success") {
                        this.props.history.push('/users');
                    }
                } catch (error) {
                    toast.error("An error has occurred when updating the user");
                }
            }
        }
    }
    
    handleChange = (e) => {
        const state = this.state;
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (state.id !== "" && state.name !== "" && state.surname !== "" && state.email !== "" && state.user !== "" && state.username !== "") {
            this.setState({submit: false});
        }
        else {
            this.setState({submit: true});
        }
    }

    render() {
        const {id, name, surname, email, userType, username, password, pageTitle, submit} = this.state;
        return (
            <div className="createUserForm">
                <ToastContainer position="top-right"/>
                <h3>{pageTitle}</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" id="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Surname</label>
                        <input type="text" className="form-control" name="surname" id="surname" value={surname} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" id="email" value={email} onChange={this.handleChange}/>
                    </div>
                    <select className="custom-select" name="userType" onChange={this.handleChange} value={userType}>
                        <option value="">Select a type</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" id="username" value={username} onChange={this.handleChange}/>
                    </div>
                    {
                        id === "new" ? (
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" id="password" value={password} onChange={this.handleChange}/>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                    <button type="button" className="btn btn-primary" onClick={this.handleUpdate} disabled={submit}>Save</button>
                </form>
            </div>
        )
    }
}

export default UserForm