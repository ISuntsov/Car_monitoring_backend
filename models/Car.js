const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    model: String,
    image: String,
    year: Date,
    fuelType: {type: Schema.Types.ObjectId, ref: 'FuelTypes', required: true},
    fuelTankCapacity: Number,
    mileage: Number,
    autoParts: [{type: Schema.Types.ObjectId, ref: 'AutoParts'}],
}, {
    timestamps: true
})

module.exports = model('Car', schema)