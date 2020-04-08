import React, { Component } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import config from '../config.json';
import {ToastContainer, toast} from 'react-toastify';

class Profile extends Component {
    state = {
        id: '',
        name: '',
        surname: '',
        email: '',
        username: '',
        submit: true,
        pageTitle: 'Profile'
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
        }

        const user = await axios.get(config.apiUrl + '/profile', {
            headers: {
                'x-access-token': token
            }
        });

        if (user.data.result === "fail" && user.data.message === "no-token") {
            window.sessionStorage.removeItem('token');
            this.props.history.push('/login');
        }
        this.setState({
            id: user.data._id,
            name: user.data.name,
            surname: user.data.surname,
            email: user.data.email,
            username: user.data.username,
            submit: false
        });
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
        if (this.state.id !== "" && this.state.name !== "" && this.state.surname !== "" && this.state.email !== "" && this.state.username !== "") {
            this.setState({submit: false});
        }
        else {
            this.setState({submit: true});
        }
    }

    handleUpdate = async () => {
        const {id, name, surname, email, username} = this.state;
        if (id !== "" && name !== "" && surname !== "" && email !== "" && username !== "") {
            const token = window.sessionStorage.getItem('token');
            const updatedUser = {
                id: id,
                name: name,
                surname: surname,
                email: email,
                username: username
            }
            const user = await axios.put(config.apiUrl + '/profile', updatedUser, {
                headers: {
                    'x-access-token': token
                }
            });
            if (user.data.result === "fail" && user.data.message === "no-token") {
                window.sessionStorage.removeItem('token');
                this.props.history.push('/login');
            }
            else if (user.data.result === "success") {
                toast.success("Updated successfully");
            }
        }
    }

    render() { 
        const {name, surname, email, username, submit, pageTitle} = this.state;
        return (
            <div>
                <Navbar/>
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
                        <button type="button" className="btn btn-primary" onClick={this.handleUpdate} disabled={submit}>Save</button>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Profile;