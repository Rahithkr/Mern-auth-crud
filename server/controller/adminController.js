import { json } from "express";
import User from "../Models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


 const adminsigin=async(req,res)=>{
    try {
        if(req.body.email===process.env.ADMIN_EMAIL && req.body.password===process.env.ADMIN_PASSWORD){
            const userDetail=await User.find();
            console.log(userDetail);
            const token=jwt.sign({email:process.env.ADMIN_EMAIL},process.env.JWT_SECRET)
            const expireyDate=new Date(Date.now() + 3600000)
            res.cookie('admin_token',token,{httpOnly:true,expires:expireyDate}).status(200).json({success:true,message:'LOging  Success',userDetail})
        }
        
    } catch (error) {
        console.log(error);
    }
 
}


export const edituser = async (req, res) => {
    console.log("inside")
    try {
        const userId = req.params.id;
        const { username, password, email } = req.body;

        console.log(req.body);
        if(password){

            req.body.password = bcryptjs.hashSync(password,10)
        }
        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    username,
                    email,
                    password:req.body.password
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { password: hashedPassword, ...rest } = updatedUser._doc;
        return res.status(200).json({ success: true, user: rest });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export const deleteUser = async(req, res)=>{
    try{
        const userId = req.params.id;
        const userDetails = await User.findByIdAndDelete({_id:userId});
        if (!userDetails) {
            return res
              .status(404)
              .json({ success: false, message: "user deleted successfully" });
          }
          console.log("user deleted")
          res
            .status(200)
            .json({ success: true, message: "user deleted successfully" });
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}






export const adduser=async(req,res, next)=>{
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
export const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find()
        console.log("All users:", allUser);
         res.status(201).json(allUser);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// export const edituser=async(req,res)=>{
// try {
//     const userId=req.params.id;
//      const userDetail=await User.findOne({_id:userId});
//      console.log('userdstails',userDetail);
//      const {username,password,email}=req.body;
//      console.log(req.body);
//      if(password){
//         req.body.password=bcryptjs.hashSync(password,10)
//      }
//      const updateduser= await User.findByIdAndUpdate(userId,{$set:{
//         username,
//         email,
//         password:req.body.password,
//      }},
//      {new:true},
//      )
//      console.log('updatesduser',updateduser);
//      const {password:hashedpassword,...rest}=updateduser._doc;
//      res.status(200).json({success:true,user:rest})
// } catch (error) {
//     console.log(error);
// }
// }

export const adminSignout=(req,res)=>{
    res.clearCookie('access_token').status(200).json('signout success')

}

export default adminsigin

