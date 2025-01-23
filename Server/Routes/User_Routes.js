const express = require('express');
const userRoute = express();
const { Secure } = require('../Middleware/Auth')
const { roleSecure } = require('../Middleware/roleSecure')

const User_Controller = require('../Controllers/User_Controller')

//Authentication Apis
userRoute.post('/signup', User_Controller.Register);
userRoute.post('/login', User_Controller.Login);
userRoute.post('/forgot-password', User_Controller.ForgotPassword);
userRoute.post('/reset-password', User_Controller.ResetPassword);
userRoute.post('/logout', User_Controller.Logout);
// Profile routes 
userRoute.get('/user', Secure, User_Controller.UserProfile);
userRoute.put('/update-profile', Secure, roleSecure(['user', 'vendor', 'admin']), User_Controller.updateProfile);
// User Reviews and Feedbacks
userRoute.post('/reviews', Secure, roleSecure(['user']), User_Controller.addReview);
userRoute.get('/reviews', Secure, roleSecure(['user']), User_Controller.getReview);
userRoute.put('/reviews', Secure, roleSecure(['user']), User_Controller.updateReview);
userRoute.delete('/reviews', Secure, roleSecure(['user']), User_Controller.deleteReview);[]

// get allCategory routes

userRoute.get('/products', User_Controller.getAllProducts);
userRoute.get('/category', User_Controller.getAllCategory);
userRoute.get('/shop/products', User_Controller.getAllShopProducts);
userRoute.get('/shop/products/pagination', User_Controller.productPagination);
userRoute.post('/shop/products/filters', User_Controller.productFilters);
userRoute.post('/shop/products/filters-color', User_Controller.colorFilters);
userRoute.get('/shop/products/sorting', User_Controller.productSorting);
userRoute.get('/shop/products/search', User_Controller.productSearch);





// Products filters and listings

userRoute.get('/product/:productId', User_Controller.getProduct);
userRoute.get('/products/category/:categoryId', User_Controller.getProductByCategory);
userRoute.get('/products/price', User_Controller.getProductByPrice);
userRoute.get('/products/color', User_Controller.getProductByColor);
userRoute.get('/products/search', User_Controller.getProductBySearch);

// User Cart APIs

userRoute.post('/cart-add', Secure, roleSecure(['user']), User_Controller.addToCart);
userRoute.get('/cart-items/:userId', Secure, roleSecure(['user']), User_Controller.getUserCartItems);
userRoute.delete('/cart/:userId/:productId', Secure, roleSecure(['user']), User_Controller.deleteCartItems);


module.exports = { userRoute }