const dotenv=require('dotenv').config()
const { ConnectDB } = require("./DB/DB");
const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
const CORS=require('cors');
const body_parser=require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use(express.json())
// Use CORS for Client Side Requests
app.use(cookieParser());
app.use(CORS());
app.use(express.json());
 
// Connect-To-DB
ConnectDB();

// Here We Start the Middleware 
app.use('/api',require('./Routes/User_Routes').userRoute)
app.use('/api/admin',require('./Routes/Admin_Routes').adminRoutes)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log('Server Start At Port '+PORT )
})

