const express = require('express');
const adminRoutes = express();
const { Secure } = require('../Middleware/Auth');
const multer = require('multer');

const isAdmin =require('../Middleware/isAdmin');
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
adminRoutes.get('/category', Secure, isAdmin, Admin_Controller.getAllCategories)
adminRoutes.post('/category', Secure,isAdmin, Admin_Controller.createCategory)
adminRoutes.put('/category', Secure, isAdmin, Admin_Controller.updateCategory)
adminRoutes.delete('/category/:categoryId', Secure, Admin_Controller.DeleteCategory)

// Users Management APIs
adminRoutes.get('/all-users', Secure, isAdmin, Admin_Controller.getAllUsers)
adminRoutes.put('/update-user-status', Secure,isAdmin, Admin_Controller.UpdateUserStatus)

// Vendor Management APIs
adminRoutes.post('/create-vendor', Secure,isAdmin, Admin_Controller.createVendor)
adminRoutes.put('/update-vendor', Secure, isAdmin,Admin_Controller.updateUserOrVendorDetails)
adminRoutes.get('/all-vendors', Secure, isAdmin,Admin_Controller.getAllVendors)
adminRoutes.delete('/delete-vendor/:userId', Secure, isAdmin,Admin_Controller.deleteVendor)


// Product Management APIs
adminRoutes.post('/create-product', Secure, isAdmin, uploadMultiple, Admin_Controller.createProduct)
adminRoutes.get('/product', Secure, isAdmin, Admin_Controller.AllProduct)
adminRoutes.put('/product/:productId', Secure, isAdmin, uploadMultiple, Admin_Controller.UpdateProduct)
adminRoutes.delete('/product/:productId', Secure, isAdmin, uploadMultiple, Admin_Controller.DeleteProduct)

// Admin Update Profile API

adminRoutes.put('/update-profile', Secure, isAdmin, Admin_Controller.updateProfile)


module.exports = { adminRoutes }