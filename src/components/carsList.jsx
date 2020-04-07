import React, {Component} from "react";
import CarsTable from "./carsTable";
import {Link} from "react-router-dom";
import axios from "axios";
import FilterList from "./filterList";
import {paginate} from "../utils/pagination";
import Pagination from './common/pagination';
import config from "../config.json";

class CarsList extends Component {
    state = {
        allCars: [],
        cars: [],
        tableHead: [],
        brands: [],
        selectedBrand: "",
        searchQuery: "",
        currentPage: 1,
        pageSize: 8,
        selectedPageSize: 8
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
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

        this.setState({
            allCars: cars.data,
            cars: cars.data,
            tableHead: tableHead,
            brands: brands.data
        });
    }

    handleUpdate = async () => {
        const token = window.sessionStorage.getItem('token');
        const cars = await axios.get(config.apiUrl + "/cars", {
            headers: {
                'x-access-token': token
            }
        });
        if (cars.data.result === "fail" && cars.data.message === "no-token") { 
            window.sessionStorage.removeItem('token');
            this.props.history.push('/login');
        }

        this.setState({
            cars: cars.data,
            allCars: cars.data
        });
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
        this.setState({tableHead: tableHead});
    }

    handleFilter = (brand) => {
        if (brand === "all") {
            this.setState({
                cars: this.state.allCars,
                selectedBrand: ""
            });
        }
        else {
            this.setState({cars: this.state.allCars});
            this.setState({selectedBrand: brand});
            const cars = this.state.allCars;
            let filteredCars = [];
            for (let car of cars) {
                for (let eachBrand of car.brand) {
                    if (eachBrand._id === brand) {
                        filteredCars.push(car);
                    }
                }
            }
            
            this.setState({
                cars: filteredCars,
                currentPage: 1,
                searchQuery: "",
                pageSize: 8
            });
        }
    }

    handleDelete = async (id) => {
        const data = this.state.cars;
        const newData = data.filter(car => car._id !== id);
        this.setState({
            cars: newData,
            allCars: newData
        });

        const token = window.sessionStorage.getItem('token');
        const result = await axios.delete(config.apiUrl + "/cars/"+id , {
            headers: {
                'x-access-token': token
            }
        });
        if (result.data.result === "fail" && result.data.message === "no-token") { 
            window.sessionStorage.removeItem('token');
            this.props.history.push('/login');
        }
    }

    handleSearch = (e) => {
        var {value} = e.target;
        value = value.toLowerCase();
        const filteredCars = this.state.allCars.filter(car => car.model.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        this.setState({
            cars: filteredCars,
            currentPage: 1,
            searchQuery: value
        });
    }

    getPagedData = () => {
        const { pageSize, currentPage, cars } = this.state;
    
        const paginatedCars = paginate(cars, currentPage, pageSize);
    
        return {cars: paginatedCars, totalCount: cars.length};
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleNumItems = (e) => {
        if (e.target.value === 'all') {
            this.setState({pageSize: this.state.cars.length});
        }
        else {
            this.setState({pageSize: e.target.value});
        }
    }


    render() {
        const {tableHead, brands, selectedBrand, currentPage, selectedPageSize, searchQuery, pageSize} = this.state;
        const { totalCount, cars } = this.getPagedData();
        return(
            <div className="carsListContent">
                <div className="filter">
                    <FilterList data={brands} handleFilter={this.handleFilter} selectedItem={selectedBrand}/>
                </div>
                <div className="listContent">
                    <div className="topElements">
                        <div className="buttons">
                            <Link to="carslist/new" className="btn btn-primary">Create car</Link>
                            <button className="btn btn-primary" onClick={this.handleUpdate}>Refresh</button>
                        </div>
                        <div className="searchBox">
                            <input type="text" className="form-control" id="searchBox" placeholder="Search" value={searchQuery} onChange={this.handleSearch}/>
                        </div>
                    </div>
                    {
                        cars.length !== 0 ? (
                            <div className="table">
                                <CarsTable data={cars} tableHead={tableHead} api="carslist" handleDelete={this.handleDelete}/>
                                <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} handleNumItems={this.handleNumItems} numItems={selectedPageSize}/>
                            </div>
                        ) : (
                            <div className="titleNoCars">
                                <h3>There are no cars available</h3>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default CarsList