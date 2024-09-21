import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All field are required " });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist please login" });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const prabhuJiProfilePhoto=`https://avatar.iran.liara.run/public/boy?username=${username}`
    const mataJiProfilePhoto=`https://avatar.iran.liara.run/public/girl?username=${username}`
    await User.create({
      username,
      gender,
      profilePhoto:gender==='male'?prabhuJiProfilePhoto:mataJiProfilePhoto,
      password: hasedPassword,
      fullName,
    });
    return res.status(200).json({message:"Account created Successfully",success:true})
  } catch (err) {
    console.log("error in registering", err);
  }
};
export const login=async (req,res)=>{
    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({message:'All field are required '})
        }
        const user=await User.findOne({username})
        if(!user){
            return res.status(400).json({
                message:'incorrect Username or Password',
                success:false,
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:'incorrect Username or Password',
                success:false,
            })

        }
        const tokenData={
            userId:user._id
        }
        const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
        return res.status(200).cookie('token',token,{maxAge:1*24*60*60*1000,httpOnly:true ,secure: true,sameSite: 'None',}).json({
            _id:user._id,
            username:user.username,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto
        })

    }
    catch(err){
        console.log('error in login',err);
    }
}
export const logout=async (req,res)=>{
    try{
        return res.status(200).cookie('token',"",{maxAge:0}).json({
            message:'Logged Out Successfully'
        })

    }catch(err){
        console.log('error in logout',err)
    }
}
export const getOtherUsers=async (req,res)=>{
    try{
        const loggedUserId=req.id;
        const otherUsers=await User.find({_id:{$ne:loggedUserId}}).select("-password")
        return res.status(200).json(otherUsers);

    }
    catch(err){
        console.log('error in get otherUsers',err)
    }
}