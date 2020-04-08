const {getProfile, updateProfile} = require('../controllers/users.controllers');
const {Router} = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

router.route('/')
    .get(verifyToken, getProfile)
    .put(verifyToken, updateProfile)

module.exports = router;
