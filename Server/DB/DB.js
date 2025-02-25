const dotenv=require('dotenv').config()

const mongoose =require('mongoose');

// Connect to MongoDB 
const ConnectDB=async()=>{
    try { 
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            maxPoolSize: 10 // Connection pool ka size set karo
        }); 
        
        console.log("Database Connected")
        
    } catch (error) {
        if(error) throw new Error(error.message)
        
    }
}
module.exports={ConnectDB}