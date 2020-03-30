import React, {Component} from "react";
import axios from "axios";

class FilterList extends Component {

    render() {
        const {data, handleFilter, selectedBrand} = this.props;
        return(
            <ul className="list-group">
                <li className={selectedBrand === "" ? "list-group-item active" : "list-group-item"} key="0" onClick={() => handleFilter("all")}>All brands</li>
                {
                    data.map(brand => (
                        <li className={brand._id === selectedBrand ? "list-group-item active" : "list-group-item"} key={brand._id} onClick={() => handleFilter(brand._id)}>{brand.name}</li>
                    ))
                }
            </ul>
        )
    }
}

export default FilterList