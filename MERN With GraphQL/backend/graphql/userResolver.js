const UserModel = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userResolver = {
    async user(args, req) {
        if (!req.auth) throw new Error('You are not authenticated')
        return req.user
    },
    async createUser(args) {
        try {
            if (await UserModel.findOne({ email: args.data.email }))
                throw new Error('This email already exists. Please try a new one')

            const user = await UserModel.create(args.data)
            user.password = null
            // There is no need for populating user right now because the user has recently created
            // and there has no event created by the user
            return user
        } catch (e) {
            return e
        }
    },
    async login({ email, password }) {
        try {
            const user = await UserModel.findOne({ email })
                .select('+password')
                .populate('createdEvents')
            if (!user) throw new Error('Your password or email is incorrect')
            const isPasswordMatched = await bcrypt.compare(password, user.password)
            if (!isPasswordMatched) return new Error('Your password or email is incorrect')

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
            user.password = undefined
            return { token, user, tokenExpiration: 1 }
        } catch (e) {
            return e
        }
    }
}

module.exports = userResolver
