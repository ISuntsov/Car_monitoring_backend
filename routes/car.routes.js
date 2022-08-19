const express = require('express')
const auth = require('../middleware/auth.middleware')
const {serverError} = require("../utils/helpers");
const Car = require('../models/Car')
const chalk = require("chalk");
const router = express.Router({
    mergeParams: true
})

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            // const {orderBy, equalTo} = req.query
            const list = await Car.find(/*{[orderBy]: equalTo}*/)
            res.send(list)
        } catch (e) {
            serverError(500)
        }
    })
    
    .post(auth, async (req, res) => {
        try {
            const newCar = await Car.create({
                ...req.body,
                userId: req.user._id
            })
            res.status(201).send(newCar)
        } catch (e) {
            serverError(500)
        }
    })

router
    .route('/:carId')
    .patch(auth, async (req, res) => {
        try {
            const {carId} = req.params
            
            const patchedCar = await Car.findById(carId)
            // todo: сменить на метод updateOne
            if (patchedCar.userId.toString() === req.user._id) {
                const updatedCar = await Car.findByIdAndUpdate(carId, req.body, {new: true})
                res.send(updatedCar)
            } else {
                return res.status(401).json({message: 'Unauthorized'})
            }
        } catch (e) {
            serverError(500)
        }
    })
    
    .delete(auth, async (req, res) => {
        try {
            const {carId} = req.params
            const removedCar = await Car.findById(carId)
            if (removedCar.userId.toString() === req.user._id) {
                await removedCar.remove()
                return res.send(null)
            } else {
                return res.status(401).json({message: 'Unauthorized'})
            }
        } catch (e) {
            serverError(500)
        }
    })

module.exports = router