import express from 'express'
import { register, login, logout, sendVerifyOtp, verifiedEmail } from '../Controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-Verify-Otp', userAuth, sendVerifyOtp);
authRouter.post('/Verify-account', userAuth, verifiedEmail);

export default authRouter;