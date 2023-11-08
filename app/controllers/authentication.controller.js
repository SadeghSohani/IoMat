import User from '#root/models/user.model';
import log from '#root/utils/logger';
import jwt from 'jsonwebtoken';
import app from '#root/app';
import response from '#root/utils/response';
import dotenv from "dotenv";
import {sendEmail, verifyJWT} from "#root/utils/email_verification";
import message from "#root/utils/responseMessages";

dotenv.config();
const secret = process.env.SECRET || 'thisIsMySecret';
const adminEmail = process.env.ADMIN_EMAIL;
const adminPass = process.env.ADMIN_PASS;

export async function registerUser(req,res) {

    const email = req.body.email;

    User.findOne({where: {email: email}}).then(user => {

        if (user == null) {
            User.create({
                email: email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                legal: req.body.legal,
                companyName: req.body.companyName,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                verified: false
            }).then(user => {
                res.json(response.success(message.successful, user));
            }).catch(err => {
                res.json(response.failure(500, message.failure, err));
            });
        } else {
            log.info("This email is already registered.");
            res.json(response.failure(409, message.alreadyRegistered, null));
        }

    }).catch(err => {
            log.error(err);
            res.json(response.failure(500, message.failure, err));
    });

}

export function loginUser(req,res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email === adminEmail && password === adminPass) {

        const expireTime = 36000;
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + parseInt(expireTime),
            email: email
        }, app.get('secret'));
        log.debug(`user login successfully with email: ${email}`);
        res.json(response.success(message.successful, {token: token}));

    } else {
        User.findOne({where: {email: email}}).then(user => {

            if (user.password === password && user.verified) {
                const expireTime = 36000;
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + parseInt(expireTime),
                    email: email
                }, app.get('secret'));
                log.debug(`user login successfully with email: ${email}`);
                res.json(response.success(message.successful, {token: token}));
            } else if (user.password === password && !user.verified) {
                log.warn(`user not login successfully with email: ${email}, email verification needed.`);
                res.json(response.failure(401, message.failure, message.emailVerificationNeeded));
            } else {
                log.warn(`user not login successfully with email: ${email}, invalid email or password.`);
                res.json(response.failure(401, message.failure, message.emailInvalid));
            }

        })
            .catch(err => {
                log.error(err);
                res.json(response.failure(401, message.userNotFound, err));
            });
    }

}

export function sendVerificationEmail(req, res) {
    const {email} = req.params;
    const err = sendEmail(email)
    if (err) {
        res.json(response.failure(
            500,
            "Email does not sent successfully.",
            err
        ))
    }
    res.json(response.success(
        "Email sent successfully. please check your email and click on sent link.",
        {}
    ))
}

export function verifyEmail(req,res) {
    const {token} = req.params;

    verifyJWT(token).then(email => {
        User.findOne({where: {email: email}}).then(user => {

            return user.update({verified: true})

        })
            .then(user => {
                log.debug(`update 'verified' feature for user ${user.email} successful.`);
                res.send("Email verified successfully");
            })
            .catch(err => {
                log.error(`update 'verified' feature for user ${email} failed. ${err}`);
                res.send("Email verification failed, possibly the link is invalid or expired");
            });

    }).catch(
        err => {
            log.error(`Email verification failed. ${err}`)
            res.send("Email verification failed, possibly the link is invalid or expired");
        }
    )

}

export function adminVerifyUser(req,res) {
    const role = req.body.userRole;
    const userEmail = req.body.userEmail;
    const email = req.email

    if (email === adminEmail) {
        User.findOne({where: {email: userEmail}}).then(user => {

            return user.update({verified: true, role: role})

        }).then(user => {
            log.debug(`update 'verified' feature for user ${userEmail} successful.`);
            res.send(message.successful);
        }).catch(err => {
            log.error(`update 'verified' feature for user ${userEmail} failed. ${err}`);
            res.send(message.failure);
        });
    } else {
        log.error(`Permission denied.`);
        res.send(message.permissionDenied);
    }

}

export function getUnVerifiedUsers(req,res) {
    const email = req.email

    if (email === adminEmail) {

        User.findAll({
            where: {
                verified: false,
            },
        }).then(users => {
            log.info("");
            res.json(response.success(message.successful, users.slice(req.query.offset, req.query.size)));
        }).catch(err => {
            log.error("");
            res.json(response.failure(500, message.failure, err));
        })

    } else {
        log.error(`Permission denied.`);
        res.send(message.permissionDenied);
    }

}