import dotenv from 'dotenv';
import log from '#root/utils/logger';
import express from "express";
import bodyParser from 'body-parser';
import { expressjwt as expressJWT } from 'express-jwt';
import jwt from 'jsonwebtoken';
import bearerToken from 'express-bearer-token';
import cors from 'cors';
import util from 'util';
import authRouter from '#root/routes/authentication.router';
import response from '#root/utils/response';
import trackingRouter from "#root/routes/tracking.router";
import vesselsRouter from "#root/routes/vessels.router";
import portsRouter from "#root/routes/ports.router";
import userPortsRouter from "#root/routes/userPorts.router";
import publicRouter from "#root/routes/public.router";
import userRouter from "#root/routes/users.router";
import adminRouter from "#root/routes/admin.router";
import portIORouter from "#root/routes/portIO.router";
import portAdminRouter from "#root/routes/portAdmin.router";
import alarmRouter from "#root/routes/alarm.router";

dotenv.config();
const secret = process.env.SECRET || 'thisIsMySecret';
const app = express(); 

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('secret', secret);
app.use(expressJWT({ 
    secret: secret, 
    algorithms: ['HS256']
}).unless({path: [/^\/auth\/.*/, /^\/tracking\/.*/, /^\/port\/.*/, /^\/public\/.*/, /^\/portIO\/.*/]}));
app.use(bearerToken());
app.use((req, res, next) => {
    log.debug(`New req for ${req.originalUrl}`);
    if (
            req.originalUrl.indexOf('/auth') >= 0 ||
            req.originalUrl.indexOf('/tracking') >= 0 ||
            req.originalUrl.indexOf('/port') >= 0 ||
            req.originalUrl.indexOf('/public') >= 0 ||
            req.originalUrl.indexOf('/portIO') >= 0
        ) {
        return next();
    }
    const token = req.token;
    // app.get(secret)
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            log.error(err);
            res.json(response.failure(
                403,
                "Jwt Authentication failed.",
                'Failed to authenticate token. Make sure to include the ' +
                'token returned from /auth call in the authorization header ' +
                'as a Bearer token'
            ));

        } else {
            req.email = decoded.email;
            log.debug(util.format('Decoded from JWT token: username(email) - %s.', decoded.email));
            return next();
        }
    });
});
app.use('/auth', authRouter);
app.use('/tracking', trackingRouter);
app.use('/vessel', vesselsRouter);
app.use('/port', portsRouter);
app.use('/userPorts', userPortsRouter);
app.use('/public', publicRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/portIO', portIORouter);
app.use('/adminPort', portAdminRouter);
app.use('/alarm', alarmRouter);

export default app;
