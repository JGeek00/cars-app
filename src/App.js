import React, {useState, useEffect} from 'react';

import Home from "./components/home";
import CarsList from "./components/carsList";
import NotFound from "./components/not-found";
import About from './components/about';
import CarForm from "./components/carForm";
import Login from './components/login';
import Profile from './components/profile';
import Register from './components/register';
import UserList from './components/userList';
import UserForm from './components/userForm';
import BrandsList from './components/brandsList';
import BrandsForm from './components/brandsForm';

import { Route, Redirect, Switch } from "react-router-dom";

import {loadAllData} from './actions/loadAllData';

import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';

import {connect, useDispatch} from 'react-redux';
import {setUser, setRedirectToLogin} from './store';
const mapDispatch = {setUser, loadAllData, setRedirectToLogin};

function App ({user, setUser, loadAllData, redirectToLogin, setRedirectToLogin}) {
	const dispatch = useDispatch(); 

	const token = window.sessionStorage.getItem('token');

	if (redirectToLogin === true) {
		dispatch(setRedirectToLogin(false));
	}

	useEffect(() => {
		if (token) {
			loadAllData();
		}
	}, [token]);

	const onLogin = (user) => {
		setUser(user);
	}

	return (
		<React.Fragment>
			<div>
				<Switch>
					{
						redirectToLogin === true ? (
							<Redirect to="/login" />
						) : (
							null
						)
					}
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
					<Route path="/carslist/:id" render={
						props => <CarForm {...props} userType={user.type}/>
					}/>
					<Route path="/carslist" render={
						props => <CarsList {...props} userType={user.type}/>
					}/>
					<Route path="/about" component={About}/>
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
