const Car = require('../models/Car');

const carsCtrl = {};

carsCtrl.getCars = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        try {
            const cars = await Car.aggregate([{
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
            }]).sort({model: 1});
            res.json(cars);
        } catch (error) {
            res.status(400).json({
                result: 'fail',
                message: error.message
            });
        }
    }
};

carsCtrl.createCar = async (req, res) => {
    const tokenVal = req.user_token_id;
    if (tokenVal) {
        const {model, brand} = req.body;
        const car = new Car({
            model: model,
            brand: brand
        });
        try {
            const created = await car.save();
            if (created) {
                res.json({result: "success"});
            }
            else {
                res.status(400).json({result: "fail"});
            }
        } catch (error) {
            res.status(400).json({result: "fail", message: error});
        }
    }
}

carsCtrl.getCar = async (req, res) => {
    const id = req.params.id;
    const car = await Car.findById(id);
    res.json(car);
};

carsCtrl.updateCar = async (req, res) => {
    const id = req.params.id;
    const {model, brand} = req.body;
    const updated = await Car.findOneAndUpdate({_id: id}, {
        model: model,
        brand: brand
    });
    if (updated) {
        res.json({result: "success"});
    }
    else {
        res.status(400).json({result: "fail"});
    }
}

carsCtrl.deleteCar = async (req, res) => {
    const id = req.params.id;
    await Car.findByIdAndDelete(id);
};


module.exports = carsCtrl;