const Channels = require('../models/ChannelModel')

// Channel Post Controller
const postChannelController = (req, res, next) => {
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
}


// All Channel Get Controller
const getAllChannelController = (req, res, next) => {
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
}

// Single Channel Get Controller
const getSingleChannelCntroller = (req, res, next) => {
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
}


// Delete Channel
const deleteChannelController = (req, res, next) => {
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
}

// Update Channel Controller
const updateChannelController = (req, res, next) => {
    const id = req.params.id
    const name = req.body.name
    const frequency = req.body.frequency

    Channels.updateOne({ _id: id },
        { name: name, frequency: frequency })
        .then(result => {
            res.json("Update")
        })
        .catch(err => {
            res.json("Same Channel Found Or Error")
        })
}


module.exports = {
    postChannelController,
    getAllChannelController,
    getSingleChannelCntroller,
    deleteChannelController,
    updateChannelController
}