import {createSelector} from 'reselect';
import _ from "lodash";

const getSearchQuery = state => state.carView.searchQuery;
const getSelectedBrand = state => state.carView.selectedBrand;
const getCurrentPage = state => state.carView.currentPage;
const getPageSize = state => state.carView.pageSize;
const getAllCars = state => state.allCars.data;
const getCarIds = state => state.carIds;

            
export const filterCars = createSelector(
    [getSearchQuery, getSelectedBrand, getCurrentPage, getPageSize, getAllCars, getCarIds],
    (searchQuery, selectedBrand, currentPage, pageSize, allCars, carIds) => {
        const filteredCars = filterBrands(selectedBrand, allCars, carIds);
        const searchedCars = searchCars(searchQuery, allCars, filteredCars);
        const paginatedCars = paginateCars(pageSize, currentPage, searchedCars);
        return {
            data: paginatedCars, 
            currentPage: currentPage,
            pageSize: pageSize, 
            filteredSize: searchedCars.length,
            selectedBrand: selectedBrand
        };
    }
);

const filterBrands = (selectedBrand, allCars, carIds) => {
    if (selectedBrand === "all") {
        return carIds;
    }
    else {
        return carIds.filter(id => allCars[id].brand_id === selectedBrand);
    }
}

const searchCars = (searchQuery, allCars, carIds) => {
    if (searchQuery !== '') {
        return carIds.filter(id => allCars[id].model.toLowerCase().indexOf(searchQuery) !== -1);
    }
    else {
        return carIds;
    }
}

const paginateCars = (pageSize, currentPage, carIds) => {
    const startIndex = (currentPage - 1) * pageSize;
    return _(carIds).slice(startIndex).take(pageSize).value();
}