const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const vendorSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }

    }],
    totalPrice: { type: Number, required: true },
}, { timestamps: true }, { strict: false })

const vendorModel = mongoose.model('Vendor', vendorSchema);
module.exports = vendorModel