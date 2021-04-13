const { Schema, model, Types } = require('mongoose')

const bookingSchema = new Schema(
    {
        event: {
            type: Types.ObjectId,
            ref: 'Event'
        },
        user: {
            type: Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
)

bookingSchema.pre(/^find/, function (next) {
    this.populate('event').populate('user')
    next()
})

module.exports = model('Booking', bookingSchema)
