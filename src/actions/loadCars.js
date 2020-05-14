import axios from 'axios';
import {setAllCars, setCarIds} from '../store';
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
            const idsArray = new Array();
            const convertArrayToObject = (array) => {
                const initialValue = {};
                return array.reduce((obj, item) => {
                    const key = item._id;
                    idsArray.push(key);
                    var newItem = {
                        _id: item._id,
                        model: item.model,
                        brand_id: item.brand[0]._id,
                        creationDate: item.creationDate
                    }
                    return {
                        ...obj,
                        [key]: newItem,
                    };
                }, initialValue);
            };
            const newObject = convertArrayToObject(cars);
            dispatch(setCarIds(idsArray));
            dispatch(setAllCars(newObject));
        });
    }
}