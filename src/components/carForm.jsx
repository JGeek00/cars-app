import React, {useEffect, useState} from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import config from '../config.json';
import {Redirect} from 'react-router-dom';

import {connect, useDispatch} from 'react-redux';

import {addCar, addCarId, updateCar, sortCars, setRedirectToLogin} from '../store';
import {loadCars} from '../actions/loadCars';
const mapDispatch = {addCar, addCarId, updateCar, sortCars, setRedirectToLogin, loadCars};

function CarForm ({history, brands, brandIds, userType, match, addCar, addCarId, sortCars, updateCar, redirectToLogin, setRedirectToLogin, loadCars}) {
    const dispatch = useDispatch(); 

    const [id, setId] = useState('');
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [creationDate, setCreationDate] = useState('');

    const token = window.sessionStorage.getItem('token');
    if (!token) {
        dispatch(setRedirectToLogin(true));
    }

    const loadData = () => {
        return () => {
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
                    setCreationDate(car.data.creationDate);
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
        if (model !== '' && brand !== '') {
            const token = window.sessionStorage.getItem('token');

            if (id === "new") {
                const updatedCar = {
                    model: model,
                    brand: brand
                }
                const result = await axios.post(config.apiUrl + '/cars', updatedCar, {
                    headers: {
                        'x-access-token': token
                    }
                });
                if (result.data.result === "success") {
                    const {id, creationDate} = result.data;
                    const newCar = {
                        _id: id,
                        model: updatedCar.model,
                        brand_id: updatedCar.brand,
                        creationDate: creationDate
                    }
                    
                    addCar({
                        id: id,
                        newCar: newCar
                    })
                    addCarId(id)

                    history.push('/carslist');
                }
                else if (result.data.result === "fail" && result.data.message === "no-token") { 
                    window.sessionStorage.removeItem('token');
                    dispatch(setRedirectToLogin(true));
                }
                else if (result.data.result === "fail" && result.data.message !== "no-token") {
                    toast.error("An error occurred while creating the car");
                }
            }
            else {
                const updatedCar = {
                    _id: id,
                    model: model,
                    brand: brand,
                    creationDate: creationDate
                } 

                const result = await axios.put(config.apiUrl + '/cars/' + id, updatedCar, {
                    headers: {
                        'x-access-token': token
                    }
                });
                if (result.data.result === "success") {
                    updateCar({
                        id: id,
                        updatedCar: updatedCar
                    });
                    sortCars();
                    history.push('/carslist');
                }
                else if (result.data.result === "fail" && result.data.message === "no-token") { 
                    window.sessionStorage.removeItem('token');
                    dispatch(setRedirectToLogin(true));
                }
                else if (result.data.result === "fail" && result.data.message !== "no-token") {
                    toast.error("An error occurred while updating the car");
                }
            }
        }
        else {
            toast.warning("All fields must be filled");
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
            {
                redirectToLogin === false ? (
                    <div>
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
                                        brandIds.map(brandId => (
                                            <option value={brandId} key={brandId}>{brands.data[brandId].name}</option>
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
                ) : (
                    <Redirect to="/login"/>
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    brands: state.brands,
    brandIds: state.brandIds,
    carIds: state.carIds,
    allCars: state.allCars,
    redirectToLogin: state.redirectToLogin
});


export default connect(mapStateToProps, mapDispatch)(CarForm);