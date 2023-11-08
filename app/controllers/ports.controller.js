import Port from '#root/models/port.model';
import log from '#root/utils/logger';
import response from '#root/utils/response';
import dotenv from "dotenv";
import message from "#root/utils/responseMessages";

dotenv.config();
const secret = process.env.SECRET || 'thisIsMySecret';
const adminEmail = process.env.ADMIN_EMAIL;
const adminPass = process.env.ADMIN_PASS;

export function addPort(req, res) {
    Port.create({
        portSerial: req.body.portSerial,
        portName: req.body.portName,
        portType: req.body.portType,
        about: req.body.about,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }).then(port => {
        log.info("");
        res.json(response.success(message.successful, port));
    }).catch(err => {
        log.error(err);
        res.json(response.failure(500, message.failure, err));
    });
}

export function getPorts(req, res) {
    Port.findAll().then(ports => {

        log.info("");
        res.json(response.success(message.successful, ports.slice(req.query.offset, req.query.size)));


    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}

export function getPort(req, res) {
    Port.findAll(
        {
            where: {
                portId: req.query.portId,
            },
        }
    ).then(ports => {

        log.info("");
        res.json(response.success(message.successful, ports[0]));


    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}

export function getPortByName(req, res) {
    Port.findAll(
        {
            where: {
                portName: req.query.portName,
            },
        }
    ).then(ports => {

        log.info("");
        res.json(response.success(message.successful, ports.slice(req.query.offset, req.query.size)));


    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}

export function updatePort(req, res) {
    const portId = req.body.portId
    Port.findAll({
        where: {
            portId: portId,
        },
    }).then(ports => {

        const port = ports[0];

        let portSerial = port.portSerial;
        let portName = port.portName;
        let portType = port.portType;
        let about = port.about;
        let country = port.country;
        let latitude = port.latitude;
        let longitude = port.longitude;


        if (req.body.portSerial != null) {
            portSerial = req.body.portSerial;
        }
        if(req.body.portName != null) {
            portName = req.body.portName;
        }
        if(req.body.portType != null) {
            portType = req.body.portType;
        }
        if(req.body.about != null) {
            about = req.body.about;
        }
        if(req.body.country != null) {
            country = req.body.country;
        }
        if(req.body.latitude != null) {
            latitude = req.body.latitude;
        }
        if(req.body.longitude != null) {
            longitude = req.body.longitude;
        }

        let values = {
            portSerial: portSerial,
            portName: portName,
            portType: portType,
            about: about,
            country: country,
            latitude: latitude,
            longitude: longitude,
        };

        port.update(values).then( updatedRecord => {
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

export function deletePort(req, res) {

    log.info(req.email)
    log.info(adminEmail)
    if (req.email === adminEmail) {
        Port.destroy(
            {
                where: {
                    portId: req.query.portId,
                },
            }
        ).then(port => {

            log.info("");
            res.json(response.success(message.successful, port));

        }).catch(err => {
            log.error("");
            res.json(response.failure(500, message.failure, err));
        })
    } else {
        log.error("Permission denied.");
        res.json(response.failure(403, message.permissionDenied));
    }

}
