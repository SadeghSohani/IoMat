import userPorts from '#root/models/userPorts.model';
import log from '#root/utils/logger';
import response from '#root/utils/response';
import Port from "#root/models/port.model";
import message from "#root/utils/responseMessages";

export function addPort(req, res) {
    userPorts.create({
        userEmail: req.email,
        portId: req.body.portId,
    }).then(port => {
        log.info("");
        res.json(response.success(message.successful, port));
    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    });
}

export function getPorts(req, res) {
    userPorts.findAll(
        {
            where: {
                userEmail: req.email,
            },
        }
    ).then(ports => {

        log.info("");
        res.json(response.success(message.successful, ports.slice(req.query.offset, req.query.size)));


    }).catch(err => {
        log.error(err);
        res.json(response.failure(500, message.failure, err));
    })
}

export function deleteUserPort(req, res) {

    userPorts.destroy(
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
}
