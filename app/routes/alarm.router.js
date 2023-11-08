import { Router } from "express";

import {getAlarmsByUser, getAllAlarms} from "#root/controllers/alarm.controller";

const alarmRouter = Router();

alarmRouter.get('/get', getAlarmsByUser);
alarmRouter.get('/get/all', getAllAlarms);

export default alarmRouter;