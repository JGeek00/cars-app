const User = require('../models/User');

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
    const exists = await User.findOne({username: username});
    if (exists) {
        res.json({
            result: "fail",
            message: 'username-not-available'
        });
    }
    else {
        await user.save();
        res.json({
            result: "success"
        });
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


module.exports = usersCtrl;