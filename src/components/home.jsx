import React, {Component} from "react";
import carImg from '../img/car.png'
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="homeContent">
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
                                this.props.userType === "admin" ? (
                                    <Link className="btn btn-primary" to="/users">Users</Link>
                                ) : (
                                    <React.Fragment/>
                                )
                            } 
                        </div>
                    )
                } 
            </div>
        )
    }
}

export default Home