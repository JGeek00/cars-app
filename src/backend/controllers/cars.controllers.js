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
    await car.save();
    res.json(car);
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
    res.json(updated);
}

carsCtrl.deleteCar = async (req, res) => {
    const id = req.params.id;
    await Car.findByIdAndDelete(id);
};


module.exports = carsCtrl;