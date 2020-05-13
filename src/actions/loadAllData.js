import axios from 'axios';
import {setUser, setRedirectToLogin} from '../store';
import config from '../config.json';

import {loadCars} from './loadCars';
import {loadBrands} from './loadBrands';
import {loadUsers} from './loadUsers';

export function loadAllData() {
    return dispatch => {
        const token = window.sessionStorage.getItem('token');
        if (token) {
            axios.get(config.apiUrl + '/profile', {
                headers: {
                    'x-access-token': token
                }
            }).then((user) =>  {
                if (user.data.result === "fail" && user.data.message === "no-token") {
                    window.sessionStorage.removeItem('token');
                    setRedirectToLogin(true);
                }
                else {
                    dispatch(setUser(user.data));
                    dispatch(loadCars());
                    dispatch(loadBrands());
                    dispatch(loadUsers());
                }
            })
        }
    }
}