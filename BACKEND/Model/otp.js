const mongoose = require('mongoose');
const sendVerificationMail= require('../CONTROLLERS/otp')


const otp= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5
    }
});



otp.pre("save", function (next) {
    console.log("New document saved to database");
    if (this.isNew) {
        sendVerificationMail(this.email, this.otp).then(() => {
            next();
        }).catch(next);
    } else {
        next();
    }
});
const OTP= mongoose.model("OTP",otp);


module.exports=OTP;