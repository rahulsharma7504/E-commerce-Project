const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const adminSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' } // Reference to the User model
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        strict: false // Allows extra fields not defined in the schema
    }
);

const adminModel = mongoose.model('Admin', adminSchema);
module.exports = adminModel;
