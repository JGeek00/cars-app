import React from "react";

function FilterList (props) {
    const {data, ids, handleFilter, selectedItem} = props;
    return(
        <ul className="list-group filter-list">
            <li className={selectedItem === "all" ? "list-group-item active" : "list-group-item li-inactive"} key="0" onClick={() => handleFilter("all")}>All brands</li>
            {
                ids.map(id => (
                    <li className={id === selectedItem ? "list-group-item active" : "list-group-item li-inactive"} key={data[id]._id} onClick={() => handleFilter(data[id]._id)}>{data[id].name}</li>
                ))
            }
        </ul>
    )
}

export default FilterList