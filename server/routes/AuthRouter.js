import express from 'express'
import path from'path';
import fs from'fs';

import { signup } from '../controller/authController.js';
import {signin} from '../controller/authController.js'

import {signout} from '../controller/authController.js'
;

const router=express.Router()






router.post('/signup',signup)
router.post('/signin',signin)
router.get('/signout',signout)



export default router;