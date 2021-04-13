const EventModel = require('./../models/eventModel')
const BookingModel = require('./../models/bookingModel')

const bookingResolver = {
    async bookings(args, req) {
        if (!req.auth) throw new Error('You are not authenticated')
        return BookingModel.find().sort('-createdAt')
    },
    async createBooking({ eventID }, req) {
        try {
            if (!req.auth) throw new Error('You are not authenticated')
            if (!eventID) throw new Error('EventID was not provided')

            const event = await EventModel.findById(eventID)
            if (!event) throw new Error('There is no such Event.')

            const booking = await BookingModel.create({
                event: eventID,
                user: req.auth.id
            })
            return BookingModel.findById(booking.id)
        } catch (e) {
            return e
        }
    },
    async cancelBooking({ bookingID }, req) {
        try {
            if (!req.auth) throw new Error('You are not authenticated')
            const booking = await BookingModel.findById(bookingID)
            await BookingModel.findByIdAndDelete(bookingID)
            return booking
        } catch (e) {
            return e
        }
    }
}

module.exports = bookingResolver
