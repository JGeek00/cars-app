import {createSlice} from '@reduxjs/toolkit';
import {createStore, applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk'


const carsSlice = createSlice({
    name: 'cars-app',
    initialState: {
        allCars: {
            isFetching: true,
            data: []
        },
        brands: {
            isFetching: true,
            data: []
        },
        user: {},
        users: {
            isFetching: true,
            data: []
        },
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
        setAllCars: {
            reducer(state, action) {
                return {
                    ...state,
                    allCars: {
                        isFetching: false,
                        data: action.payload.map(car => {
                            const newCar = {
                                _id: car._id,
                                model: car.model,
                                brand_id: car.brand[0]._id,
                                creationDate: car.creationDate
                            }
                            return newCar;
                        })
                    }
                }
            }
        },
        updateCars: {
            reducer(state, action) {
                return {
                    ...state,
                    allCars: {
                        isFetching: false,
                        data: action.payload.map(car => {
                            const newCar = {
                                _id: car._id,
                                model: car.model,
                                brand_id: car.brand_id,
                                creationDate: car.creationDate
                            }
                            return newCar;
                        })
                    }
                }
            }
        },
        setBrands: {
            reducer(state, action) {
                return {
                    ...state,
                    brands: {
                        isFetching: false,
                        data: action.payload
                    }
                }
            }
        },
        setUsers: {
            reducer(state, action) {
                return {
                    ...state,
                    users: {
                        isFetching: false,
                        data: action.payload
                    }
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

export const {setUser, setAllCars, updateCars, setBrands, setUsers, setRedirectToLogin} = carsSlice.actions;

const middlewareEnhancer = applyMiddleware(thunkMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(carsSlice.reducer, undefined, composeEnhancers(
    middlewareEnhancer
)); 