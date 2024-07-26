const express = require('express');
const otpController=require('../CONTROLLERS/otpController');

const router=express.Router();

router.get('/send-otp',otpController.sendOTP);
router.post('/verify-otp',otpController.verifyOTP);
router.get('/verify-otp',(req,res)=>{
    res.send("otp");
});


module.exports = router;