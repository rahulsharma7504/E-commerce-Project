const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const vendorSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId },
    storeName: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true }, { strict: false })

const vendorModel = mongoose.model('Vendor', vendorSchema);
module.exports = vendorModel