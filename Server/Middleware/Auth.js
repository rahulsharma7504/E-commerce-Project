
const JWT=require('jsonwebtoken');

 const Secure=async(req,res,next)=>{
    try {
        const token=req.cookies.get('token');
        if(!token){
            res.status(401).send({message:'Token Not Found'})
        }else{
            const decode=JWT.verify(token,process.env.JWT_Secrate);
            req.user=decode;
            next();
        }
        
    } catch (error) {
        if(error){
            console.error(error);
            res.status(401).send({message:'Invalid Token'})
        }
        
    }
}
module.exports ={Secure}