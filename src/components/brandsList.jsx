import React, {useEffect} from 'react';
import BrandsTable from './brandsTable';
import {Link} from 'react-router-dom';
import Navbar from './navbar';

import {connect, useDispatch} from 'react-redux';
import {loadBrands} from '../actions/loadBrands';

const mapDispatch = {loadBrands};

function BrandsList ({history, userType, brands, loadBrands}) {
    const dispatch = useDispatch(); 

    const loadData = () => {
        return () => {
            const token = window.sessionStorage.getItem('token');
            if (!token) {
                history.push('/login');
            }
    
            loadBrands(token);
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