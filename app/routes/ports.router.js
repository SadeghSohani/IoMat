import { Router } from "express";
import {
    addPort, deletePort, getPort, getPortByName, getPorts, updatePort
} from "#root/controllers/ports.controller";

const portsRouter = Router();

// portsRouter.post('/add', addPort);
portsRouter.get('/get', getPorts);
portsRouter.get('/get/id', getPort);
portsRouter.get('/get/name', getPortByName);
// portsRouter.delete('/delete', deletePort);

export default portsRouter;