const mongoose = require('mongoose');

const Schema = mongoose.Schema

const teamSchema = new Schema({
    title: {type: String, required:true},
    players : [{name: String, grade: Number}],
    creator : {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Team', teamSchema);