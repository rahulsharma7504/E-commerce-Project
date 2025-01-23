const mongoose = require('mongoose');

const { Schema } = mongoose; // Destructure Schema from mongoose
var colors = [
    "Red", "Blue", "Green", "Yellow",  "Purple",  "Black", "White"
];
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    availableColors: { type: Array, default: colors },
    stockQuantity: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },

}, { timestamps: true }, { strict: false })

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel