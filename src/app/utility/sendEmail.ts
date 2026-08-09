// import nodemailer from 'nodemailer';
// import config from '../config';

// export const sendEmail=async(to:string,html:string)=>{

//     //https://www.tiny.cloud/blog/react-rich-text-editor/
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com.",
//         port: 587,
//         secure: config.NODE_ENV==='production',
//         auth: {
//           // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//           user: config.user_email_address,
//           pass: config.user_email_password,
//         },
//       });


//       await transporter.sendMail({
//         from: config.user_email_address, // sender address
//         to, // list of receivers
//         subject: "My Portfolio Contact", // Subject line
//         text: "Some One Visit My Portfolio. And Contact Us", // plain text body
//         html, // html body
//       });


    
// }

import { Resend } from 'resend';
import config from '../config';

const resend = new Resend(config.user_email_password); // Use your Resend API key here

export const sendEmail = async (to: string, html: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev', // Use 'onboarding@resend.dev' for testing, or your custom domain email (e.g., 'contact@yourdomain.com')
    to: [to],
    subject: "My Portfolio Contact",
    text: "Some One Visit My Portfolio. And Contact Us",
    html,
  });
};