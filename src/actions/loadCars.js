import axios from 'axios';
import {setCars, setAllCars, setBrands} from '../store';
import config from '../config.json';

export function loadCars (token) {
    return dispatch => {
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