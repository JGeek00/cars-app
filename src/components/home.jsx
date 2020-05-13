import React from "react";
import carImg from '../img/car.png'
import { Link } from "react-router-dom";

import {connect} from 'react-redux';

const mapDispatch = {};

function Home ({userType, user}) {
    const handleLogout = () => {
        window.sessionStorage.removeItem('token');
    }

    return (
        <div className="homeContent">
            {
                window.sessionStorage.getItem('token') !== null ? (
                    <div className="sessionButtons">
                        <Link to="/profile" type="button" className="btn btn-light">User: {user.username}</Link>
                        <Link to="/login" type="button" className="btn btn-light" onClick={handleLogout}>Logout</Link>
                    </div>
                ) : (
                    null
                )
            }
            <div>
                <div> <h3>Welcome to Cars App</h3></div>
                <img src={carImg} alt="Logo"/>
            </div>
            {
                window.sessionStorage.getItem('token') === null ? (
                <div className="buttons">
                    <Link className="btn btn-primary" to="/login">Login</Link>
                    <Link className="btn btn-primary" to="/register">Register</Link>
                </div>
                ) : (
                    <div className="buttons">
                        <Link className="btn btn-primary" to="/carslist">Cars list</Link>
                        <Link className="btn btn-primary" to="/brands">Brands</Link>
                        {
                            userType === "admin" ? (
                                <Link className="btn btn-primary" to="/users">Users</Link>
                            ) : (
                                <React.Fragment/>
                            )
                        } 
                    </div>
                )
            } 
            <div className="aboutButton">
                <Link to="/about" type="button" className="btn btn-light">About</Link>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    user: state.user
});
 

export default connect(mapStateToProps, mapDispatch)(Home);