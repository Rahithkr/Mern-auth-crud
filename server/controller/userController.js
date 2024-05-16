import User from "../Models/user.model.js"
import { errorHandler } from "../utils/error.js"

 const test =(req,res)=>

{
    res.json({
        message:"apppi is working"
    })
}


const updateUser=async(req,res,next)=>{
if(req.user.id !== req.params.id){
    return next(errorHandler(401,"invalid user"))
}
try {
    console.log(req.body);
    console.log(req.params.id);
    if(req.body.password){
        console.log();
        req.body.password=bcryptjs.hashSync(req.body.password,10);
    }

    const updatedUser=await User.findByIdAndUpdate(req.params.id,
        {
       
        $set:{
            username:req.body.username,
            email:req.body.email,
            password: req.body.password,
            profilePicture:req.body.profilePicture,

        },
    },
    {new:true}
    );
    console.log("111",updateUser);
    const {password,...rest}=updatedUser._doc;
  return  res.status(200).json(rest);

} catch (error) {
    next(error)
    
}


}


export {
    test,updateUser,
}