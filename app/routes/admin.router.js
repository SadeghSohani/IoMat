import { Router } from 'express';
import {adminVerifyUser, getUnVerifiedUsers} from '#root/controllers/authentication.controller';

const adminRouter = Router();

adminRouter.post('/user/verify', adminVerifyUser);
adminRouter.get('/users/unVerified', getUnVerifiedUsers);

export default adminRouter;