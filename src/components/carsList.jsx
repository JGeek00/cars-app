import React, {useEffect, useState} from 'react';
import CarsTable from "./carsTable";
import {Link} from "react-router-dom";
import axios from "axios";
import FilterList from "./filterList";
import {paginate} from "../utils/pagination";
import Pagination from './common/pagination';
import config from "../config.json";
import Navbar from './navbar';

function CarsList(props) {
    const [allCars, setAllCars] = useState([]);
    const [cars, setCars] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    useEffect(() => {
        loadData();
        async function loadData() {
            const token = window.sessionStorage.getItem('token');
            if (!token) {
                props.history.push('/login');
            }
    
            const cars = await axios.get(config.apiUrl + "/cars", {
                headers: {
                    'x-access-token': token
                }
            });
    
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
                    "name": ""
                }
            ]
    
            const brands = await axios.get(config.apiUrl + "/brands", {
                headers: {
                    'x-access-token': token
                }
            });

            setAllCars(cars.data);
            setCars(cars.data);
            setTableHead(tableHead);
            setBrands(brands.data);
        }
    }, [props]);

    const handleUpdate = async () => {
        const token = window.sessionStorage.getItem('token');
        const cars = await axios.get(config.apiUrl + "/cars", {
            headers: {
                'x-access-token': token
            }
        });
        if (cars.data.result === "fail" && cars.data.message === "no-token") { 
            window.sessionStorage.removeItem('token');
            props.history.push('/login');
        }

        setCars(cars.data);
        setAllCars(cars.data);

        const tableHead = [
            {
                "id:": 1,
                "name": "Model"
            },
            {
                "id": 2,
                "name": "Brand"
            }
        ]
        setTableHead(tableHead);
    }

    const handleFilter = (brand) => {
        if (brand === "all") {
            setCars(allCars);
            setSelectedBrand("");
        }
        else {
            setCars(allCars);
            setSelectedBrand(brand);

            const cars = allCars;
            let filteredCars = [];
            for (let car of cars) {
                for (let eachBrand of car.brand) {
                    if (eachBrand._id === brand) {
                        filteredCars.push(car);
                    }
                }
            }
            
            setCars(filteredCars);
            setCurrentPage(1);
            setSearchQuery("");
            setPageSize(8);
        }
    }

    const handleDelete = async (id) => {
        const data = cars;
        const newData = data.filter(car => car._id !== id);

        setCars(newData);
        setAllCars(newData);

        const token = window.sessionStorage.getItem('token');
        const result = await axios.delete(config.apiUrl + "/cars/"+id , {
            headers: {
                'x-access-token': token
            }
        });
        if (result.data.result === "fail" && result.data.message === "no-token") { 
            window.sessionStorage.removeItem('token');
            props.history.push('/login');
        }
    }

    const handleSearch = (e) => {
        var {value} = e.target;
        value = value.toLowerCase();
        const filteredCars = allCars.filter(car => car.model.toLowerCase().indexOf(value.toLowerCase()) !== -1);

        setCars(filteredCars);
        setCurrentPage(1);
        setSearchQuery(value);
    }

    const getPagedData = () => {
        const paginatedCars = paginate(cars, currentPage, pageSize);
        return {pageCars: paginatedCars, totalCount: cars.length};
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNumItems = (e) => {
        if (e.target.value === 'all') {
            setPageSize(cars.length);
        }
        else {
            setPageSize(e.target.value);
        }
    }

    const { totalCount, pageCars } = getPagedData();
    
    return(
        <div>
            <Navbar userType={props.userType}/>
            <div className="carsListContent">
                <div className="filter">
                    <FilterList data={brands} handleFilter={handleFilter} selectedItem={selectedBrand}/>
                </div>
                <div className="listContent">
                    <div className="topElements">
                        <div className="buttons">
                            {
                                props.userType === "admin" ? (
                                    <Link to="carslist/new" className="btn btn-primary btnNew">Create car</Link>
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
                                <CarsTable data={pageCars} tableHead={tableHead} api="carslist" handleDelete={handleDelete} userType={props.userType}/>
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
        </div>
    )
}

export default CarsList