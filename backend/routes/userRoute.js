import express, { Router } from 'express'
import { register,login,logout, getOtherUsers } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js'
const router=express.Router();
router.post('/register', register);
router.post('/login',login)
router.get('/logout',logout);
router.get('/',isAuthenticated,  getOtherUsers);

export default router;