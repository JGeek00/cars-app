const {getCars, createCar, getCar, updateCar, deleteCar} = require('../controllers/cars.controllers');
const {Router} = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

router.route('/')
    .get(verifyToken, getCars)
    .post(verifyToken, createCar)

router.route('/:id')
    .get(verifyToken, getCar)
    .put(verifyToken, updateCar)
    .delete(verifyToken, deleteCar)

module.exports = router;
