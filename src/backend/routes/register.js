const {register} = require('../controllers/users.controllers');
const {Router} = require('express');
const router = Router();

router.route('/').post(register);

module.exports = router;
