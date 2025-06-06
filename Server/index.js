const dotenv = require('dotenv').config()
const { ConnectDB } = require("./DB/DB"); 
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const body_parser = require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.json()) 



// Use CORS for Client Side Requests

const cors = require('cors'); 

app.use(cors({
    origin: 'https://e-commerce-project-client-side.onrender.com',  // Your frontend URL
    credentials: true,  // If you're using cookies or sessions
}));
app.use(cookieParser());




app.get('/',(req, res) => {
    res.send('🔥 E-commerce Backend is Running Fine!');
  }
);


app.options('*', cors());  // This handles OPTIONS requests for all routes

app.use(express.json());

// Connect-To-DB
ConnectDB();

app.get('/', (req, res) => {
    res.send('🔥 E-commerce Backend is Running Fine!');
  });

// Here We Start the Middleware 
app.use('/api', require('./Routes/User_Routes').userRoute)
app.use('/api/admin', require('./Routes/Admin_Routes').adminRoutes)
app.use('/api/vendor', require('./Routes/vendorRoute').vendorRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server Start At Port ' + PORT)
})

