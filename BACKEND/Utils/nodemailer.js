const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender=async(email,title,body)=>{
    try{
        // console.log("mail in utils: ",process.env.MAIL_USER,"password in utils: ",process.env.MAIL_PASS);
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            service: "gmail",
            secure: true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });
        //send email
        let info=await transporter.sendMail({
            to:email,
            subject:title,
            html:body,
        });
        console.log('Email info: ',info);

    }
    catch(error){
        console.log('error while sending mail ',error);


    }
} 
module.exports=mailSender;