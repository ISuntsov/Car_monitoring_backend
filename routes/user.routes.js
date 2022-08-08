const express = require('express')
const User = require('../models/User')
const auth=require('../middleware/auth.middleware')
const {serverError} = require("../utils/helpers");
const router = express.Router({
    mergeParams: true
})

router.patch('/:userId',
    auth,
    async (req, res) => {
        try {
            const {userId} = req.params
            
            if (userId === req.user._id) {
                const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
                // {new: true} - обозначает ожидание получения данных до момента обновления,
                // чтобы не получить старые данные
                res.send(updatedUser)
            } else {
                res.status(401).json({message: 'Unauthorized'})
            }
            res.status(200).send()
        } catch (e) {
            serverError(500)
        }
    })

router.get('/',
    auth,
    async (req,res)=>{
    try {
        const list = await User.find()
        res.status(200).send(list)
    } catch (e) {
        serverError(500)
    }
})

module.exports = router