import axios from 'axios';
import {setBrands, setBrandIds, setRedirectToLogin} from '../store';
import config from '../config.json';

export function loadBrands() {
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
            }).then(
                response => response.data,
            ).then((brands) => {
                var brandIds = [];
                const convertArrayToObject = (brands) => {
                    const initialValue = {};
                    return brands.reduce((obj, item) => {
                        const key = item._id;
                        brandIds.push(key);
                        var newItem = {
                            _id: item._id,
                            name: item.name
                        }
                        return {
                            ...obj,
                            [key]: newItem,
                        };
                    }, initialValue);
                };
                const newObject = convertArrayToObject(brands);
                dispatch(setBrands(newObject));
                dispatch(setBrandIds(brandIds));
            });
        }        
    }    
} 