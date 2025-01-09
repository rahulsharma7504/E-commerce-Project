const express = require('express');
const adminRoutes = express();
const { Secure } = require('../Middleware/Auth');
const multer = require('multer');

const {roleSecure} =require('../Middleware/roleSecure');
const Admin_Controller = require('../Controllers/Admin_Controller')

// Admin routes

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })
const uploadMultiple = upload.array('images', 5); // 'images' is the field name, max 5 files




// category management APIs
adminRoutes.get('/category', Secure, roleSecure(['admin', 'vendor']), Admin_Controller.getAllCategories)
adminRoutes.post('/category', Secure,roleSecure(['admin']), Admin_Controller.createCategory)
adminRoutes.put('/category', Secure, roleSecure(['admin']), Admin_Controller.updateCategory)
adminRoutes.delete('/category/:categoryId', Secure, Admin_Controller.DeleteCategory)

// Users Management APIs
adminRoutes.get('/all-users', Secure, roleSecure(['admin']), Admin_Controller.getAllUsers)
adminRoutes.put('/update-user-status', Secure,roleSecure(['admin']), Admin_Controller.UpdateUserStatus)

// Vendor Management APIs
adminRoutes.post('/create-vendor', Secure,roleSecure(['admin']), Admin_Controller.createVendor)
adminRoutes.put('/update-vendor', Secure, roleSecure(['admin']),Admin_Controller.updateUserOrVendorDetails)
adminRoutes.get('/all-vendors', Secure, roleSecure(['admin', 'vendor']),Admin_Controller.getAllVendors)
adminRoutes.delete('/delete-vendor/:userId', Secure, roleSecure(['admin']),Admin_Controller.deleteVendor)


// Product Management APIs
adminRoutes.post('/create-product', Secure, roleSecure(['admin']), uploadMultiple, Admin_Controller.createProduct)
adminRoutes.get('/product', Secure, roleSecure(['admin']), Admin_Controller.AllProduct)
adminRoutes.put('/product/:productId', Secure, roleSecure(['admin']), uploadMultiple, Admin_Controller.UpdateProduct)
adminRoutes.delete('/product/:productId', Secure, roleSecure(['admin']), uploadMultiple, Admin_Controller.DeleteProduct)

// Admin Update Profile API

adminRoutes.put('/update-profile', Secure, roleSecure(['admin']), Admin_Controller.updateProfile)


module.exports = { adminRoutes }