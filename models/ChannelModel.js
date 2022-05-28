const mongoose = require('mongoose')
const { Schema } = mongoose;

const channelSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    frequency: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

const ChannelModel = mongoose.model('Channels', channelSchema)
module.exports = ChannelModel
