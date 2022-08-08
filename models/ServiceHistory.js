const {Schema, model} = require("mongoose");

const schema = new Schema({
    autoPart: {type: Schema.Types.ObjectId, ref: 'AutoParts', required: true},
    quantity: {type: Number, required: true},
    cost: {type: Number, required: true},
    serviceDate: {type: Date, required: true},
    currentMileage: {type: Number, required: true},
    carId: {type: Schema.Types.ObjectId, ref: 'Car', required: true},
}, {
    timestamps: {createdAt: 'created_at'},
    // данные понадобятся на фронтенде, поэтому для удобства переименован
})

module.exports = model('ServiceHistory', schema)