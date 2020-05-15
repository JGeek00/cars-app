import React, {useState, useEffect} from 'react';
import BrandsTable from './brandsTable';
import {Link, Redirect} from 'react-router-dom';
import Navbar from './navbar';
import Loading from './common/loading';

import {connect, useDispatch} from 'react-redux';
import {setRedirectToLogin} from '../store';

const mapDispatch = {setRedirectToLogin};

function BrandsList ({userType, brands, brandIds, redirectToLogin, setRedirectToLogin}) {
    const dispatch = useDispatch();

    const token = window.sessionStorage.getItem('token');
    if (!token) {
        dispatch(setRedirectToLogin(true));
    }
    
    return (
        <div>
            {
                redirectToLogin === false ? (
                    <div>
                        <Navbar userType={userType}/>
                        {
                            brands.isFetching === false ? (
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
                                        <BrandsTable brands={brands.data} ids={brandIds}/>
                                    </div>
                                </div>
                            ) : (
                                <div className="loading">
                                    <Loading/>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <Redirect to="/login"/>
                )
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    brands: state.brands,
    brandIds: state.brandIds,
    redirectToLogin: state.redirectToLogin
});

 
export default connect(mapStateToProps, mapDispatch)(BrandsList);