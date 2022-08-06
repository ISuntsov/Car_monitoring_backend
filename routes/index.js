const express = require('express')
const router = express.Router({
    mergeParams: true
})

router.use('/auth', require('./auth.routes'))
router.use('/fuel_type', require('./fuelType.routes'))
router.use('/autopart', require('./autoPart.routes'))
router.use('/user', require('./user.routes'))
router.use('/car', require('./car.routes'))
router.use('/fuelingHistory', require('./fuelingHistory.routes'))
router.use('/serviceHistory', require('./serviceHistory.routes'))

module.exports = router