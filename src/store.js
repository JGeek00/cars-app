import {createSlice} from '@reduxjs/toolkit';
import {createStore, applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk'


const carsSlice = createSlice({
    name: 'cars-app',
    initialState: {
        cars: [],
        allCars: [],
        brands: [],
        user: {},
        users: [],
        redirectToLogin: false
    },
    reducers: {
        setUser: {
            reducer(state, action) {
                return {
                    ...state,
                    user: action.payload
                }
            }
        },
        setCars: {
            reducer(state, action) {
                return {
                    ...state,
                    cars: action.payload
                }
            }
        },
        setAllCars: {
            reducer(state, action) {
                return {
                    ...state,
                    allCars: action.payload
                }
            }
        },
        setBrands: {
            reducer(state, action) {
                return {
                    ...state,
                    brands: action.payload
                }
            }
        },
        setUsers: {
            reducer(state, action) {
                return {
                    ...state,
                    users: action.payload
                }
            }
        },
        setRedirectToLogin: {
            reducer(state, action) {
                return {
                    ...state,
                    redirectToLogin: action.payload
                }
            }
        }
    }
})

export const {setUser, setCars, setAllCars, setBrands, setUsers, setRedirectToLogin} = carsSlice.actions;

const middlewareEnhancer = applyMiddleware(thunkMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(carsSlice.reducer, undefined, composeEnhancers(
    middlewareEnhancer
)); 