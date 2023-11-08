import { Router } from 'express';
import { registerUser, loginUser, verifyEmail, sendVerificationEmail, adminVerifyUser } from '#root/controllers/authentication.controller';

const authRouter = Router();

authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);
authRouter.post('/admin/verify/user', adminVerifyUser);
authRouter.get('/verify/email/send/:email', sendVerificationEmail);
authRouter.get('/verify/:token', verifyEmail);

export default authRouter;