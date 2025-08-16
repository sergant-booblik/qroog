import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    // auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    // },
    secure: false,
    ignoreTLS: true,
},
  {
      from: process.env.FROM_EMAIL,
  });

export default transporter;