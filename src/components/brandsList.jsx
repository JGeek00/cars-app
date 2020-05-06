import React, {useState, useEffect} from 'react';
import BrandsTable from './brandsTable';
import {Link, Redirect} from 'react-router-dom';
import Navbar from './navbar';
import Loading from './common/loading';

import {connect, useDispatch} from 'react-redux';
import {loadBrands} from '../actions/loadBrands';
import {setRedirectToLogin} from '../store';

const mapDispatch = {loadBrands, setRedirectToLogin};

function BrandsList ({userType, brands, loadBrands, redirectToLogin, setRedirectToLogin}) {
    const dispatch = useDispatch(); 

    const [loading, setLoading] = useState(true);

    const token = window.sessionStorage.getItem('token');
    if (!token) {
        dispatch(setRedirectToLogin(true));
    }

    const loadData = () => {
        return () => {
            setLoading(false);
        }
    }

    useEffect(() => {
        dispatch(loadData()); 
    }, []);

    return (
        <div>
            {
                redirectToLogin === false ? (
                    <div>
                        <Navbar userType={userType}/>
                        {
                            loading === false ? (
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
    redirectToLogin: state.redirectToLogin
});

 
export default connect(mapStateToProps, mapDispatch)(BrandsList);