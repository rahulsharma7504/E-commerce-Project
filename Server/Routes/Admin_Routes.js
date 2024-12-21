const express = require('express');
const adminRoutes = express();
const { Secure } = require('../Middleware/Auth')

const Admin_Controller = require('../Controllers/Admin_Controller')

adminRoutes.post('/create-vendor', Secure, Admin_Controller.createVendor)
adminRoutes.get('/get-all-users', Secure, Admin_Controller.getAllUsers)
adminRoutes.post('/status', Secure, Admin_Controller.Status)
adminRoutes.put('/update-vendor-user', Secure, Admin_Controller.updateUserOrVendorDetails)
adminRoutes.delete('/delete-any/:id', Secure, Admin_Controller.DeleteAny)



module.exports = { adminRoutes }