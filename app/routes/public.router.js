import { Router } from "express";
import {getVesselByName, getVessels, getVesselsInTransit} from "#root/controllers/vessels.controller";
import vesselsRouter from "#root/routes/vessels.router";

const publicRouter = Router();

publicRouter.get('/vessel/name', getVesselByName);
publicRouter.get('/vessel/get/all', getVessels);
publicRouter.get('/vessel/get/transit/all', getVesselsInTransit);



export default publicRouter;