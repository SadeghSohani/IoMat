import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import log from '#root/utils/logger';
import dotenv from "dotenv";
import response from "#root/utils/response";

dotenv.config();
const secret = process.env.SECRET || 'thisIsMySecret';
const email = process.env.EMAIL
const email_pass = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: email, // Use .env for this.
            pass: email_pass    // Use .env for this.
        }
    }
);

function getToken(userEmail) {
    return jwt.sign(
        {
            email: userEmail
        },
        secret,
        { expiresIn: '10m' }
    );
}

function getMailConfigurations(userEmail) {
    return {
        // It should be a string of sender/server email
        from: email,

        to: userEmail,

        // Subject of Email
        subject: 'Email Verification',

        // This would be the text of email body
        text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://127.0.0.1:4041/auth/verify/${getToken(userEmail)} 
           Thanks`
    }
}

export function sendEmail(userEmail) {
    const mailConfigurations = getMailConfigurations(userEmail)
    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) {
            log.debug('Email does not sent successfully.');
            log.error(error)
            return error
        }
        log.debug('Email sent successfully.');
        log.debug(info);
        return null
    });
    return null
}

export async function verifyJWT(token) {
    let email = "";
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            log.debug(`Email verification failed for user ${decoded.email}`)
            log.info(err);
            throw err
        } else {
            log.debug(`Email verification successful for user ${decoded.email}`)
            email = decoded.email
        }
    });
    return email

}

