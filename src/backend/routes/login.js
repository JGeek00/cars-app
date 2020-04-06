const {login} = require('../controllers/users.controllers');
const {Router} = require('express');
const router = Router();

router.route('/').post(login);

module.exports = router;
