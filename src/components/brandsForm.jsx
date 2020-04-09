import React, { Component } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';
import config from '../config.json';

class BradsForm extends Component {
    state = {
        name: ""
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
        }

        const id = this.props.match.params.id;
        const {data} = await axios.get(config.apiUrl + '/brands/' + id, {
            headers: {
                'x-access-token': token
            }
        });
        this.setState({name: data.name});
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleUpdate = async () => {
        const token = window.sessionStorage.getItem('token');
        const id = this.props.match.params.id;
        const { name } = this.state;
        if (id === "new") {
            const newBrand = {name: name};
            const result = await axios.post(config.apiUrl + '/brands', newBrand, {
                headers: {
                    'x-access-token': token
                }
            });
            if (result.data.result === "success") {
                this.props.history.push('/brands');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                this.props.history.push('/login');
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
                this.props.history.push('/brands');
            }
            else if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                this.props.history.push('/login');
            }
            else if (result.data.result === "fail" && result.data.message !== "no-token") {
                toast.error("An error occurred while creating the brand");
            }
        }
    }

    render() { 
        const {name} = this.state;
        return (
            <div className="addFormContent">
                <ToastContainer position="top-right"/>
                {
                    this.props.userType === "admin" ? (
                        this.props.match.params.id === "new" ? (
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
                        <input type="text" className="form-control" name="name" id="name" value={name} onChange={this.handleChange} disabled={this.props.userType === "admin" ? "" : 'disabled'}/>
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
        );
    }
}
 
export default BradsForm;