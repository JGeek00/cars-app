const {logout} = require('../controllers/users.controllers');
const {Router} = require('express');
const router = Router();

router.route('/').get(logout);

module.exports = router;
