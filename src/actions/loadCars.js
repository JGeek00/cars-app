import axios from 'axios';
import {setAllCars, setCars} from '../store';
import config from '../config.json';

export function loadCars () {
    return (dispatch) => {
        const token = window.sessionStorage.getItem('token');
        return axios.get(config.apiUrl + "/cars", { 
            headers: {
                'x-access-token': token
            }
        }).then(
            response => response.data,
        ).then((cars) => {
            dispatch(setAllCars(cars));
        });
    }
}