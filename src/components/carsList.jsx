import React, {Component} from "react";
import Table from "./table";
import {Link} from "react-router-dom";
import axios from "axios";
import FilterList from "./filterList";
import {paginate} from "../utils/pagination";
import Pagination from './common/pagination';

class CarsList extends Component {
    state = {
        allCars: [],
        cars: [],
        tableHead: [],
        brands: [],
        selectedBrand: "",
        searchQuery: "",
        currentPage: 1,
        pageSize: 8
    }

    async componentDidMount() {
        const cars = await axios.get('http://localhost:4000/api/cars');

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

        const brands = await axios.get('http://localhost:4000/api/brands');

        this.setState({
            allCars: cars.data,
            cars: cars.data,
            tableHead: tableHead,
            brands: brands.data
        });
    }

    handleUpdate = async () => {
        const cars = await axios.get('http://localhost:4000/api/cars');
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
            let filteredCars = new Array();
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
                searchQuery: ""
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
        await axios.delete('http://localhost:4000/api/cars/'+id);
    }

    handleSearch = (e) => {
        var {value} = e.target;
        value = value.toLowerCase();
        const filteredCars = this.state.allCars.filter(car => car.model.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        this.setState({
            cars: filteredCars,
            currentPage: 1
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
        const {tableHead, brands, selectedBrand, currentPage, pageSize} = this.state;
        const { totalCount, cars } = this.getPagedData();
        return(
            <div className="carsListContent">
                <div className="filter">
                    <FilterList data={brands} handleFilter={this.handleFilter} selectedBrand={selectedBrand}/>
                </div>
                <div className="table">
                    <div className="buttons">
                        <Link to="carslist/new" className="btn btn-primary">Add</Link>
                        <button className="btn btn-primary" onClick={this.handleUpdate}>Refresh</button>
                    </div>
                    <div className="searchBox">
                        <input type="text" className="form-control" id="searchBox" placeholder="Search" onChange={this.handleSearch}/>
                    </div>
                    <Table data={cars} tableHead={tableHead} handleDelete={this.handleDelete}/>
                    <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} handleNumItems={this.handleNumItems}/>
                </div>
            </div>
        )
    }
}

export default CarsList