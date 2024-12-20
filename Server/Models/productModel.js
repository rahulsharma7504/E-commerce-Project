const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },

}, { timestamps: true }, { strict: false })

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel