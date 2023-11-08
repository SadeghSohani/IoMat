import { Router } from "express";
import {getVesselByName, getVessels} from "#root/controllers/vessels.controller";

const publicRouter = Router();

publicRouter.get('/vessel/name', getVesselByName);
publicRouter.get('/vessel/get/all', getVessels);


export default publicRouter;