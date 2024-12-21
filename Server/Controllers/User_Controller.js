const userDB = require('../Models/userModel')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


const Register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(name, email, password, phone);
        const existingUser = await userDB.findOne({ email });
        if (existingUser) return res.status(400).send({ message: 'User already exists' })

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 20);

        const user = new userDB({
            name,
            email,
            password: hashedPassword,
            phone
        });
        await user.save();
        res.status(201).send({ message: 'User Registered Successfully' })

    } catch (error) {
        if (error) throw error.message

    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userDB.findOne({ email });
 
    if (!user) { 
        return res.status(400).send({ message: 'User does not exist' });
    } else if(user.status == 'inActive'){
        return res.status(200).json({message:"Your Account is Not Active"})
    }


    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: 'Invalid password' });
        }
        // Generate JWT
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET);
        // Store token in httpOnly cookie 
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // make sure you're using HTTPS in production
            maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks in milliseconds
        });

        // Send success response
        res.status(200).json({ message: "Login successful", token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};
const UserProfile=async (req, res) => {
    try {
        const user = await userDB.findById(req.user.userId).select('-password'); // Exclude password from response
        res.json(user );
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve user data" });
    }
}

const updateProfile=async(req,res)=>{
    try {
        const { name, email, password,phone } = req.body;
        console.log(req.body)
        // Check if email exists
        const existingUser = await userDB.findOne({ email:email  });
        if (existingUser) return res.status(400).send({ message: 'Email already exists' });
        
        // Hash Password if new password provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 20);
            req.body.password = hashedPassword;
        }
        
        // Update user profile
        const user = await userDB.findByIdAndUpdate(req.user.userId, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user profile" });
    }
 
}



module.exports = {
    Register,
    Login,
    UserProfile,
    updateProfile
}