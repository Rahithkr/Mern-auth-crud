import  Jwt  from "jsonwebtoken";
import { errorHandler } from "./error.js";


export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;

    if(!token) return next(errorHandler(401,"You need to login"))

    Jwt.verify(token,process.env.JWT_SECRET,(err,admin)=>{
        if(err) return next(errorHandler(403,"Token is not valid"))

        req.admin=admin;
        next();
    })
}