import React, { Component } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';
import config from '../config.json';

class BradsForm extends Component {
    state = {
        name: ""
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const {data} = await axios.get(config.apiUrl + '/brands/' + id);
        this.setState({name: data.name});
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleUpdate = async () => {
        const id = this.props.match.params.id;
        const { name } = this.state;
        if (id === "new") {
            const newBrand = {name: name};
            const query = await axios.post(config.apiUrl + '/brands', newBrand);
            if (query.data.result === "success") {
                this.props.history.push('/brands');
            }
            else if (query.data.result === "fail") {
                toast.error("An error has occurred when adding the brand")
            }
        }
        else {
            const updatedBrand = {name: name};
            const query = await axios.put(config.apiUrl + '/brands/' + id, updatedBrand);
            if (query.data.result === "success") {
                this.props.history.push('/brands');
            }
            else if (query.data.result === "fail") {
                toast.error("An error has occurred when updating the brand")
            }
        }
    }

    render() { 
        const {name} = this.state;
        return (
            <div className="addFormContent">
                <ToastContainer position="top-right"/>
                <h3>Add a new brand</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" id="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleUpdate}>Save</button>
                </form>
            </div>
        );
    }
}
 
export default BradsForm;