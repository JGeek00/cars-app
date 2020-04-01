import React, {Component} from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Cars App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <div className="mainMenu">
                        <li className="nav-item">
                            <NavLink className="nav-item nav-link" to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-item nav-link" to="/carslist">
                                Cars list
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-item nav-link" to="/users">
                                Users list
                            </NavLink>
                        </li>
                    </div>
                    <div className="loginMenu">
                        <li className="nav-item">
                            <NavLink className="nav-item nav-link" to="/login">
                                Login
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default  Navbar