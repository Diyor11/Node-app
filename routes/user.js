const express = require('express')
const router = express.Router()
const { User, validate } = require('../moduls/user')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.get('/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({error: 'yaroqsiz id'})

    const user = await User.findById(req.params.id)

    if(!user) return res.status(404).send({error: 'Bunday id raqamli user topilmadi'})

    res.send(user)
})

router.post('/', async (req, res) => {
    const {error, value} = validate.validate(req.body)

    if(error) return res.status(400).send({error: error.details[0].message})

    const user = await new User(value).save();
    
    res.status(201).send(user)
})

router.put('/:id', async(req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({error: 'yaroqsiz id'})

    const {error, value} = validate.validate(req.body);

    if(error) return res.status(400).send({error: error.details[0].message})

    const user = await User.findByIdAndUpdate(req.params.id, value, {new: true});

    if(!user) return res.status(404).send({error: 'bunday id li user topilmadi'})
    res.send(user)
})

router.delete('/:id', async(req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({error: 'yaroqsiz id'})

    const user = await User.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).send({error: "bunday id li user topilmadi"})
    res.send(user)
})

module.exports = router;