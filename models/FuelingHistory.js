const {Schema, model} = require('mongoose')

const schema = new Schema({
    fuelType: {type: Schema.Types.ObjectId, ref: 'FuelTypes', required: true},
    quantity: {type: Number, required: true},
    cost: {type: Number, required: true},
    fuelingDate: {type: Date, required: true},
    currentMileage: {type: Number, required: true},
    autoId: {type: Schema.Types.ObjectId, ref: 'Car', required: true},
}, {
    timestamps: {createdAt: 'created_at'},
    // данные понадобятся на фронтенде, поэтому для удобства переименован
})

module.exports = model('FuelingHistory', schema)
