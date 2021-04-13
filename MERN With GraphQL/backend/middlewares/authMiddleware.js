const jwt = require('jsonwebtoken')
const UserModel = require('./../models/userModel')

exports.authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization') // can be req.headers.authorization
        let token
        if (authHeader && authHeader.startsWith('Bearer')) token = authHeader.split(' ')[1]
        if (!token || token === '') throw new Error('Auth Token is not provided')

        let { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await UserModel.findById(id).populate('').populate('createdEvents')
        if (!user) throw new Error('No user was found with this id')

        req.auth = user
        next()
    } catch (e) {
        // console.log(e.message)
        req.auth = undefined
        next()
    }
}
