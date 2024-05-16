import express  from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import userRoutes from "../server/routes/userRouter.js"
import authRoutes from '../server/routes/AuthRouter.js'
import path from 'path';
import cors from 'cors'
import cookieParser from "cookie-parser";
import AdminRoutes from '../server/routes/AdminRouter.js'
const __dirname = path.dirname(new URL(import.meta.url).pathname);





mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("database connected");
}).catch((err)=>{
console.log(err)
})

const app=express();


app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.json())

app.listen(3000,()=>{
    console.log("server started succesfully on port 3000")
});


app.use('/server/user',userRoutes)
app.use('/server/auth',authRoutes)
app.use('/server/admin',AdminRoutes)


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message ||'internal server error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
});