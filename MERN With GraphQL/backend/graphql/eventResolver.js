const EventModel = require('./../models/eventModel')
const UserModel = require('./../models/userModel')

const eventResolver = {
    async events() {
        return EventModel.find().sort('-date')
    },
    async createEvent(args, req) {
        try {
            if (!req.auth) throw new Error('You are not authenticated')
            const event = await EventModel.create({
                ...args.data,
                creator: req.auth.id || req.auth._id
            })
            return await EventModel.findById(event.id)
        } catch (e) {
            return e
        }
    }
}

module.exports = eventResolver
