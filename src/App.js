import React, { Component } from 'react';

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
import axios from 'axios';
import config from './config.json';
import 'react-toastify/dist/ReactToastify.css';

import './css/App.css';


class App extends Component {
	state = {
		user: {}
	}

	async componentDidMount() {
		const token = window.sessionStorage.getItem('token');
		if (token) {
			const user = await axios.get(config.apiUrl + '/profile', {
				headers: {
					'x-access-token': token
				}
			});
			if (user.data.result === "fail" && user.data.message === "no-token") {
				window.sessionStorage.removeItem('token');
				this.props.history.push('/login');
			}
			this.setState({
				user: user.data
			});
		}
	}

	onLogin = (user) => {
		this.setState({user: user});
	}

	render() {
		return (
			<React.Fragment>
				<div>
					<Switch>
						<Route path="/brands/:id" render={
							props => <BrandsForm {...props} userType={this.state.user.type}/>
						}/>
						<Route path="/brands" render={
							props => <BrandsList {...props} userType={this.state.user.type}/>
						}/>
						<Route path="/users/:id" render={
							props => <UserForm {...props} userType={this.state.user.type}/>
						}/>
						<Route path="/users/new" render={
							props => <UserForm {...props} userType={this.state.user.type}/>
						}/>
						<Route path="/users" render={
							props => <UserList {...props} userType={this.state.user.type}/>
						}/>
						<Route path="carslist/new" render={
							props => <CarForm {...props} userType={this.state.user.type}/>
						}/>
						<Route path="/carslist/:id" render={
							props => <CarForm {...props} userType={this.state.user.type}/>
						}/>
						<Route path="/carslist" render={
							props => <CarsList {...props} userType={this.state.user.type}/>
						}/>
						<Route path="/profile" component={Profile}/>
						<Route path="/login" render={
							props => <Login {...props} onLogin={this.onLogin}/>
						}/>
						<Route path="/register" component={Register}/>
						<Route path="/home" render={
							props => <Home {...props} userType={this.state.user.type}/>
						}/>
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" exact to="/home" />
						<Redirect to="/not-found" />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
