import Vessel from '#root/models/vessel.model';
import log from '#root/utils/logger';
import response from '#root/utils/response';
import User from "#root/models/user.model";
import message from "#root/utils/responseMessages";

export function addVessel(req, res) {
    Vessel.create({
        ownerEmail: req.email,
        vesselSerial: req.body.vesselSerial,
        vesselName: req.body.vesselName,
        vesselType: req.body.vesselType,
        about: req.body.about,
        vesselSize: req.body.vesselSize,
        flag: req.body.flag,
        inTransit: req.body.inTransit
    }).then(vessel => {
        log.info("");
        res.json(response.success(message.successful, vessel));
    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    });
}

export function getVesselByOwner(req, res) {
    const vesselId = req.query.vesselId
    const ownerEmail = req.email
    log.debug(vesselId)
    Vessel.findAll({
        where: {
            vesselId: vesselId,
        },
    }).then(vessels => {

        if(vessels[0].ownerEmail === ownerEmail){
            log.info("");
            res.json(response.success(message.successful, vessels[0]));
        } else {
            log.error("");
            res.json(response.failure(403, message.permissionDenied, null));
        }


    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}

export function getAllVesselsByOwner(req, res) {
    const vesselId = req.query.vesselId
    const ownerEmail = req.email
    log.debug(vesselId)
    Vessel.findAll({
        where: {
            ownerEmail: ownerEmail,
        },
    }).then(vessels => {

        log.info("");
        res.json(response.success(message.successful, vessels.slice(req.query.offset, req.query.size)));


    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}

export function getVesselsInTransit(req, res) {
    const vesselId = req.query.vesselId
    log.debug(vesselId)
    Vessel.findAll({
        attributes: ['vesselSerial', 'vesselName', 'vesselType', 'about'],
        where: {
            inTransit: true,
        },
    }).then(vessels => {
        log.info("");
        res.json(response.success(message.successful, vessels.slice(req.query.offset, req.query.size)));
    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}

export function getVesselByName(req, res) {
    const vesselName = req.query.vesselName
    Vessel.findAll({
        where: {
            vesselName: vesselName,
        },
    }).then(vessels => {

        log.info("");
        res.json(response.success(message.successful, vessels.slice(req.query.offset, req.query.size)));


    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}

export function updateVessel(req, res) {
    const vesselId = req.body.vesselId
    Vessel.findAll({
        where: {
            vesselId: vesselId,
        },
    }).then(vessels => {

        const vessel = vessels[0];

        let vesselSerial = vessel.vesselSerial;
        let vesselName = vessel.vesselName;
        let vesselType = vessel.vesselType;
        let about = vessel.about;
        let size = vessel.size;
        let flag = vessel.flag;
        let inTransit = vessel.inTransit;


        if (req.body.vesselSerial != null) {
            vesselSerial = req.body.vesselSerial;
        }
        if(req.body.vesselName != null) {
            vesselName = req.body.vesselName;
        }
        if(req.body.vesselType != null) {
            vesselType = req.body.vesselType;
        }
        if(req.body.about != null) {
            about = req.body.about;
        }
        if(req.body.size != null) {
            size = req.body.size;
        }
        if(req.body.flag != null) {
            flag = req.body.flag;
        }
        if(req.body.vesselType != null) {
            inTransit = req.body.inTransit;
        }

        let values = {
            vesselSerial: vesselSerial,
            vesselName: vesselName,
            vesselType: vesselType,
            about: about,
            size: size,
            flag: flag,
            inTransit: inTransit,
        };

        vessel.update(values).then( updatedRecord => {
            res.json(response.success(message.successful, updatedRecord));
        }).catch(err => {
            log.error("");
            res.json(response.failure(500, message.failure, err));
        })

    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}

export function getVessels(req, res) {
    Vessel.findAll().then(vessels => {

        log.info("");
        res.json(response.success(message.successful, vessels.slice(req.query.offset, req.query.size)));


    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}

export function deleteVessel(req, res) {

    const id = req.query.id;

    Vessel.destroy(
        {
            where: {
                vesselId: id,
            },
        }
    ).then(vessel => {

        log.info("");
        res.json(response.success(message.successful, vessel));

    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}
