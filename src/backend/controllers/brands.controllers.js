const Brand = require('../models/Brand');

const brandsCtrl = {};

brandsCtrl.getBrands = async (req, res) => {
    const brands = await Brand.find().sort({name: 1});
    res.json(brands);
};

brandsCtrl.createBrand = async (req, res) => {
    const {name} = req.body;
    const brand = new Brand({
        name: name
    });
    await brand.save();
}

brandsCtrl.getBrand = async (req, res) => {
    const id = req.params.id;
    const brand = await Brand.findById(id);
    res.json(brand);
};

brandsCtrl.updateBrand = async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    await Brand.findOneAndUpdate({_id: id}, {
        name: name
    });
}

brandsCtrl.deleteBrand = async (req, res) => {
    const id = req.params.id;
    await Brand.findByIdAndDelete(id);
};


module.exports = brandsCtrl;