const {getUsers, createUser, getUser, updateUser, deleteUser} = require('../controllers/users.controllers');
const {Router} = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

router.route('/')
    .get(verifyToken, getUsers)
    .post(verifyToken, createUser)

router.route('/:id')
    .get(verifyToken, getUser)
    .put(verifyToken, updateUser)
    .delete(verifyToken, deleteUser)

module.exports = router;
