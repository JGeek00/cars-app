import axios from 'axios';
import {setUsers, setRedirectToLogin} from '../store';
import config from '../config.json';

export function loadUsers(history) {
    return dispatch => {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            dispatch(setRedirectToLogin(true));
        }
        else {
            axios.get(config.apiUrl + "/users", {
                headers: {
                    'x-access-token': token
                }
            }).then((users) => {
                if (users.data.result === "fail" && users.data.message === "no-token") {
                    window.sessionStorage.removeItem('token');
                    dispatch(setRedirectToLogin(true));
                }
                dispatch(setUsers(users.data));
            });
        }
    } 
}