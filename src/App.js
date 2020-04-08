import React from 'react';

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
import 'react-toastify/dist/ReactToastify.css';

import './css/App.css';




function App() {
	return (
		<React.Fragment>
			<div>
				<Switch>
					<Route path="/brands/:id" component={BrandsForm}/>
					<Route path="/brands" component={BrandsList}/>
					<Route path="/users/:id" component={UserForm}/>
					<Route path="/users/new" component={UserForm}/>
					<Route path="/users" component={UserList}/>
					<Route path="carslist/new" component={CarForm}/>
					<Route path="/carslist/:id" component={CarForm}/>
					<Route path="/carslist" component={CarsList}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/login" component={Login}/>
					<Route path="/register" component={Register}/>
					<Route path="/home" component={Home}/>
					<Route path="/not-found" component={NotFound} />
					<Redirect from="/" exact to="/home" />
					<Redirect to="/not-found" />
				</Switch>
			</div>
		</React.Fragment>
	);
}

export default App;
