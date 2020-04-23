import React from "react";

function FilterList (props) {
    const {data, handleFilter, selectedItem} = props;
    return(
        <ul className="list-group filter-list">
            <li className={selectedItem === "" ? "list-group-item active" : "list-group-item li-inactive"} key="0" onClick={() => handleFilter("all")}>All brands</li>
            {
                data.map(brand => (
                    <li className={brand._id === selectedItem ? "list-group-item active" : "list-group-item li-inactive"} key={brand._id} onClick={() => handleFilter(brand._id)}>{brand.name}</li>
                ))
            }
        </ul>
    )
}

export default FilterList