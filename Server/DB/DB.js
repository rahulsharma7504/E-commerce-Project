require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB 
const ConnectDB = async () => {
    try {
        const uri = process.env.MONGO_URI; // Use the environment variable for the MongoDB URI
        if (!uri) {
            throw new Error("❌ MONGO_URI is not defined in environment variables.");
        }

        await mongoose.connect(uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });

        console.log('✅ Database Connected');
      
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = { ConnectDB };
