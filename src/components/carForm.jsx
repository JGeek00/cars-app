import React, {Component} from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import config from '../config.json';

class CarForm extends Component {
    state = {
        id: "",
        model: "",
        brand: "",
        brands: []
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
        }

        const id = this.props.match.params.id;
        const brands = await axios.get(config.apiUrl + '/brands', {
            headers: {
                'x-access-token': token
            }
        });
        this.setState({brands: brands.data});
        if (id !== "new") {
            const car = await axios.get(config.apiUrl + '/cars/'+id, {
                headers: {
                    'x-access-token': token
                }
            });
            this.setState({
                id: id,
                model: car.data.model,
                brand: car.data.brand
            });
        }
        else {
            this.setState({id: id});
        }
    }

    handleUpdate = async () => {
        const token = window.sessionStorage.getItem('token');
        const id = this.state.id;
        const model = this.state.model;
        const brand = this.state.brand;
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
                this.props.history.push('/carslist');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                this.props.history.push('/login');
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
                this.props.history.push('/carslist');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                this.props.history.push('/login');
            }
            else if (result.data.result === "fail" && result.data.message !== "no-token") {
                toast.error("An error occurred while updating the car");
            }
        }
    }
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const {model, brand, brands} = this.state;
        return (
            <div className="addFormContent">
                <ToastContainer position="top-right"/>
                {
                    this.props.userType === "user" ? (
                        <h3>Car info</h3>
                    ) : (
                        this.props.match.params.id === "new" ? (
                            <h3>Add a new car</h3>
                        ) : (
                            <h3>Edit this car</h3>
                        )
                    )
                }
                <form>
                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input type="text" className="form-control" name="model" id="model" value={model} onChange={this.handleChange} disabled={this.props.userType === "admin" ? '' : 'disabled'}/>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" name="brand" onChange={this.handleChange} disabled={this.props.userType === "admin" ? '' : 'disabled'}>
                            <option value={brand === "" ? "selected" : ""}>Select a brand</option>
                            {
                                brands.map(oneBrand => (
                                    <option selected={brand === oneBrand._id ? "selected" : ""} value={oneBrand._id} key={oneBrand._id}>{oneBrand.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {
                        this.props.userType === "admin" ? (
                            <button type="button" className="btn btn-primary" onClick={this.handleUpdate}>Save</button>
                        ) : (
                            <React.Fragment/>
                        )
                    }
                </form>
            </div>
        )
    }
}

export default CarForm