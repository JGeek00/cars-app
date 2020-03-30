import React, {Component} from "react";
import carImg from '../img/car.png'

class Home extends Component {
    render() {
        return (
            <div className="homeContent">
               <div> <h3>Welcome to Cars App</h3></div>
               <img src={carImg} />
            </div>
        )
    }
}

export default Home