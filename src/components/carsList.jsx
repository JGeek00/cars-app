import React, {useEffect, useState} from 'react';
import CarsTable from "./carsTable";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import FilterList from "./filterList";
import {paginate} from "../utils/pagination";
import Pagination from './common/pagination';
import config from "../config.json";
import Navbar from './navbar';
import Loading from './common/loading';

import {connect, useDispatch} from 'react-redux';
import {setAllCars, deleteCar, setRedirectToLogin} from '../store';

const mapDispatch = {setAllCars, deleteCar, setRedirectToLogin};

const CarsList = ({userType, history, allCars, carIds, setAllCars, deleteCar, brands, brandIds, redirectToLogin, setRedirectToLogin}) => {
    const dispatch = useDispatch();
    
    const [displayCars, setDisplayCars] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const {data, isFetching} = allCars;

    useEffect(() => {
        setDisplayCars(carIds)
    }, [carIds]);

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
        if (brand === "all") {
            setDisplayCars(carIds);
            setSelectedBrand("");
        }
        else {
            setDisplayCars(carIds);
            setSelectedBrand(brand);

            let filteredCarsIds = [];
            for (let id of carIds) {
                if (data[id].brand_id === brand) {
                    filteredCarsIds.push(id);
                }
            }
            setDisplayCars(filteredCarsIds);
        }
        setCurrentPage(1);
        setSearchQuery("");
    }

    const handleDelete = async (id) => {
        const oldData = data;
        const newData = data.filter(car => car._id !== id);

        setDisplayCars(newData);
        deleteCar(newData);

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
            setDisplayCars(oldData);
            deleteCar(oldData);
        }
    }

    const handleSearch = (e) => {
        var {value} = e.target;
        value = value.toLowerCase();
        const filteredCars = data.filter(car => car.model.toLowerCase().indexOf(value.toLowerCase()) !== -1);

        setDisplayCars(filteredCars);
        setCurrentPage(1);
        setSearchQuery(value);
    }

    const getPagedData = () => {
        const paginatedCars = paginate(displayCars, currentPage, pageSize);
        return {pageCars: paginatedCars, totalCount: displayCars.length};
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNumItems = (e) => {
        if (e.target.value === 'all') {
            setPageSize(allCars.data.length);
        }
        else {
            setPageSize(parseInt(e.target.value));
        }
    }

    const { totalCount, pageCars } = getPagedData();
    
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
                                            <FilterList data={brands.data} ids={brandIds} handleFilter={handleFilter} selectedItem={selectedBrand} />
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
                                                pageCars.length !== 0 ? (
                                                    <div className="table">
                                                        <CarsTable ids={pageCars} cars={allCars.data} brands={brands.data} tableHead={tableHead}  api="carslist" handleDelete={handleDelete} userType={userType}/>
                                                        <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} handleNumItems={handleNumItems} numItems={pageSize}/>
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
    redirectToLogin: state.redirectToLogin
});


export default connect(mapStateToProps, mapDispatch)(CarsList);