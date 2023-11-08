import { Router } from 'express';
import {
    deleteUser,
    getMe
} from "#root/controllers/users.controller";

const userRouter = Router();

userRouter.get('/getMe', getMe);
userRouter.delete('/delete', deleteUser);

export default userRouter;