import Tracking from '#root/models/tracking.model';
import log from '#root/utils/logger';
import response from '#root/utils/response';
import message from "#root/utils/responseMessages";
import User from "#root/models/user.model";
import Vessel from "#root/models/vessel.model";

export function addTrackingData(req, res) {
    Tracking.create({
        vesselId: req.body.vesselId,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        status: req.body.status,
        accuracy: req.body.accuracy,
        GpsStatus: req.body.GpsStatus,
        batteryStatus: req.body.batteryStatus,
        speed: req.body.speed,
        originPort: req.body.originPort,
        destinationPort: req.body.destinationPort
    }).then(tracking => {

        Vessel.findOne({where: {vesselId: req.body.vesselId}}).then(vessel => {

            return vessel.update({
                lastLatitude: req.body.latitude,
                lastLongitude: req.body.longitude,
                originPort: req.body.originPort,
                destinationPort: req.body.destinationPort
            })

        }).then(vessel => {
            log.info("");
            res.json(response.success(message.successful, tracking));
        }).catch(err => {
            log.error(`update vessel failed in add tracking data. ${err}`);
            res.send(message.failure);
        });

    }).catch(err => {
        log.error(`adding tracking data failed. ${err}`);
        res.json(response.failure(500, message.failure, err));
    });
}

export function getTrackingData(req, res) {
    const vesselId = req.query.vesselId
    log.debug(vesselId)
    Tracking.findAll({
        where: {
            vesselId: vesselId,
        },
    }).then(tracking => {
        log.info("");
        res.json(response.success(message.successful, tracking.slice(req.query.offset, req.query.size)));
    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}