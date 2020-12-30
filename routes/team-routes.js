const express = require('express');

const teamControllers = require('../controllers/team-controllers');
const auth = require('../middlewares/auth');

const router = express.Router();
const {createTeam, getAllUserTeams} = teamControllers;

// post
router.post('/', auth, createTeam)

//get
router.get('/me', auth, getAllUserTeams)


//patch

module.exports = router;