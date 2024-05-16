import express from 'express';
import   adminsignin, { adduser, adminSignout, deleteUser, getAllUser } from '../controller/adminController.js';
import { edituser } from '../controller/adminController.js';
import {verifyToken} from '../utils/verifyAdmin.js'


const router=express.Router();


router.post('/dashboard',adminsignin)
router.post('/dashboard/edituser/:id',verifyToken,edituser)
router.delete('/dashboard/delete/:id',deleteUser)
router.get('/dashboard/signout',adminSignout)
router.post('/dashboard/adduser',adduser)
router.get('/dashboard/getuser',getAllUser)
export default router;