const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/cars-app';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', function () {
    console.log("Database running");
})