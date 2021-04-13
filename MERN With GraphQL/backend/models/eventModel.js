const { Schema, model, Types } = require('mongoose')

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide event type']
    },
    description: {
        type: String,
        required: [true, 'Please provide event description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide event price']
    },
    date: {
        type: Date,
        required: [true, 'Please provide event date']
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

eventSchema.pre(/^find/, function (next) {
    this.populate('creator')
    next()
})

module.exports = model('Event', eventSchema)
