const userDB=require('../Models/userModel');
const isUser=async(req,res,next)=>{
    const user = await userDB.findById(req.user.userId).select('-password');
    if(user.role==='user'){
        next();
    }else{
        res.status(401).json({ message: "UnAuthorize Access" });
    }
}
module.exports={isUser}