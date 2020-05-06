import React, {useState, useEffect} from 'react';

import Home from "./components/home";
import CarsList from "./components/carsList";
import NotFound from "./components/not-found";
import CarForm from "./components/carForm";
import Login from './components/login';
import Profile from './components/profile';
import Register from './components/register';
import UserList from './components/userList';
import UserForm from './components/userForm';
import BrandsList from './components/brandsList';
import BrandsForm from './components/brandsForm';

import { Route, Redirect, Switch } from "react-router-dom";
import {loadUser} from './actions/loadUser';
import {loadBrands} from './actions/loadBrands';
import {loadCars} from './actions/loadCars';
import {loadUsers} from './actions/loadUsers';

import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';

import {connect, useDispatch} from 'react-redux';
import {setUser} from './store';
const mapDispatch = {setUser, loadUser, loadCars, loadBrands, loadUsers};

function App ({user, setUser, loadUser, loadCars, loadBrands, loadUsers}) {
	const [loaded, setLoaded] = useState(false);

	const loadData = async () => {
		const token = window.sessionStorage.getItem('token');
		if (token && loaded === false) {
			await loadUser();
			await loadCars();
			await loadBrands();
			await loadUsers();
			setLoaded(true);
		}
	}
	loadData();

	const onLogin = (user) => {
		setUser(user);
	}

	return (
		<React.Fragment>
			<div>
				<Switch>
					<Route path="/brands/:id" render={
						props => <BrandsForm {...props} userType={user.type}/>
					}/>
					<Route path="/brands" render={
						props => <BrandsList {...props} userType={user.type}/>
					}/>
					<Route path="/users/:id" render={
						props => <UserForm {...props} userType={user.type}/>
					}/>
					<Route path="/users/new" render={
						props => <UserForm {...props} userType={user.type}/>
					}/>
					<Route path="/users" render={
						props => <UserList {...props} userType={user.type}/>
					}/>
					<Route path="carslist/new" render={
						props => <CarForm {...props} userType={user.type}/>
					}/>
					<Route path="/carslist/:id" render={
						props => <CarForm {...props} userType={user.type}/>
					}/>
					<Route path="/carslist" render={
						props => <CarsList {...props} userType={user.type}/>
					}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/login" render={
						props => <Login {...props} onLogin={onLogin}/>
					}/>
					<Route path="/register" component={Register}/>
					<Route path="/home" render={
						props => <Home {...props} userType={user.type}/>
					}/>
					<Route path="/not-found" component={NotFound} />
					<Redirect from="/" exact to="/home" />
					<Redirect to="/not-found" />
				</Switch>
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => ({
	user: state.user,
	redirectToLogin: state.redirectToLogin
});

export default connect(mapStateToProps, mapDispatch)(App);
