import axios from 'axios';
import config from '../config.json';
import {setUser, setRedirectToLogin} from '../store';

export function loadUser() {
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
                
                dispatch(setUser(user.data));
            })
        }
    }
}