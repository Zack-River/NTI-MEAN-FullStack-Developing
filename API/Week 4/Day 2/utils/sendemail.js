const nodemailer = require('nodemailer');

async function sendEmail(receiver , sub , msg) {
    try {
        const transporter = nodemailer.createTransport({ //mail client
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: receiver,
            subject: sub,
            html: msg
        });

    } catch(err) {
        console.error(err);
    }
}

async function customSMTP () {
    const transporter = nodemailer.createTransport({
        //host:,
        //port:,
    });
} 

module.exports = sendEmail;