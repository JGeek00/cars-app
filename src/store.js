import {createSlice} from '@reduxjs/toolkit';
import {createStore, applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';


const carsSlice = createSlice({
    name: 'cars-app',
    initialState: {
        carIds: [],
        allCars: {
            isFetching: true,
            data: {}
        },
        carView: {
            selectedBrand: "all",
            currentPage: "1",
            pageSize: "8",
            searchQuery: ""
        },
        brandIds: [],
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
                        data: action.payload
                    }
                }
            }
        },
        setCarIds: {
            reducer(state, action) {
                return {
                    ...state,
                    carIds: action.payload
                }
            }
        },
        addCar: {
            reducer(state, action) {
                const newObject = {
                    ...state.allCars.data,
                    [action.payload.id]: action.payload.newCar
                }
                return {
                    ...state,
                    allCars: {
                        isFetching: false,
                        data: newObject
                    }
                }
            }
        },
        addCarId: {
            reducer(state, action) {
                var newIds = [...state.carIds];
                newIds.push(action.payload)
                newIds.sort((o1, o2) => {
                    const car1name = state.allCars.data[o1].model;
                    const car2name = state.allCars.data[o2].model;
                    if (car1name < car2name) {
                        return -1;
                    }
                    if (car1name > car2name) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    carIds: newIds
                }
            }
        },
        updateCar: {
            reducer(state, action) {
                var newObject = {
                    _id: action.payload.id,
                    model: action.payload.updatedCar.model,
                    brand_id: action.payload.updatedCar.brand,
                    creationDate: action.payload.updatedCar.creationDate
                };
                const updatedObject = {
                    ...state.allCars.data,
                    [action.payload.id]: newObject,
                }
                
                return {
                    ...state,
                    allCars: {
                        isFetching: false,
                        data: updatedObject
                    }
                }
            }
        },
        sortCars: {
            reducer(state, action) {
                var ids = [...state.carIds];
                ids.sort((o1, o2) => {
                    const car1name = state.allCars.data[o1].model;
                    const car2name = state.allCars.data[o2].model;
                    if (car1name < car2name) {
                        return -1;
                    }
                    if (car1name > car2name) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    carIds: ids
                }
            }
        },
        setCarsView: {
            reducer(state, action) {
                switch (action.payload.type) {
                    case "filter":
                        if (action.payload.data === "all" || action.payload.data === "") {
                            return {
                                ...state,
                                carView: {
                                    ...state.carView,
                                    selectedBrand: "all",
                                    currentPage: '1'
                                }
                            }
                        }
                        else {
                            return {
                                ...state,
                                carView: {
                                    ...state.carView,
                                    selectedBrand: action.payload.data,
                                    currentPage: '1'
                                }
                            }
                        }

                    case "search":
                        return {
                            ...state,
                            carView: {
                                ...state.carView,
                                searchQuery: action.payload.data,
                                currentPage: '1'
                            }
                        }

                    case "pagechange":
                        return {
                            ...state,
                            carView: {
                                ...state.carView,
                                currentPage: action.payload.data
                            }
                        }

                    case "pagesize":
                        return {
                            ...state,
                            carView: {
                                ...state.carView,
                                pageSize: action.payload.data,
                                currentPage: '1'
                            }
                        }
                }
            }
        },
        deleteCar: {
            reducer(state, action) {
                var newIds = [...state.carIds];
                const index = newIds.indexOf(action.payload);
                newIds.splice(index, 1);
                
                var carsObject = {...state.allCars.data};
                delete carsObject[action.payload]
                
                return {
                    ...state,
                    carIds: newIds,
                    allCars: {
                        isFetching: false,
                        data: carsObject
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
        setBrandIds: {
            reducer(state, action) {
                return {
                    ...state,
                    brandIds: action.payload
                }
            }
        },
        addBrand: {
            reducer(state, action) {
                const newObject = {
                    ...state.brands.data,
                    [action.payload.id]: action.payload.newBrand
                }
                return {
                    ...state,
                    brands: {
                        isFetching: false,
                        data: newObject
                    }
                }
            }
        },
        addBrandId: {
            reducer(state, action) {
                var newIds = [...state.brandIds];
                newIds.push(action.payload);
                newIds.sort((o1, o2) => {
                    const e1 = state.brands.data[o1].name;
                    const e2 = state.brands.data[o2].name;
                    if (e1 < e2) {
                        return -1;
                    }
                    if (e1 > e2) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    brandIds: newIds
                }
            }
        },
        editBrand: {
            reducer(state, action) {
                const newObject = {
                    ...state.brands.data,
                    [action.payload.id]: action.payload.updatedBrand
                }
                return {
                    ...state,
                    brands: {
                        isFetching: false,
                        data: newObject
                    }
                }
            }
        },
        sortBrands: {
            reducer(state, action) {
                var ids = [...state.brandIds];
                ids.sort((o1, o2) => {
                    const e1 = state.brands.data[o1].name;
                    const e2 = state.brands.data[o2].name;
                    if (e1 < e2) {
                        return -1;
                    }
                    if (e1 > e2) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    brandIds: ids
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

export const {setUser, setAllCars, setCarIds, updateCar, addCar, addCarId, sortCars, deleteCar, setCarsView, setBrands, setBrandIds, addBrand, addBrandId, editBrand, sortBrands, setUsers, setRedirectToLogin} = carsSlice.actions;

const middlewareEnhancer = applyMiddleware(thunkMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(carsSlice.reducer, undefined, composeEnhancers(
    middlewareEnhancer
)); 