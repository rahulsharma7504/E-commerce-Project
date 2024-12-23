const User=require('../Models/userModel');

const isvendor=async(req,res,next)=>{
    const user=await User.findById(req.user.userId);
    if(!user.role==='vendor'){
        return res.status(401).json({message:'Unauthorized Access'})
    }
    next();
}

module.exports=isvendor;