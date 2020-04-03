import React, { Component } from 'react';
import axios from 'axios';
import UsersTable from './usersTable';
import {Link} from 'react-router-dom';
import config from '../config.json';

class UserList extends Component {
    state = {
        users: [],
        tableHead: []
    }

    async componentDidMount () {
        const users = await axios.get(config.apiUrl + "/users");

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
        const users = await axios.get(config.apiUrl + "/users");

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
        const data = this.state.users;
        const newData = data.filter(user => user._id !== id);
        this.setState({
            users: newData,
            allUsers: newData
        });
        await axios.delete(config.apiUrl + "/users/"+id);
    }


    render() { 
        const {users, tableHead} = this.state;
        return (
            <div className="usersListContent">
                <div className="table">
                    <div className="buttons">
                        <Link to="users/new" className="btn btn-primary" api="users">Create user</Link>
                        <button className="btn btn-primary" onClick={this.handleUpdate}>Refresh</button>
                    </div>
                    <UsersTable data={users} tableHead={tableHead} api="users" handleDelete={this.handleDelete}/>
                </div>
            </div>
        );
    }
}
 
export default UserList;