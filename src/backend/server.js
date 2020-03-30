const express = require('express');
const server = express();

const cors = require('cors');

//Settings
server.set('port', process.env.PORT || 4000);

//Middlewares
server.use(cors());
server.use(express.json());

//Routes
server.use('/api/cars', require('./routes/cars'));
server.use('/api/brands', require('./routes/brands'));


module.exports = server;