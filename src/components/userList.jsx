import React, {useEffect, useState} from 'react';
import axios from 'axios';
import UsersTable from './usersTable';
import {Link, Redirect} from 'react-router-dom';
import config from '../config.json';
import Navbar from './navbar';
import {ToastContainer, toast} from 'react-toastify';
import Loading from './common/loading';

import {connect, useDispatch} from 'react-redux';
import {setUsers, setRedirectToLogin} from '../store';
import {loadUsers} from '../actions/loadUsers';

const mapDispatch = {setUsers, loadUsers, setRedirectToLogin};

function UserList ({history, userType, users, loadUsers, setUsers, redirectToLogin, setRedirectToLogin}) {
    const dispatch = useDispatch(); 

    const [tableHead, setTableHead] = useState([]);

    const token = window.sessionStorage.getItem('token');
    if (!token) {
        dispatch(setRedirectToLogin(false));
    }

    const loadData = () => {
        return () => {
            if (userType !== "admin") {
                history.push('/home');
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

            setTableHead(tableHead);
        }
    }

    useEffect(() => {
        dispatch(loadData());
    }, []);

    const handleUpdate = async () => {
        const token = window.sessionStorage.getItem('token');
        const users = await axios.get(config.apiUrl + "/users", {
            headers: {
                'x-access-token': token
            }
        });
        if (users.data.result === "fail" && users.data.message === "no-token") {
            window.sessionStorage.removeItem('token');
            history.push('/login');
        }

        setUsers(users.data);

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

        setTableHead(tableHead);
    }

    const handleDelete = async (id) => {
        const token = window.sessionStorage.getItem('token');
        const result = await axios.delete(config.apiUrl + "/users/"+id, {
            headers: {
                'x-access-token': token
            }
        });
        if (result.data.result === "fail" && result.data.message === "no-token") {
            window.sessionStorage.removeItem('token');
            history.push('/login');
        }
        else if (result.data.result === "fail" && result.data.message === "same-user") {
            toast.error("You can't delete your own user");
        }
        else if (result.data.result === "success") {
            const data = users;
            const newData = data.filter(user => user._id !== id);
            users(newData);
        }
    }


    return (
        <div>
            <Navbar userType={userType}/>
            {
                redirectToLogin === false ? (
                    <div>
                        <ToastContainer position="top-right"/>
                        {
                            users.isFetching === false ? (
                                <div className="usersListContent">
                                    <div className="table">
                                        <div className="buttons">
                                            <Link to="users/new" className="btn btn-primary" api="users">Create user</Link>
                                            <button className="btn btn-primary" onClick={handleUpdate}>Refresh</button>
                                        </div>
                                        <UsersTable data={users.data} tableHead={tableHead} api="users" handleDelete={handleDelete}/>
                                    </div>
                                </div>
                            ) : (
                                <div className="loading">
                                    <Loading/>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <Redirect to="/login"/>
                )
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    users: state.users,
    redirectToLogin: state.redirectToLogin
});
 
export default connect(mapStateToProps, mapDispatch)(UserList);