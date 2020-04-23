import React, {useEffect, useState} from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import config from '../config.json';

function CarForm (props) {
    const [id, setId] = useState('');
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [brands, setBrands] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (firstLoad === true) {
            loadData();
            setFirstLoad(false);
        }
        
        async function loadData() {
            const token = window.sessionStorage.getItem('token');
            if (!token) {
                props.history.push('/login');
            }
    
            const id = props.match.params.id;
            const brands = await axios.get(config.apiUrl + '/brands', {
                headers: {
                    'x-access-token': token
                }
            });
            
            setBrands(brands.data);

            if (id !== "new") {
                const car = await axios.get(config.apiUrl + '/cars/'+id, {
                    headers: {
                        'x-access-token': token
                    }
                });

                setId(id);
                setModel(car.data.model);
                setBrand(car.data.brand);
            }
            else {
                setId(id);
            }
        }
    }, [props, firstLoad]);

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
                props.history.push('/carslist');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                props.history.push('/login');
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
                props.history.push('/carslist');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                props.history.push('/login');
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
                props.userType === "user" ? (
                    <h3>Car info</h3>
                ) : (
                    props.match.params.id === "new" ? (
                        <h3>Add a new car</h3>
                    ) : (
                        <h3>Edit this car</h3>
                    )
                )
            }
            <form>
                <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <input type="text" className="form-control" name="model" id="model" value={model} onChange={handleChange} disabled={props.userType === "admin" ? '' : 'disabled'}/>
                </div>
                <div className="form-group">
                    <select className="custom-select" name="brand" value={brand} onChange={handleChange} disabled={props.userType === "admin" ? '' : 'disabled'}>
                        <option value={brand === "" ? "selected" : ""}>Select a brand</option>
                        {
                            brands.map(oneBrand => (
                                <option value={oneBrand._id} key={oneBrand._id}>{oneBrand.name}</option>
                            ))
                        }
                    </select>
                </div>
                {
                    props.userType === "admin" ? (
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save</button>
                    ) : (
                        <React.Fragment/>
                    )
                }
            </form>
        </div>
    )
}

export default CarForm