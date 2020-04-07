import React, { Component } from 'react';
import BrandsTable from './brandsTable';
import axios from 'axios';
import config from '../config.json';
import {Link} from 'react-router-dom';

class BrandsList extends Component {
    state = {
        brands: []
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
        }

        const brands = await axios.get(config.apiUrl + '/brands', {
            headers: {
                'x-access-token': token
            }
        });
        this.setState({ brands: brands.data });
    }

    render() { 
        const {brands} = this.state;
        return (
            <div className="contentBrandsList">
                <div className="contentTop">
                    <Link to="brands/new" className="btn btn-primary">Create brand</Link>
                </div>
                <div>
                    <BrandsTable brands={brands}/>
                </div>
            </div>
        );
    }
}
 
export default BrandsList;