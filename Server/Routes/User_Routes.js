const express = require('express');
const userRoute = express();
const { Secure } = require('../Middleware/Auth')

const User_Controller = require('../Controllers/User_Controller')

//Authentication Apis
userRoute.post('/signup', User_Controller.Register)
userRoute.post('/login', User_Controller.Login)
// Profile routes
userRoute.get('/user', Secure, User_Controller.UserProfile)
userRoute.put('/update-profile', Secure, User_Controller.updateProfile)


module.exports = { userRoute }