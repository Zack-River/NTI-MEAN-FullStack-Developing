const express = require('express');
const authenticate = require('../middlewares/authenticate');
const {register,logIn,getProfile} = require('../controllers/users.controller');
const router = express.Router();

// POST /users - Add a new user
router.post('/register', register);
router.post('/login', logIn);
router.post('/getprofile', authenticate, getProfile);

module.exports = router;
