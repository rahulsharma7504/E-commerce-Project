const mongoose = require('mongoose');
const { Schema } = require('mongoose')
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    status: { type: String, default: 'active' },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    role: { type: String, enum: ['user', 'admin', 'vendor'], default: 'user' },
    token:{type: String, default: null},
}, { timestamps: true }, { strict: false })

const userModel = mongoose.model('User', userSchema);
module.exports = userModel 