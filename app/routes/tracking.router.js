import { Router } from "express";
import { addTrackingData, getTrackingData } from "#root/controllers/tracking.controller";

const trackingRouter = Router();

trackingRouter.post('/add', addTrackingData);
trackingRouter.get('/get', getTrackingData);

export default trackingRouter;