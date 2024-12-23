const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    user: { type: Schema.Types.objectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },


}, { timestamps: true }, { strict: false })

const reviewModel = mongoose.model('Review', reviewSchema);
module.exports = reviewModel