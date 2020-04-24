import {configureStore, createSlice} from '@reduxjs/toolkit';


const carsSlice = createSlice({
    name: 'cars-app',
    initialState: {
        cars: [],
        allCars: [],
        brands: []
    },
    reducers: {
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
                    cars: action.payload
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
        }
    }
})

export const {setCars, setAllCars, setBrands} = carsSlice.actions;

export default configureStore({
    reducer: carsSlice.reducer
});