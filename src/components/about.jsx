import React from 'react';
import carImg from '../img/car.png';
import github from '../img/github.png';

const About = (props) => {
    const redirectGithub = () => {
        window.open('https://github.com/JGeek00/cars-app', '_blank');
    }
    
    return (
        <div className="aboutContent">
            <div className="top">
                <div className="title"> <h1>About Cars App</h1></div>
                <img src={carImg} alt="Logo"/>
            </div>
            <div>
                Created by Juan Gilsanz (JGeek00) using <a href="https://es.reactjs.org/" target="_blank">ReactJS</a>.
            </div>
            <div className="img">
                <img src={github} alt="Logo" onClick={redirectGithub}/>
            </div>
        </div>
    );
}
 
export default About;