import React, {useEffect} from 'react';
import BrandsTable from './brandsTable';
import {Link, useHistory} from 'react-router-dom';
import Navbar from './navbar';

import {connect, useDispatch} from 'react-redux';
import {loadBrands} from '../actions/loadBrands';
import {setRedirectToLogin} from '../store';

const mapDispatch = {loadBrands, setRedirectToLogin};

function BrandsList ({userType, brands, loadBrands, redirectToLogin, setRedirectToLogin}) {
    const dispatch = useDispatch(); 
    const history = useHistory();

    const token = window.sessionStorage.getItem('token');
    if (redirectToLogin === true || !token) {
        dispatch(setRedirectToLogin(false));
        history.push('/login');
    }

    const loadData = () => {
        return () => {
            loadBrands();
        }
    }

    useEffect(() => {
        dispatch(loadData()); 
    }, []);

    return (
        <div>
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
    brands: state.brands,
    redirectToLogin: state.redirectToLogin
});

 
export default connect(mapStateToProps, mapDispatch)(BrandsList);