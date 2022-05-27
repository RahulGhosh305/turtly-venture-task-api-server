const mongoose = require('mongoose')
const { Schema } = mongoose;
// const validator = require('validator')

const channelSchma = new Schema({
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

const ChannelModel = mongoose.model('Channels', channelSchma)
module.exports = ChannelModel


// email: {
    //     type: String,
    //     trim: true,
    //     validate: {
    //         validator: (v) => {
    //             return validator.isEmail(v)
    //         },
    //         message: `{VALUE} validation failed`
    //     }
    // }