const express = require('express')
const auth = require('../middleware/auth.middleware')
const {serverError} = require("../utils/helpers");
const FuelingHistory = require('../models/FuelingHistory')
const router = express.Router({
    mergeParams: true
})

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query
            const list = await FuelingHistory.find({[orderBy]: equalTo})
            res.send(list)
        } catch (e) {
            serverError(500)
        }
    })
    
    .post(auth, async (req, res) => {
        try {
            const newFuelingNote = await FuelingHistory.create({
                ...req.body,
                carId: req.car._id
            })
            res.status(201).send(newFuelingNote)
        } catch (e) {
            serverError(500)
        }
    })
    
router.delete('/:fuelingHistoryId',
    auth,
    async (req, res) => {
        try {
            const {fuelingHistoryId} = req.params
            const removedNote = await FuelingHistory.findById(fuelingHistoryId)
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