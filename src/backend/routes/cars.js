const {getCars, createCar, getCar, updateCar, deleteCar} = require('../controllers/cars.controllers');
const {Router} = require('express');
const router = Router();

router.route('/')
    .get(getCars)
    .post(createCar)

router.route('/:id')
    .get(getCar)
    .put(updateCar)
    .delete(deleteCar)

module.exports = router;
