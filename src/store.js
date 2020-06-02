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
        setUser(state, action) {
            state.user = action.payload
        },
        setAllCars(state, action) {
            state.allCars = {
                isFetching: false,
                data: action.payload
            }
        },
        setCarIds(state, action) {
            state.carIds = action.payload
        },
        addCar(state, action) {
            const newObject = {
                ...state.allCars.data,
                [action.payload.id]: action.payload.newCar
            };
            state.allCars = {
                isFetching: false,
                data: newObject
            };
        },
        addCarId(state, action) {
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
            state.carIds = newIds
        },
        updateCar(state, action) {
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
            
            state.allCars = {
                isFetching: false,
                data: updatedObject
            }
        },
        sortCars(state, action) {
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
            state.carIds = ids
        },
        setCarsView(state, action) {
            switch (action.payload.type) {
                case "filter":
                    if (action.payload.data === "all" || action.payload.data === "") {
                        state.carView.selectedBrand = 'all';
                        state.carView.currentPage = '1';
                        break;
                    }
                    else {
                        state.carView.selectedBrand = action.payload.data;
                        state.carView.currentPage = '1';
                        break;
                    }

                case "search":
                    state.carView.searchQuery = action.payload.data;
                    state.carView.currentPage = '1';
                    break;

                case "pagechange":
                    state.carView.currentPage = action.payload.data;
                    break;

                case "pagesize":
                    state.carView.pageSize = action.payload.data;
                    state.carView.currentPage = '1';
                    break;
                    
            }
        },
        deleteCar(state, action) {
            var newIds = [...state.carIds];
            const index = newIds.indexOf(action.payload);
            newIds.splice(index, 1);
            
            var carsObject = {...state.allCars.data};
            delete carsObject[action.payload]
            
            state.carIds = newIds;
            state.allCars = {
                isFetching: false,
                data: carsObject
            };
        },
        setBrands(state, action) {
            state.brands = {
                isFetching: false,
                data: action.payload
            }
        },
        setBrandIds(state, action) {
            state.brandIds = action.payload
        },
        addBrand(state, action) {
            const newObject = {
                ...state.brands.data,
                [action.payload.id]: action.payload.newBrand
            }
            state.brands = {
                isFetching: false,
                data: newObject
            }
        },
        addBrandId(state, action) {
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

            state.brandIds = newIds
        },
        editBrand(state, action) {
            const newObject = {
                ...state.brands.data,
                [action.payload.id]: action.payload.updatedBrand
            }
            state.brands = {
                isFetching: false,
                data: newObject
            }
        },
        sortBrands(state, action) {
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
            state.brandIds = ids
        },
        setUsers(state, action) {
            state.users = {
                isFetching: false,
                data: action.payload
            }
        },
        setRedirectToLogin(state, action) {
            state.sedirectToLogin = action.payload
        }
    }
})

export const {setUser, setAllCars, setCarIds, updateCar, addCar, addCarId, sortCars, deleteCar, setCarsView, setBrands, setBrandIds, addBrand, addBrandId, editBrand, sortBrands, setUsers, setRedirectToLogin} = carsSlice.actions;

const middlewareEnhancer = applyMiddleware(thunkMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const carsReducer = carsSlice.reducer;

export default createStore(carsSlice.reducer, undefined, composeEnhancers(
    middlewareEnhancer
)); 