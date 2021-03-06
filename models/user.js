const mongoose = require('mongoose');

const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
        //more validation to be added
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error
            }
        }
    },
    teams: [{type: mongoose.Types.ObjectId, required: true, ref:'Team'}],
    tokens:[{
        token:{type: String, required: true}
    }]
});

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject();
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('wrong password/email')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('wrong password/email')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'teams-generator-secret');
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
})


User = mongoose.model('User', userSchema);

module.exports = User;