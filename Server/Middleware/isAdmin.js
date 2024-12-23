const User=require('../Models/userModel');

const isAdmin=async(req,res,next)=>{
    const user=await User.findById(req.user.userId);
    if(!user.role==='admin'){
        return res.status(401).json({message:'Unauthorized Access'})
    }
    next();
}

module.exports=isAdmin;