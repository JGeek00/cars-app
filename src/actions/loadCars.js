import axios from 'axios';
import {setCars, setAllCars, setBrands, setRedirectToLogin} from '../store';
import config from '../config.json';

export function loadCars () {
    return dispatch => {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            dispatch(setRedirectToLogin(true));
        }
        else {
            axios.get(config.apiUrl + "/cars", {
                headers: {
                    'x-access-token': token
                }
            }).then((carsList) => {
                dispatch(setAllCars(carsList.data));
                dispatch(setCars(carsList.data));
    
                axios.get(config.apiUrl + "/brands", {
                    headers: {
                        'x-access-token': token
                    }
                }).then((brands) => {
                    dispatch(setBrands(brands.data));
                })
            });
        } 
    }
}