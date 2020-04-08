const express = require('express');
const server = express();
const session = require('express-session');

const cors = require('cors');

//Settings
server.set('port', process.env.PORT || 4000);

//Middlewares
server.use(cors());
server.use(express.json());
server.use(session({
    secret: "cars-app",
    resave: false,
    saveUninitialized: false
}));

//Routes
server.use('/api/cars', require('./routes/cars'));
server.use('/api/brands', require('./routes/brands'));
server.use('/api/users', require('./routes/users'));
server.use('/api/login', require('./routes/login'));
server.use('/api/register', require('./routes/register'));
server.use('/api/profile', require('./routes/profile'));


module.exports = server;