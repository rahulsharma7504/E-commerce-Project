const express = require('express');
const adminRoutes = express();
const { Secure } = require('../Middleware/Auth')
const isAdmin =require('../Middleware/isAdmin');
const Admin_Controller = require('../Controllers/Admin_Controller')

adminRoutes.post('/create-vendor', Secure,isAdmin, Admin_Controller.createVendor)
adminRoutes.get('/get-all-users', Secure, isAdmin,Admin_Controller.getAllUsers)
adminRoutes.post('/status', Secure,isAdmin, Admin_Controller.Status)
adminRoutes.put('/update-vendor-user', Secure, isAdmin,Admin_Controller.updateUserOrVendorDetails)
adminRoutes.delete('/delete-any/:id', Secure, isAdmin, Admin_Controller.DeleteAny)

// category routes
adminRoutes.get('/categories', Secure, isAdmin, Admin_Controller.getAllCategories)
adminRoutes.post('/categories', Secure,isAdmin, Admin_Controller.createCategory)
adminRoutes.put('/categories/:id', Secure, isAdmin, Admin_Controller.updateCategory)
adminRoutes.delete('/categories/:id', Secure, isAdmin, Admin_Controller.DeleteCategory)


module.exports = { adminRoutes }