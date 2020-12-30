const User = require('../models/user');

const createUser = async (req, res, next) => {
    const userData = req.body
    try {
        const user = await new User(userData)
        const token = await user.generateAuthToken();
        await user.save()
        res.status(201).json({user, token});
    } catch(e) {
        const err = new Error(e.message)
        console.log(e.message)
        return next(err);
    }
}

const logUserIn = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.status(201).json({user, token})
    } catch(e) {
        const err = new Error('log in failed')
        console.log('loginfailed')
        return next(err)
    }
}


const logUserOut = async (req, res, next) => {
    const user = req.user;
    const token = req.token;
    try {
        user.tokens = user.tokens.filter(tokenObj=> tokenObj.token !== token);
        await user.save();
        res.status(201).send()
    } catch(e) {
        console.log('logout problem')
        return next(new Error('problem with loging out'))
    }
}

exports.createUser = createUser;
exports.logUserIn = logUserIn;
exports.logUserOut = logUserOut;