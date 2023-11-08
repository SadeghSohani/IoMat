import { Router } from "express";
import {
    addPortIO, getPortIO
} from "#root/controllers/portIO.controller";

const portIORouter = Router();

portIORouter.post('/add', addPortIO);
portIORouter.get('/get', getPortIO);

export default portIORouter;