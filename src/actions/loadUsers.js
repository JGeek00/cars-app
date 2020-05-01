import axios from 'axios';
import {setUsers} from '../store';
import config from '../config.json';

export function loadUsers(token, history) {
    return dispatch => {
        axios.get(config.apiUrl + "/users", {
            headers: {
                'x-access-token': token
            }
        }).then((users) => {
            if (users.data.result === "fail" && users.data.message === "no-token") {
                window.sessionStorage.removeItem('token');
                history.push('/login');
            }
            dispatch(setUsers(users.data));
        });
    } 
}