const express = require('express')
const auth = require('../middleware/auth.middleware')
const {serverError} = require("../utils/helpers");
const FuelingHistory = require('../models/FuelingHistory')
const chalk = require("chalk");
const Car = require("../models/Car");
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
                ...req.body
            })
            res.status(201).send(newFuelingNote)
        } catch (e) {
            serverError(500)
        }
    })

router
    .route('/:fuelingHistoryId')
    .patch(auth, async (req, res) => {
        try {
            const {fuelingHistoryId} = req.params
            const updatedNote = await FuelingHistory.findByIdAndUpdate(fuelingHistoryId, req.body, {new: true})
            res.send(updatedNote)
        } catch (e) {
            serverError(500)
        }
    })
    
    .delete(auth, async (req, res) => {
        try {
            const {fuelingHistoryId} = req.params
            const removedNote = await FuelingHistory.findById(fuelingHistoryId)
            await removedNote.remove()
            return res.send(null)
        } catch (e) {
            serverError(500)
        }
    })


module.exports = router