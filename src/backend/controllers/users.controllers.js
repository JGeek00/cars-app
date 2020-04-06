const User = require('../models/User');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

const usersCtrl = {};

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find().sort({name: 1});
    res.json(users);
};

usersCtrl.createUser = async (req, res) => {
    const {username, password, name, surname, email} = req.body;
    const user = new User({
        username: username,
        password: password,
        name: name,
        surname: surname,
        email: email
    });
    user.password = await user.encryptPassword(password);
    const exists = await User.findOne({username: username});
    if (exists) {
        res.json({
            result: "fail",
            message: 'username-not-available'
        });
    }
    else {
        try {
            await user.save();
            res.json({
                result: "success"
            });
        } catch (error) {
            res.status(400).json({
                result: "success",
                message: error.message
            });
        }
    }
}

usersCtrl.getUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
};

usersCtrl.updateUser = async (req, res) => {
    const id = req.params.id;
    const {username, password, name, surname, email} = req.body;

    const user = await User.findOneAndUpdate({_id: id}, {
        username: username,
        password: password,
        name: name,
        surname: surname,
        email: email
    });
    if (user) {
        res.json({
            result: "success"
        });
    }
    else {
        res.status(400).json({
            result: "fail"
        });
    }
}

usersCtrl.deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json();
};

usersCtrl.register = async (req, res) => {
    const {username, password, name, surname, email} = req.body;
    const user = await User.findOne({username: username});
    if (user) {
        res.json({result: "fail", message: "username-not-available"});
    }
    else {
        const newUser = new User({
            username: username, 
            password: password, 
            name: name,
            surname: surname,
            email: email
        });
        newUser.password = await newUser.encryptPassword(password);
        try {
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, 'cars-app', {expiresIn: 60*60*24});
            res.json({
                result: "success",
                token: token
            });
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

usersCtrl.userInfo = async (req, res) => {
    const token = await verifyToken(req);
    if (token) {
        try {
            const user = await User.findById(token, {password: 0});
            res.json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }   
    }
    else {
        res.status(401).json({result: "fail", message: "no-token"});
    }
}

usersCtrl.login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if (user) {
        const valPassword = user.validatePassword(password);
        if (valPassword) {
            const token = await jwt.sign({id: user._id}, 'cars-app', {expiresIn: 60*60*24});
            res.send({result: "success", token: token});
        }
        else {
            res.status(401).send({result: "fail", message: "password-not-match"});
        }
    }
    else {
        res.status(400).json({result: "fail", message: "Username doesn't exist"});
    }
}

usersCtrl.logout = async (req, res) => {

};

module.exports = usersCtrl;