import React, {useEffect} from 'react';
import BrandsTable from './brandsTable';
import axios from 'axios';
import config from '../config.json';
import {Link} from 'react-router-dom';
import Navbar from './navbar';

import {connect} from 'react-redux';
import {setBrands} from '../store';

const mapDispatch = {setBrands};

function BrandsList ({history, userType, brands, setBrands}) {
    console.log("cosa")

    async function loadData() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            history.push('/login');
        }

        const brands = await axios.get(config.apiUrl + '/brands', {
            headers: {
                'x-access-token': token
            }
        });
        setBrands(brands.data);
    }

    useEffect(() => {
        console.log("cosa2")
        loadData();
    }, []);

    return (
        <div>
            {console.log("render")}
            <Navbar userType={userType}/>
            <div className="contentBrandsList">
                <div className="contentTop">
                    {
                        userType === "admin" ? (
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

const mapStateToProps = (state) => ({
    brands: state.brands
});

 
export default connect(mapStateToProps, mapDispatch)(BrandsList);