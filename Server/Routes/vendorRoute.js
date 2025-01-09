const express = require('express');
const vendorRoutes = express();
const multer = require('multer');
const { Secure } = require('../Middleware/Auth')
const {roleSecure} = require('../Middleware/roleSecure');
const Vendor_Controller = require('../Controllers/vendorController')

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


vendorRoutes.post('/create-product/:vendorId', Secure, roleSecure(['vendor']), uploadMultiple, Vendor_Controller.createProduct)
vendorRoutes.get('/product/:vendorId', Secure, roleSecure(['vendor']), Vendor_Controller.AllProduct)
vendorRoutes.put('/product/:vendorId', Secure, roleSecure(['vendor']), uploadMultiple, Vendor_Controller.UpdateProduct)
vendorRoutes.delete('/product/:productId', Secure, roleSecure(['vendor']), uploadMultiple, Vendor_Controller.DeleteProduct)


module.exports = { vendorRoutes }