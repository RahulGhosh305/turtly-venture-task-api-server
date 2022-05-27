const express = require('express')
const router = express.Router()
const Channels = require('../models/ChannelModel')

// Channel Post
router.post('/', (req, res, next) => {
    const channelValues = new Channels({
        name: req.body.name,
        frequency: req.body.frequency
    })

    channelValues.save()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Found In Post",
                error: err
            })
        })
})

// All Channel Get 
router.get('/', (req, res, next) => {
    Channels.find()
        .then(channels => {
            res.status(201).json(channels)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Found In Get",
                error: err
            })
        })
})

// Single Channel Get 
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Channels.findById({ _id: id })
        .then(channel => {
            res.status(201).json(channel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Found In Single Get",
                error: err
            })
        })
})

// Delete Channel  
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Channels.deleteOne({ _id: id })
        .then(result => {
            res.json("Station deleted. Reload App")
        })
        .catch(error => {
            console.log(err)
            res.status(500).json({
                message: "Error Found In Delete",
                error: err
            })
        });
})

// Update Channel
router.patch('/:id', (req, res, next) => {
    const id = req.params.id
    const name = req.body.name
    const frequency = req.body.frequency

    console.log(name, frequency);
    Channels.updateOne({ _id: id },
        { name: name, frequency: frequency })
        .then(result => {
            res.json("Update")
        })
        .catch(err => {
            res.json("Same Channel Found Or Error")
        })
})

module.exports = router