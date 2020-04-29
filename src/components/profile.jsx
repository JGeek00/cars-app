import React, {useEffect, useState} from 'react';
import Navbar from './navbar';
import axios from 'axios';
import config from '../config.json';
import {ToastContainer, toast} from 'react-toastify';

function Profile (props) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [submit, setSubmit] = useState(true);
    const [pageTitle] = useState('Profile');

    async function loadData() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            props.history.push('/login');
        }

        const user = await axios.get(config.apiUrl + '/profile', {
            headers: {
                'x-access-token': token
            }
        });

        if (user.data.result === "fail" && user.data.message === "no-token") {
            window.sessionStorage.removeItem('token');
            props.history.push('/login');
        }

        setId(user.data._id);
        setName(user.data.name);
        setSurname(user.data.surname);
        setEmail(user.data.email);
        setUsername(user.data.username);
        setSubmit(false);
    }

    useEffect(() => {
        loadData();
    }, []);

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

            default:
                break;
        }
        if (id !== "" && name !== "" && surname !== "" && email !== "" && username !== "") {
            setSubmit(false)
        }
        else {
            setSubmit(true)
        }
    }

    const handleUpdate = async () => {
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
                props.history.push('/login');
            }
            else if (user.data.result === "success") {
                toast.success("Updated successfully");
            }
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="addFormContent">
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
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" id="username" value={username} onChange={handleChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleUpdate} disabled={submit}>Save</button>
                </form>
            </div>
        </div>
    );
}
 
export default Profile;