import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.smtpPort,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user:process.env.smtpUsername,
      pass:process.env.smtpPassword,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
async function main(employerEmail,jobapplication) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.smtpUsername, // sender address
      to: employerEmail, // list of receivers
      subject: "hello from Huller", // Subject line
      text: jobapplication, // plain text body
      // html: , // html body
    });
}

export default main;
