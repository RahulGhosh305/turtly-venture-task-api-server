const mongoose = require('mongoose')
const { Schema } = mongoose;
const validator = require('validator')

const UserRegistrationSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            message: `{VALUE} validation failed`
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
})

const userRegistration = mongoose.model('userRegistrations', UserRegistrationSchema)
module.exports = userRegistration