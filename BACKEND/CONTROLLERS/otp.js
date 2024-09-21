const mailSender=require('../Utils/nodemailer')

const sendVerificationMail=async(email,otp)=>{
    try {
        const mailResponse= await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your otp
            <p>Here is your otp ${otp}</p>`
        );
        console.log("Email sent successfully ", mailResponse);

    } catch (error) {
        console.log("Error occured while sending mail ",error);
        
    }
}
module.exports=sendVerificationMail;