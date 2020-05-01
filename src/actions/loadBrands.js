import axios from 'axios';
import {setBrands} from '../store';
import config from '../config.json';

export function loadBrands(token) {
    return dispatch => {
        axios.get(config.apiUrl + '/brands', {
            headers: {
                'x-access-token': token
            }
        }).then(brands => {
            dispatch(setBrands(brands.data));
        });
    }    
} 