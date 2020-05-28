import React, {useEffect, useState} from 'react';
import CarsTable from "./carsTable";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import FilterList from "./filterList";
import Pagination from './common/pagination';
import config from "../config.json";
import Navbar from './navbar';
import Loading from './common/loading';
import {filterCars} from '../selectors/filterCars';

import {connect, useDispatch} from 'react-redux';
import {loadCars} from '../actions/loadCars';
import {deleteCar, setRedirectToLogin, setCarsView} from '../store';

const mapDispatch = {deleteCar, setCarsView, setRedirectToLogin, loadCars};

const CarsList = ({userType, history, allCars, viewCars, setCarsView, deleteCar, brands, brandIds, redirectToLogin, setRedirectToLogin, loadCars}) => {
    const dispatch = useDispatch();

    const [tableHead, setTableHead] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const token = window.sessionStorage.getItem('token');
    if (!token) {
        dispatch(setRedirectToLogin(true));
    }

    const fetchData = () => {
        return () => {
            const tableHead = [
                {
                    "id:": 1,
                    "name": "Model"
                },
                {
                    "id": 2,
                    "name": "Brand"
                },
                {
                    "id": 3,
                    "name": "Creation date"
                },
                {
                    "id": 4,
                    "name": ""
                }
            ]

            setTableHead(tableHead);
        }
    }

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    const handleUpdate = () => {
        dispatch(fetchData());

        const tableHead = [
            {
                "id:": 1,
                "name": "Model"
            },
            {
                "id": 2,
                "name": "Brand"
            },
            {
                "id": 3,
                "name": "Creation date"
            }
        ]
        setTableHead(tableHead);
    }

    const handleFilter = (brand) => {
        setSearchQuery('');
        setCarsView({
            type: "search",
            data: ''
        });
        setCarsView({
            type: "filter",
            data: brand
        });
    }

    const handleDelete = async (id) => {
        deleteCar(id);
        
        const token = window.sessionStorage.getItem('token');
        try {
            const result = await axios.delete(config.apiUrl + "/cars/"+id , {
                headers: {
                    'x-access-token': token
                }
            });
            if (result.data.result === "fail" && result.data.message === "no-token") { 
                window.sessionStorage.removeItem('token');
                history.push('/login');
            }
        } catch (error) {
            loadCars();
        }
    }

    const handleSearch = (e) => {
        var {value} = e.target;
        value = value.toLowerCase();
        setSearchQuery(value);
        setCarsView({
            type: "search",
            data: value
        });
    }

    const handlePageChange = (page) => {
        setCarsView({
            type: "pagechange",
            data: page
        });
    };

    const handleNumItems = (e) => {
        if (e.target.value === 'all') {
            setCarsView({
                type: "pagesize",
                data: allCars.data.length
            });
        }
        else {
            setCarsView({
                type: "pagesize",
                data: e.target.value
            });
        }
    }

    return(
        <div>
            {
                redirectToLogin === false ? (
                    <div>
                        <Navbar userType={userType}/>
                        {
                            brands.isFetching === false ? (
                                allCars.isFetching === false ? (
                                    <div className="carsListContent">
                                        <div className="filter">
                                            <FilterList data={brands.data} ids={brandIds} handleFilter={handleFilter} selectedItem={viewCars.selectedBrand} />
                                        </div>
                                        <div className="listContent">
                                            <div className="topElements">
                                                <div className="buttons">
                                                    {
                                                        userType === "admin" ? (
                                                            <Link to="/carslist/new" className="btn btn-primary btnNew">Create car</Link>
                                                        ) : (
                                                            <React.Fragment/>
                                                        )
                                                    }
                                                    <button className="btn btn-primary" onClick={handleUpdate}>Refresh</button>
                                                </div>
                                                <div className="searchBox">
                                                    <input type="text" className="form-control" id="searchBox" placeholder="Search" value={searchQuery} onChange={handleSearch}/>
                                                </div>
                                            </div>
                                            {
                                                viewCars.data.length !== 0 ? (
                                                    <div className="table">
                                                        <CarsTable ids={viewCars.data} cars={allCars.data} brands={brands.data} tableHead={tableHead}  api="carslist" handleDelete={handleDelete} userType={userType}/>
                                                        <Pagination itemsCount={viewCars.filteredSize} pageSize={parseInt(viewCars.pageSize)} currentPage={parseInt(viewCars.currentPage)} onPageChange={handlePageChange} handleNumItems={handleNumItems} numItems={viewCars.pageSize}/>
                                                    </div>
                                                ) : (
                                                    <div className="titleNoCars">
                                                        <h3>There are no cars available</h3>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <Loading/>
                                )
                            ) : (
                                <Loading/>
                            )
                        }
                    </div>
                ) : (
                    <Redirect to="/login"/>
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    carIds: state.carIds,
    allCars: state.allCars,
    brands: state.brands,
    brandIds: state.brandIds,
    redirectToLogin: state.redirectToLogin,
    viewCars: filterCars(state)
});


export default connect(mapStateToProps, mapDispatch)(CarsList);