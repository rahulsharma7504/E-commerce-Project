require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB 
const ConnectDB = async () => {
    try {
        const uri = "mongodb+srv://rahul658541:Rahul1234@cluster0.68hsd.mongodb.net/";
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
