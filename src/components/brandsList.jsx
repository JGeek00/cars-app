import React, {useEffect} from 'react';
import BrandsTable from './brandsTable';
import axios from 'axios';
import config from '../config.json';
import {Link} from 'react-router-dom';
import Navbar from './navbar';

import {connect, useDispatch} from 'react-redux';
import {setBrands} from '../store';

const mapDispatch = {setBrands};

function BrandsList ({history, userType, brands, setBrands}) {
    const dispatch = useDispatch(); 

    const loadData = () => {
        return dispatch => {
            const token = window.sessionStorage.getItem('token');
            if (!token) {
                history.push('/login');
            }
    
            axios.get(config.apiUrl + '/brands', {
                headers: {
                    'x-access-token': token
                }
            }).then(brands => {
                dispatch(setBrands(brands.data));
            });
        }
    }

    useEffect(() => {
        dispatch(loadData()); 
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