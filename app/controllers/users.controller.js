import User from '#root/models/user.model';
import log from '#root/utils/logger';
import response from '#root/utils/response';
import dotenv from "dotenv";
import userPorts from "#root/models/userPorts.model";
import message from "#root/utils/responseMessages";

dotenv.config();
const secret = process.env.SECRET || 'thisIsMySecret';

export async function getMe(req,res) {

    const email = req.email;

    User.findOne({where: {email: email}}).then(user => {

        res.json(response.success(message.successful, user));

    }).catch(err => {
            log.error(err);
            res.json(response.failure(500, message.failure, err));
    });
    
}

export function deleteUser(req, res) {

    const id = req.query.id;

    User.destroy(
        {
            where: {
                userId: id,
            },
        }
    ).then(user => {

        log.info("");
        res.json(response.success(message.successful, user));

    }).catch(err => {
        log.error("");
        res.json(response.failure(500, message.failure, err));
    })
}
