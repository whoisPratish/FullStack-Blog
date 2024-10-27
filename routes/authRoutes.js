const express = require('express');
const User = require('../models/User');
const { getLogin, getRegister,login, register } = require('../controllers/authController');
const { logout } = require('../config/passport');


const userRoutes = express.Router()


// render login page
userRoutes.get('/login', getLogin )


// render register page
userRoutes.get('/register', getRegister)


 // main logic for user login
 userRoutes.post('/login',login)

// main logic for user registration
userRoutes.post ('/register', register)

userRoutes.get('/logout', logout)

module.exports = userRoutes