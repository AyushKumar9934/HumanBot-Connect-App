
import jwt from 'jsonwebtoken'
const isAuthenticated=async (req,res,next)=>{
    try{
        console.log('Request Cookies:', req.cookies); // Check if cookies exist
        const token=req.cookies.token;
        console.log('Token:', token);
        if(!token){
          
            return res.status(401).json({message:"User not authenticated ."})
        }
        const decode=await jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(401).json({message:"invalid token"})
        }
         req.id=decode.userId // decode will return same data which we are encoding through jwt 
         next();

    }
    catch(err){

        console.log('error in authentication',err);
    }
}
export default isAuthenticated;