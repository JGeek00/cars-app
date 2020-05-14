import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange, handleNumItems}) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
	const pages = _.range(1, pagesCount + 1);
	
	var style = {};
	if (itemsCount === 0) {
		style = {
			display: 'none'
		}
	}
	else {
		style = {
			display: 'flex'
		}
	}

    return (
        <nav className="navPagination">
            <ul className="pagination">
				{pages.map(page => (
					<li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
						<button className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</button>
					</li>
				))}
          	</ul>
        	<select className="custom-select" onChange={handleNumItems} style={style} value={pageSize}>
				<option value="4">4</option>
				<option value="8">8</option>
				<option value="16">16</option>
				<option value="32">32</option>
				<option value="all">All</option>
         	</select>
        </nav>
        
    );
};

Pagination.propTypes = {
  	itemsCount: PropTypes.number.isRequired,
  	pageSize: PropTypes.number.isRequired,
  	currentPage: PropTypes.number.isRequired,
  	onPageChange: PropTypes.func.isRequired
};

export default Pagination;
