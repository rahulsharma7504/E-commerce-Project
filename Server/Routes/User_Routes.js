const express = require('express');
const userRoute = express();
const { Secure } = require('../Middleware/Auth')
const { isUser } = require('../Middleware/isUser')

const User_Controller = require('../Controllers/User_Controller')

//Authentication Apis
userRoute.post('/signup', User_Controller.Register) 
userRoute.post('/login', User_Controller.Login)
// Profile routes
userRoute.get('/user', Secure, User_Controller.UserProfile)
userRoute.put('/update-profile', Secure, User_Controller.updateProfile)
// User Reviews and Feedbacks
userRoute.post('/reviews', Secure,isUser, User_Controller.addReview)
userRoute.get('/reviews', Secure,isUser, User_Controller.getReview)
userRoute.put('/reviews', Secure,isUser, User_Controller.updateReview)
userRoute.delete('/reviews', Secure,isUser, User_Controller.deleteReview)

// Products filters and listings
userRoute.get('/products', User_Controller.getAllProducts);                             
userRoute.get('/product/:productId', User_Controller.getProduct);                             
userRoute.get('/products/category/:categoryId', User_Controller.getProductByCategory);
userRoute.get('/products/price', User_Controller.getProductByPrice);
userRoute.get('/products/color', User_Controller.getProductByColor);
userRoute.get('/products/search', User_Controller.getProductBySearch);

// Cart routes

module.exports = { userRoute }