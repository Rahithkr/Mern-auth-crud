import User from "../Models/user.model.js";

import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";




const signup=async(req,res, next)=>{
    const{username,email,password}=req.body;

    const hashPassword=bcryptjs.hashSync(password,10)

    const newUser=new User({username,email,password:hashPassword})
try {
    await newUser.save()
    res.status(201).json({message:"user create succesfully"})
    
} catch (error) {
    next(error)
}
}

const signin=async(req,res,next)=>{
    const{email,password}=req.body;
    try {
        const validUser=await User.findOne({email:email});
        if(!validUser) return next(errorHandler(404,'User not found'))
        const validPassword=bcryptjs.compareSync(password,validUser.password)
    if(!validPassword) return next(errorHandler(401,'Wrong Credentials'))
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
const {password:hashedPassword,...rest}=validUser._doc;
const expireyDate=new Date(Date.now() + 3600000)
res.cookie('access_token',token,{httpOnly:true ,expires:expireyDate}).status(200).json(rest)
navigate('/')
    } catch (error) {
        next(error)
    }
}



const signout=(req,res)=>{
    res.clearCookie('access_token').status(200).json('signout success')

}



const adminsignin = async (req, res, next) => {
    const AdminEmail = "admin@gmail.com";
    const AdminPassword = "123";
    const { email, password } = req.body;
  
    try {
      if (email === AdminEmail && password === AdminPassword) {
        // Replace this with appropriate data you want to send upon successful sign-in
        return res.status(200).json({ success: true, message: "Sign-in successful" });
      } else {
        // Return appropriate response when credentials are incorrect
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      // Handle any errors that occur during the sign-in process
      return next(error);
    }
  };
  





export{
    signup,signin,signout,adminsignin
}