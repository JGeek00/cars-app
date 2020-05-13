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
            }).then(
                response => response.data,
            ).then((users) => {

                dispatch(setUsers(users))
            });
        }
    } 
}