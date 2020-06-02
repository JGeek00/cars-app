import {carsReducer, setUser} from '../src/store';

const initialState = {
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
    user: {
        
    },
    users: {
        isFetching: true,
        data: []
    },
    redirectToLogin: false
}

describe('cars-app slice', () => {
    describe('reducer, actions and selectors', () => {
        it('should return the initial state on first run', () => {
            const nextState = initialState;
    
            const result = carsReducer(undefined, {});
    
            expect(result).toEqual(nextState);
        });
  
    //   it('should properly set loading and error state when a sign in request is made', () => {
    //     // Arrange
  
    //     // Act
    //     const nextState = reducer(initialState, reducer());
  
    //     // Assert
    //     const rootState = { auth: nextState };
    //     expect(selectIsAuthenticated(rootState)).toEqual(false);
    //     expect(selectIsLoading(rootState)).toEqual(true);
    //     expect(selectError(rootState)).toEqual(null);
    //   });
  
    //   it('should properly set loading, error and user information when a sign in request succeeds', () => {
    //     // Arrange
    //     const payload = { token: 'this is a token', userName: 'John Doe' };
  
    //     // Act
    //     const nextState = reducer(initialState, signInSuccess(payload));
  
    //     // Assert
    //     const rootState = { auth: nextState };
    //     expect(selectIsAuthenticated(rootState)).toEqual(true);
    //     expect(selectToken(rootState)).toEqual(payload.token);
    //     expect(selectUserName(rootState)).toEqual(payload.userName);
    //     expect(selectIsLoading(rootState)).toEqual(false);
    //     expect(selectError(rootState)).toEqual(null);
    //   });
  
    //   it('should properly set loading, error and remove user information when sign in request fails', () => {
    //     // Arrange
    //     const error = new Error('Incorrect password');
  
    //     // Act
    //     const nextState = reducer(initialState, signInFailure({ error: error.message }));
  
    //     // Assert
    //     const rootState = { auth: nextState };
    //     expect(selectIsAuthenticated(rootState)).toEqual(false);
    //     expect(selectToken(rootState)).toEqual('');
    //     expect(selectUserName(rootState)).toEqual('');
    //     expect(selectIsLoading(rootState)).toEqual(false);
    //     expect(selectError(rootState)).toEqual(error.message);
    //   });
    });
});