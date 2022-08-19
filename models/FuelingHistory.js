const {Schema, model} = require('mongoose')

const schema = new Schema({
    fuelType: {type: Schema.Types.ObjectId, ref: 'FuelType', required: true},
    quantity: Number,
    cost: Number,
    fuelingDate: Date,
    currentMileage: Number,
    carId: {type: Schema.Types.ObjectId, ref: 'Car', required: true},
}, {
    timestamps: {createdAt: 'created_at'},
})
// данные понадобятся на фронтенде, поэтому для удобства переименован

module.exports = model('FuelingHistory', schema)
