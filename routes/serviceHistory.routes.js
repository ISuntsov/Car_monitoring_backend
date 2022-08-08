const express = require('express')
const auth = require('../middleware/auth.middleware')
const {serverError} = require("../utils/helpers");
const ServiceHistory = require('../models/ServiceHistory')
const router = express.Router({
    mergeParams: true
})

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query
            const list = await ServiceHistory.find({[orderBy]: equalTo})
            res.send(list)
        } catch (e) {
            serverError(500)
        }
    })
    
    .post(auth, async (req, res) => {
        try {
            const newServiceNote = await ServiceHistory.create({
                ...req.body,
                carId: req.car._id
            })
            res.status(201).send(newServiceNote)
        } catch (e) {
            serverError(500)
        }
    })

router.delete('/:serviceHistoryId',
    auth,
    async (req, res) => {
        try {
            const {serviceHistoryId} = req.params
            const removedNote = await ServiceHistory.findById(serviceHistoryId)
            if (removedNote.carId.toString() === req.car._id) {
                await removedNote.remove()
                return res.send(null)
            } else {
                return res.status(401).json({message: 'Unauthorized'})
            }
        } catch (e) {
            serverError(500)
        }
    })


module.exports = router