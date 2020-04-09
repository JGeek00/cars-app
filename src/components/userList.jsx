import React, { Component } from 'react';
import axios from 'axios';
import UsersTable from './usersTable';
import {Link} from 'react-router-dom';
import config from '../config.json';
import Navbar from './navbar';
import {ToastContainer, toast} from 'react-toastify';

class UserList extends Component {
    state = {
        users: [],
        tableHead: []
    }

    async componentDidMount () {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
        }

        if (this.props.userType !== "admin") {
            this.props.history.push('/home');
        }
    
        const users = await axios.get(config.apiUrl + "/users", {
            headers: {
                'x-access-token': token
            }
        });
        if (users.data.result === "fail" && users.data.message === "no-token") {
            window.sessionStorage.removeItem('token');
            this.props.history.push('/login');
        }

        const tableHead = [
            {
                "id:": 1,
                "name": "Name"
            },
            {
                "id": 2,
                "name": "Surname"
            },
            {
                "id": 3,
                "name": "Email"
            },
            {
                "id": 4,
                "name": "Username"
            },
            {
                "id": 5,
                "name": ""
            }
        ]

        this.setState({
            users: users.data,
            tableHead: tableHead,
        });
    }

    handleUpdate = async () => {
        const token = window.sessionStorage.getItem('token');
        const users = await axios.get(config.apiUrl + "/users", {
            headers: {
                'x-access-token': token
            }
        });
        if (users.data.result === "fail" && users.data.message === "no-token") {
            window.sessionStorage.removeItem('token');
            this.props.history.push('/login');
        }

        this.setState({
            users: users.data
        });

        const tableHead = [
            {
                "id:": 1,
                "name": "Name"
            },
            {
                "id": 2,
                "name": "Surname"
            },
            {
                "id": 3,
                "name": "Email"
            },
            {
                "id": 4,
                "name": "Username"
            }
        ]

        this.setState({tableHead: tableHead});
    }

    handleDelete = async (id) => {
        const token = window.sessionStorage.getItem('token');
        const result = await axios.delete(config.apiUrl + "/users/"+id, {
            headers: {
                'x-access-token': token
            }
        });
        if (result.data.result === "fail" && result.data.message === "no-token") {
            window.sessionStorage.removeItem('token');
            this.props.history.push('/login');
        }
        else if (result.data.result === "fail" && result.data.message === "same-user") {
            toast.error("You can't delete your own user");
        }
        else if (result.data.result === "success") {
            const data = this.state.users;
            const newData = data.filter(user => user._id !== id);
            this.setState({
                users: newData,
                allUsers: newData
            });
        }
    }


    render() { 
        const {users, tableHead} = this.state;
        return (
            <div>
                <Navbar userType={this.props.userType}/>
                <ToastContainer position="top-right"/>
                <div className="usersListContent">
                    <div className="table">
                        <div className="buttons">
                            <Link to="users/new" className="btn btn-primary" api="users">Create user</Link>
                            <button className="btn btn-primary" onClick={this.handleUpdate}>Refresh</button>
                        </div>
                        <UsersTable data={users} tableHead={tableHead} api="users" handleDelete={this.handleDelete}/>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default UserList;