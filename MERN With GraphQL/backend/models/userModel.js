const { Schema, model, Types } = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        validate: [validator.isEmail, 'Please Provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [8, 'Please provide a password at least containing 8 characters'],
        select: false
    }
})

userSchema.virtual('createdEvents', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'creator'
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

module.exports = model('User', userSchema)
