import dotenv from 'dotenv';
import app from '#root/app';
import http from 'http';
import log from '#root/utils/logger';

dotenv.config();
const port = process.env.PORT || 3001;
const host = process.env.HOST || '127.0.0.1';

const server = http.createServer(app).listen(port, function () {
    log.info('****************** SERVER STARTED ************************');
    log.info(`***************  http://${host}:${port}  ******************`);
});
server.timeout = 240000;



// ========================================== alarm service ==============================================

import { Server as ioServer } from "socket.io";
import Vessel from "#root/models/vessel.model";
import Alarm from "#root/models/alarm.model";
import User from "#root/models/user.model";

const socketIO = new ioServer(server);
// let userToSocket = new Map();
// let socketToUser = new Map();

socketIO.sockets.on('connection', function(socket) {

    log.info(`Client connected [id=${socket.id}]`);

    socket.on('clientJoin', function(data) {
        log.info(`client ${data.userEmail} joined.`)

        User.findOne({where: {email: data.userEmail}}).then(user => {

            if(user.role === "EXPERT") {
                // Join the client to EXPERTS room.
                socket.join('EXPERTS');
            } else {
                socket.join(user.email)
                // userToSocket.set(data.userEmail, socket.id)
                // socketToUser.set(socket.id, data.userEmail)
            }

        }).catch(err => {
            log.error(err);
            log.error(`user ${data.userEmail} not found in database in socket clientJoin.`)
        });

    });

    socket.on('newAlarm', function(data) {

        socket.broadcast.to('EXPERTS').emit('alarm', data);
        log.info(`New alarm received: ${data}.`)

        Vessel.findOne({
            where: {
                vesselId: data.vesselId,
            },
        }).then(vessel => {

            log.info(vessel);
            log.info(vessel.ownerEmail);
            // log.info(userToSocket[vessel.ownerEmail]);
            // log.info(userToSocket);
            // socket.to(userToSocket[vessel.ownerEmail]).emit('alarm', data)
            socket.broadcast.to(vessel.ownerEmail).emit('alarm', data);


            Alarm.create({
                ownerEmail: vessel.ownerEmail,
                vesselId: data.vesselId,
                message: data.message,
                timestamp: data.timestamp
            }).then(alarm => {
                log.info(`new alarm recorded in server => ${alarm}`);
            }).catch(err => {
                log.error(err);
            });


        }).catch(err => {
            log.error(err);
        })


    });

    socket.on("disconnect", () => {
        log.info(`Client gone [id=${socket.id}]`);
        // userToSocket.delete(socketToUser[socket.id])
        // socketToUser.delete( socket.id )
    });

});