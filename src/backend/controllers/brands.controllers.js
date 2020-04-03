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
    const send = await brand.save();
    if (send) {
        res.json({result: "success"});
    }
    else {
        res.code(400).json({result: "fail"});
    }
}

brandsCtrl.getBrand = async (req, res) => {
    const id = req.params.id;
    const brand = await Brand.findById(id);
    res.json(brand);
};

brandsCtrl.updateBrand = async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    const result = await Brand.findOneAndUpdate({_id: id}, {
        name: name
    });
    if (result) {
        res.json({result: "success"});
    }
    else {
        res.status(400).json({result: "fail"});
    }
}

brandsCtrl.deleteBrand = async (req, res) => {
    const id = req.params.id;
    await Brand.findByIdAndDelete(id);
};


module.exports = brandsCtrl;