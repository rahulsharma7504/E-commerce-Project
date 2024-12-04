const express=require('express');
const userRoute=express();
const {Secure}=require('../Middleware/Auth')

const User_Controller=require('../Controllers/User_Controller')

userRoute.get('/',User_Controller.Register)

module.exports={userRoute}