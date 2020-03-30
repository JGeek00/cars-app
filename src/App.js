import React from 'react';

import Home from "./components/home";
import CarsList from "./components/carsList";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import CarForm from "./components/carForm";
import Login from './components/login';

import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './css/App.css';





function App() {
  return (
    <React.Fragment>
        <Navbar/>
        <div>
            <Switch>
                <Route path="carslist/new" component={CarForm}/>
                <Route path="/carslist/:id" component={CarForm}/>
                <Route path="/carslist" component={CarsList}/>
                <Route path="/login" component={Login}/>
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
