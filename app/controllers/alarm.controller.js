import Alarm from '#root/models/alarm.model';
import log from '#root/utils/logger';
import response from '#root/utils/response';
import dotenv from "dotenv";
import message from "#root/utils/responseMessages";
import User from "#root/models/user.model";

dotenv.config();
const secret = process.env.SECRET || 'thisIsMySecret';
const adminEmail = process.env.ADMIN_EMAIL;
const adminPass = process.env.ADMIN_PASS;

export function getAlarmsByUser(req, res) {

    if (req.email === req.query.email || req.email === adminEmail ) {
        Alarm.findAll(
            {
                where: {
                    ownerEmail: req.query.email,
                },
            }
        ).then(alarms => {

            log.info("");
            res.json(response.success(message.successful, alarms.slice(req.query.offset, req.query.size)));


        }).catch(err => {
            log.error(err);
            res.json(response.failure(500, message.failure, err));
        })
    } else {
        User.findOne({where: {email: req.email}}).then(user => {

            if(user.role === "EXPERT") {
                Alarm.findAll(
                    {
                        where: {
                            ownerEmail: req.query.email,
                        },
                    }
                ).then(alarms => {

                    log.info("");
                    res.json(response.success(message.successful, alarms.slice(req.query.offset, req.query.size)));

                }).catch(err => {
                    log.error(err);
                    res.json(response.failure(500, message.failure, err));
                })
            } else {
                res.json(response.failure(403, message.permissionDenied));
            }

        }).catch(err => {
            log.error(err);
            log.error(`user ${data.userEmail} not found in database in socket clientJoin.`)
            res.json(response.failure(500, message.failure, err));
        });
    }

}

export function getAllAlarms(req, res) {

    if (req.email === adminEmail ) {
        Alarm.findAll().then(alarms => {

            log.info("");
            res.json(response.success(message.successful, alarms.slice(req.query.offset, req.query.size)));


        }).catch(err => {
            log.error(err);
            res.json(response.failure(500, message.failure, err));
        })
    } else {
        User.findOne({where: {email: req.email}}).then(user => {

            if(user.role === "EXPERT") {
                Alarm.findAll().then(alarms => {

                    log.info("");
                    res.json(response.success(message.successful, alarms.slice(req.query.offset, req.query.size)));

                }).catch(err => {
                    log.error(err);
                    res.json(response.failure(500, message.failure, err));
                })
            } else {
                res.json(response.failure(403, message.permissionDenied));
            }

        }).catch(err => {
            log.error(err);
            log.error(`user ${data.userEmail} not found in database in socket clientJoin.`)
            res.json(response.failure(500, message.failure, err));
        });
    }


}
