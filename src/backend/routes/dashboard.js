const {userInfo} = require('../controllers/users.controllers');
const {Router} = require('express');
const router = Router();

router.route('/').get(userInfo);

module.exports = router;