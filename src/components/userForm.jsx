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
        username: "", 
        password: "",
        pageTitle: "",
        submit: true
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        if (id !== "new") {
            const user = await axios.get(config.apiUrl + "/users/"+id);
            this.setState({
                id: id,
                name: user.data.name,
                surname: user.data.surname,
                email: user.data.email,
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
        const {id, name, surname, email, username, password} = this.state;
        if (id !== "" && name !== "" && surname !== "" && email !== "" && username !== "") {
            if (id === "new") {
                const updatedUser = {
                    "name": name,
                    "surname": surname,
                    "email": email,
                    "username": username, 
                    "password": password
                }
                try {
                    const result = await axios.post(config.apiUrl + "/users", updatedUser);
                    if (result.data.result === "fail") {
                        if (result.data.message === "username-not-available") {
                            toast.error("This username is not available");
                        }
                        else {
                            toast.error("Error when creating the user");
                        }
                        
                    }
                    else if (result.data.result === "success") {
                        this.props.history.push('/users');
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
                    "username": username
                }
                try {
                    const result = await axios.put(config.apiUrl + "/users/" + id, updatedUser);
                    console.log("update",result);
                    if (result.data.result === "fail") {
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
        if (state.id !== "" && state.name !== "" && state.surname !== "" && state.email !== "" && state.username !== "") {
            this.setState({submit: false});
        }
        else {
            this.setState({submit: true});
        }
    }

    render() {
        const {id, name, surname, email, username, password, pageTitle, submit} = this.state;
        return (
            <div className="addFormContent">
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