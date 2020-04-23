import React, {useEffect, useState} from 'react';
import BrandsTable from './brandsTable';
import axios from 'axios';
import config from '../config.json';
import {Link} from 'react-router-dom';
import Navbar from './navbar';

function BrandsList (props) {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        loadData();
        async function loadData() {
            const token = window.sessionStorage.getItem('token');
            if (!token) {
                this.props.history.push('/login');
            }
    
            const brands = await axios.get(config.apiUrl + '/brands', {
                headers: {
                    'x-access-token': token
                }
            });
            setBrands(brands.data);
        }
    }, [props]);

    return (
        <div>
            <Navbar userType={props.userType}/>
            <div className="contentBrandsList">
                <div className="contentTop">
                    {
                        props.userType === "admin" ? (
                            <Link to="brands/new" className="btn btn-primary">Create brand</Link>
                        ) : (
                            <React.Fragment/>
                        )
                    }
                </div>
                <div>
                    <BrandsTable brands={brands}/>
                </div>
            </div>
        </div>
    );
}
 
export default BrandsList;