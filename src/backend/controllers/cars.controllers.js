const Car = require('../models/Car');

const carsCtrl = {};

carsCtrl.getCars = async (req, res) => {
    const cars = await Car.aggregate([{
        $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand"
        }
    }]).sort({model: 1});
    res.json(cars);
};

carsCtrl.createCar = async (req, res) => {
    const {model, brand} = req.body;
    const car = new Car({
        model: model,
        brand: brand
    });
    const created = await car.save();
    if (created) {
        res.json({result: "success"});
    }
    else {
        res.status(400).json({result: "fail"});
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