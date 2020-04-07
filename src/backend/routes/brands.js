const {getBrands, createBrand, getBrand, updateBrand, deleteBrand} = require('../controllers/brands.controllers');
const {Router} = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken');

router.route('/')
    .get(verifyToken, getBrands)
    .post(verifyToken, createBrand)

router.route('/:id')
    .get(verifyToken, getBrand)
    .put(verifyToken, updateBrand)
    .delete(verifyToken, deleteBrand)

module.exports = router;
