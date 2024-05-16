import express from "express";
import { test } from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser } from "../controller/userController.js";
const router=express.Router();


router.get('/',test )
router.post("/update/:id",verifyToken,updateUser)
   


export default router;