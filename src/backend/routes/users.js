const {getUsers, createUser, getUser, updateUser, deleteUser} = require('../controllers/users.controllers');
const {Router} = require('express');
const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;
