const Brand = require('../models/Brand');

const brandsCtrl = {};

brandsCtrl.getBrands = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        try {
            const brands = await Brand.find().sort({name: 1});
            res.json(brands);
        } catch (error) {
            res.status(401).json({
                response: 'fail',
                message: error.message
            });
        }
    }
};

brandsCtrl.createBrand = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const {name} = req.body;
        const brand = new Brand({
            name: name
        });
        try {
            const send = await brand.save();
            if (send) {
                res.json({result: "success"});
            }
            else {
                res.code(400).json({result: "fail"});
            }
        } catch (error) {
            res.code(400).json({result: "fail", message: error.message});
        }
    }
}

brandsCtrl.getBrand = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const id = req.params.id;
        try {
            const brand = await Brand.findById(id);
            res.json(brand);
        } catch (error) {
            res.status(401).json({result: "fail", message: error.message});
        }
    }
};

brandsCtrl.updateBrand = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const id = req.params.id;
        const {name} = req.body;
        try {
            const result = await Brand.findOneAndUpdate({_id: id}, {
                name: name
            });
            if (result) {
                res.json({result: "success"});
            }
            else {
                res.status(400).json({result: "fail"});
            }
        } catch (error) {
            res.status(401).json({result: "fail", message: error.message});
        }
    }
}

brandsCtrl.deleteBrand = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const id = req.params.id;
        try {
            await Brand.findByIdAndDelete(id);
        } catch (error) {
            res.status(401).json({result: "fail", message: error.message});
        }
    }
    
};


module.exports = brandsCtrl;