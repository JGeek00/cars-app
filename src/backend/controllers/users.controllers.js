const User = require('../models/User');
const jwt = require('jsonwebtoken');

const usersCtrl = {};

usersCtrl.getUsers = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const users = await User.find().sort({name: 1});
        res.json(users);
    }
};

usersCtrl.createUser = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const {username, password, name, surname, email, userType} = req.body;
        const user = new User({
            username: username,
            password: password,
            name: name,
            surname: surname,
            email: email, 
            type: userType
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
                    result: "fail",
                    message: error.message
                });
            }
        }
    }
}

usersCtrl.getUser = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const id = req.params.id;
        const user = await User.findById(id);
        res.json(user);
    }
};

usersCtrl.updateUser = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const id = req.params.id;
        const {username, name, surname, email, userType} = req.body;

        try {
            const {password} = await User.findById(id);
            const user = await User.findOneAndUpdate({_id: id}, {
                username: username,
                password: password,
                name: name,
                surname: surname,
                email: email,
                type: userType
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
        } catch (error) {
            res.status(400).json({
                result: "fail"
            });
        }
    }
}

usersCtrl.deleteUser = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const id = req.params.id;
        if (tokenVal.id != id) {
            try {
                await User.findByIdAndDelete(id);
                res.json({result: "success"});
            } catch (error) {
                res.status(400).json({
                    result: 'fail'
                });
            }
        }
        else {
            res.json({
                result: 'fail',
                message: 'same-user'
            });
        }
    }
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
            email: email, 
            type: "user"
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
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        try {
            const user = await User.findById(tokenVal, {password: 0});
            res.json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }   
    }
}

usersCtrl.login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if (user) {
        const valPassword = await user.validatePassword(password, user.password);
        if (valPassword) {
            const token = await jwt.sign({id: user._id}, process.env.AUTH_KEY, {expiresIn: 60*60*24});
            res.send({result: "success", userData: user, token: token});
        }
        else {
            res.send({result: "fail", message: "password-not-match"});
        }
    }
    else {
        res.status(400).json({result: "fail", message: "Username doesn't exist"});
    }
}

usersCtrl.getProfile = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        try {
            const user = await User.findById(tokenVal.id, {password: 0});
            res.json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }   
    }
}

usersCtrl.updateProfile = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        try {
            const {username, name, surname, email} = req.body;
            const {password} = await User.findById(tokenVal.id);
            const user = await User.findOneAndUpdate({_id: tokenVal.id}, {
                username: username,
                password: password,
                name: name,
                surname: surname,
                email: email
            });
            res.json({result: "success"});
        } catch (error) {
            res.status(400).send(error.message);
        }   
    }
}

module.exports = usersCtrl;