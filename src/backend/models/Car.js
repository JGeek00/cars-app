const {Schema, model} = require('mongoose');
const Brand = require('./Brand')

const carSchema = new Schema({
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    model: {
        type: String,
        required: true
    }
});

module.exports = model('Car', carSchema);