const Team = require('../models/team');
const User = require('../models/user');

/// Post

const createTeam = async (req, res, next) => {
    const user = req.user;
    const teamData = req.body;
    const newTeam = new Team({
        ...teamData,
        creator : user._id
    })
    try {
        await newTeam.save();
        user.teams.push(newTeam)
        await user.save()
        res.status(201).json({team: newTeam})
    } catch(e) {
        console.log(e.message);
        return next(new Error('creating team failed'))
    }
}

// GET

const getAllUserTeams = async (req, res, next) => {
    const userID = req.user._id
    try {
        const userTeams = await User.findById(userID).populate('teams');
        if (!userTeams) {
            return next(new Error('problem with fetching teams'));
        }
        res.status(201).json({user_teams: userTeams.teams.map(team => team.toObject())})
    } catch(e) {
        return next(new Error(e.message))
    }
}

exports.createTeam = createTeam;
exports.getAllUserTeams = getAllUserTeams;