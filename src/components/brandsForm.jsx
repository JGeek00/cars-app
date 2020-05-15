import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';
import config from '../config.json';

import {connect, useDispatch} from 'react-redux';
import {addBrand, addBrandId, editBrand, sortBrands, setRedirectToLogin} from '../store';

const mapDispatch = {addBrand, addBrandId, editBrand, sortBrands, setRedirectToLogin};

function BrandsForm ({history, match, userType, addBrand, addBrandId, editBrand, sortBrands, setRedirectToLogin}) {
    const [name, setName] = useState('');

    async function loadData() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            history.push('/login');
        }

        const id = match.params.id;
        if (id !== "new") {
        const {data} = await axios.get(config.apiUrl + '/brands/' + id, {
            headers: {
                'x-access-token': token
            }
            });
            setName(data.name);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        const {value} = e.target;
        setName(value);
    }

    const handleUpdate = async () => {
        const token = window.sessionStorage.getItem('token');
        const id = match.params.id;
        if (id === "new") {
            const newBrand = {name: name};
            const result = await axios.post(config.apiUrl + '/brands', newBrand, {
                headers: {
                    'x-access-token': token
                }
            });
            if (result.data.result === "success") {
                const newBrand = {
                    _id: result.data.id,
                    name: name
                }
                addBrand({
                    id: result.data.id,
                    newBrand: newBrand
                });
                addBrandId(result.data.id);
                history.push('/brands');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                history.push('/login');
            }
            else if (result.data.result === "fail" && result.data.message !== "no-token") {
                toast.error("An error occurred while creating the brand");
            }
        }
        else {
            const updatedBrand = {name: name};
            const result = await axios.put(config.apiUrl + '/brands/' + id, updatedBrand, {
                headers: {
                    'x-access-token': token
                }
            });
            if (result.data.result === "success") {
                const updatedBrand = {
                    _id: id,
                    name: name
                }
                editBrand({
                    id: id,
                    updatedBrand: updatedBrand
                });
                sortBrands();
                history.push('/brands');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                history.push('/login');
            }
            else if (result.data.result === "fail" && result.data.message !== "no-token") {
                toast.error("An error occurred while creating the brand");
            }
        }
    }

    return (
        <div className="addFormContent">
            <ToastContainer position="top-right"/>
            {
                userType === "admin" ? (
                    match.params.id === "new" ? (
                        <h3>Create a new brand</h3>
                    ) : (
                        <h3>Edit a brand</h3>
                    )
                ) : (
                    <h3>Brand info</h3>
                )
            }
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" id="name" value={name} onChange={handleChange} disabled={userType === "admin" ? "" : 'disabled'}/>
                </div>
                {
                    userType === "admin" ? (
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save</button>
                    ) : (
                        <React.Fragment/>
                    )
                }
            </form>
        </div>
    );
}
 
export default connect(null, mapDispatch)(BrandsForm);