const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'teams-generator-secret');
        const user = await User.findOne({_id: decoded._id})
        if (!user) {
            throw new Error('auth problem');
        }
        req.user = user
        req.token = token
        next()
    } catch(e) {
        console.log('auth error', e)
        res.status(404).send('Please authenticate')
    }
}

module.exports = auth