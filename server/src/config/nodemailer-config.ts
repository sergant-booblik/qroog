import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.TIMEWEB_SMTP_HOST,
    port: Number(process.env.TIMEWEB_SMTP_PORT),
    auth: {
        user: process.env.TIMEWEB_SMTP_USER,
        pass: process.env.TIMEWEB_SMTP_PASS,
    },
    from: process.env.TIMEWEB_SMTP_FROM,
});

export default transporter;