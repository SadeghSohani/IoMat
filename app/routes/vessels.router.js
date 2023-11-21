import { Router } from "express";
import {
    addVessel,
    getVesselByOwner,
    getVesselsInTransit,
    getAllVesselsByOwner,
    updateVessel, deleteVessel
} from "#root/controllers/vessels.controller";

const vesselsRouter = Router();

vesselsRouter.post('/add', addVessel);
vesselsRouter.get('/get', getVesselByOwner);
vesselsRouter.get('/get/all', getAllVesselsByOwner);
vesselsRouter.put('/update', updateVessel);
vesselsRouter.delete('/delete', deleteVessel);

export default vesselsRouter;