const express = require('express')
const router = express.Router()
const ChannelControllers = require('../controller/channelController')

// Channel Post
router.post('/', ChannelControllers.postChannelController)

// All Channel Get 
router.get('/', ChannelControllers.getAllChannelController)

// Single Channel Get 
router.get('/:id', ChannelControllers.getSingleChannelCntroller)

// Delete Channel  
router.delete('/:id', ChannelControllers.deleteChannelController)

// Update Channel
router.patch('/:id', ChannelControllers.updateChannelController)

module.exports = router