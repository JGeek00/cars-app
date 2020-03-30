const {getBrands, createBrand, getBrand, updateBrand, deleteBrand} = require('../controllers/brands.controllers');
const {Router} = require('express');
const router = Router();

router.route('/')
    .get(getBrands)
    .post(createBrand)

router.route('/:id')
    .get(getBrand)
    .put(updateBrand)
    .delete(deleteBrand)

module.exports = router;
