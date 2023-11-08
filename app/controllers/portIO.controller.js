import PortIO from '#root/models/portIO.model';
import log from '#root/utils/logger';
import response from '#root/utils/response';
import dotenv from "dotenv";
import message from "#root/utils/responseMessages";

dotenv.config();
const secret = process.env.SECRET || 'thisIsMySecret';
const adminEmail = process.env.ADMIN_EMAIL;
const adminPass = process.env.ADMIN_PASS;

export function addPortIO(req, res) {
    PortIO.create({
        portId: req.body.portId,
        vesselId: req.body.vesselId
    }).then(portIO => {
        log.info("");
        res.json(response.success(message.successful, portIO));
    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    });
}

export function getPortIO(req, res) {
    const portId = req.query.portId
    PortIO.findAll({
        where: {
            portId: portId,
        },
    }).then(io => {

        log.info("");
        res.json(response.success(message.successful, io.slice(req.query.offset, req.query.size)));


    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}
