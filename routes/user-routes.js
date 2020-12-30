const express = require('express');
const userControllers = require('../controllers/user-controllers');
const auth = require('../middlewares/auth');

const router = express.Router();
const { createUser, logUserIn, logUserOut } = userControllers


// post
router.post('/', createUser);
router.post('/login', logUserIn)
router.post('/logout', auth, logUserOut)

module.exports = router;