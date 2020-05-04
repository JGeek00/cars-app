import axios from 'axios';
import {setBrands, setRedirectToLogin} from '../store';
import config from '../config.json';

export function loadBrands(token) {
    return dispatch => {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            dispatch(setRedirectToLogin(true));
        }
        else {
            axios.get(config.apiUrl + '/brands', {
                headers: {
                    'x-access-token': token
                }
            }).then(brands => {
                dispatch(setBrands(brands.data));
            });
        }        
    }    
} 