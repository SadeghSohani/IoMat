import { Router } from "express";
import {
    addPort, deleteUserPort, getPorts
} from "#root/controllers/userPorts.controller";

const userPortsRouter = Router();

userPortsRouter.post('/add', addPort);
userPortsRouter.get('/get', getPorts);
userPortsRouter.delete('/delete', deleteUserPort);

export default userPortsRouter;