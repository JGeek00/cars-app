import React, {useEffect, useState} from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import config from '../config.json';

import {connect, useDispatch} from 'react-redux';

function CarForm ({history, brands, userType, match}) {
    const dispatch = useDispatch(); 

    const [id, setId] = useState('');
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');

    const loadData = () => {
        return dispatch => {
            const token = window.sessionStorage.getItem('token');
            if (!token) {
                history.push('/login');
            }
    
            const id = match.params.id;
            if (id !== "new") {
                axios.get(config.apiUrl + '/cars/'+id, {
                    headers: {
                        'x-access-token': token
                    }
                }).then(car => {
                    setId(id);
                    setModel(car.data.model);
                    setBrand(car.data.brand);
                })           
            }
            else {
                setId(id);
            }
        }
    }

    useEffect(() => {  
        dispatch(loadData())
    }, []);

    const handleUpdate = async () => {
        const token = window.sessionStorage.getItem('token');

        const updatedCar = {
            "model": model,
            "brand": brand
        }

        if (id === "new") {
            const result = await axios.post(config.apiUrl + '/cars', updatedCar, {
                headers: {
                    'x-access-token': token
                }
            });
            if (result.data.result === "success") {
                history.push('/carslist');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                history.push('/login');
            }
            else if (result.data.result === "fail" && result.data.message !== "no-token") {
                toast.error("An error occurred while creating the car");
            }
        }
        else {
            const result = await axios.put(config.apiUrl + '/cars/' + id, updatedCar, {
                headers: {
                    'x-access-token': token
                }
            });
            if (result.data.result === "success") {
                history.push('/carslist');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                history.push('/login');
            }
            else if (result.data.result === "fail" && result.data.message !== "no-token") {
                toast.error("An error occurred while updating the car");
            }
        }
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "model") {
            setModel(value);
        }
        else if (name === "brand") {
            setBrand(value);
        }
    }

    return (
        <div className="addFormContent">
            <ToastContainer position="top-right"/>
            {
                userType === "user" ? (
                    <h3>Car info</h3>
                ) : (
                    match.params.id === "new" ? (
                        <h3>Add a new car</h3>
                    ) : (
                        <h3>Edit this car</h3>
                    )
                )
            }
            <form>
                <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <input type="text" className="form-control" name="model" id="model" value={model} onChange={handleChange} disabled={userType === "admin" ? '' : 'disabled'}/>
                </div>
                <div className="form-group">
                    <select className="custom-select" name="brand" value={brand} onChange={handleChange} disabled={userType === "admin" ? '' : 'disabled'}>
                        <option value={brand === "" ? "selected" : ""}>Select a brand</option>
                        {
                            brands.map(oneBrand => (
                                <option value={oneBrand._id} key={oneBrand._id}>{oneBrand.name}</option>
                            ))
                        }
                    </select>
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
    )
}

const mapStateToProps = (state) => ({
    brands: state.brands
});


export default connect(mapStateToProps, null)(CarForm);