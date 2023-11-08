import { Router } from "express";
import {
    addPort, deletePort, getPort, getPortByName, getPorts, updatePort
} from "#root/controllers/ports.controller";
import portsRouter from "#root/routes/ports.router";

const portAdminRouter = Router();

portAdminRouter.post('/add', addPort);
portAdminRouter.delete('/delete', deletePort);
portAdminRouter.put('/update', updatePort);
export default portAdminRouter;