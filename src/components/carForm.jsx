import React, {Component} from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

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
        const brands = await axios.get('http://localhost:4000/api/brands', {
            headers: {
                'x-access-token': token
            }
        });
        this.setState({brands: brands.data});
        if (id !== "new") {
            const car = await axios.get('http://localhost:4000/api/cars/'+id, {
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
            const result = await axios.post('http://localhost:4000/api/cars', updatedCar, {
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
            const result = await axios.put('http://localhost:4000/api/cars/' + id, updatedCar, {
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
                <h3>Add a new car</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input type="text" className="form-control" name="model" id="model" value={model} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" name="brand" onChange={this.handleChange}>
                            <option selected={brand === "" ? "selected" : ""} value="">Select a brand</option>
                            {
                                brands.map(oneBrand => (
                                    <option selected={brand === oneBrand._id ? "selected" : ""} value={oneBrand._id} key={oneBrand._id}>{oneBrand.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleUpdate}>Save</button>
                </form>
            </div>
        )
    }
}

export default CarForm