const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model

        product: [{
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }],
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], // Order status
            default: 'Pending',
        },
        vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },  // Reference to Vendor schema

    },

    {
        timestamps: true, // Adds createdAt and updatedAt fields
        strict: false // Allows extra fields not defined in the schema
    }
);

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;

