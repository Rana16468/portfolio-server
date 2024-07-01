import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail=async(to:string,html:string)=>{

    //https://www.tiny.cloud/blog/react-rich-text-editor/
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com.",
        port: 587,
        secure: config.NODE_ENV==='production',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: config.user_email_address,
          pass: config.user_email_password,
        },
      });


      await transporter.sendMail({
        from: config.user_email_address, // sender address
        to, // list of receivers
        subject: "My Portfolio Contact", // Subject line
        text: "Some One Visit My Portfolio. And Contact Us", // plain text body
        html, // html body
      });


    
}