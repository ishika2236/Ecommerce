const OTP=require('../Model/otp')
const User=require('../Model/user');
const bcrypt=require('bcrypt');
const session = require('express-session');
const jwt=require('jsonwebtoken')
const otpController=require('../CONTROLLERS/otpController')


const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phoneNumber, address, dateOfBirth, profilePicture } = req.body;  // Include additional fields here
        console.log(name, email, password, role, phoneNumber, address, dateOfBirth, profilePicture);

        if (!name || !email || !password || !phoneNumber || !address) {
            return res.status(403).json({
                success: false,
                message: "All fields are necessary",
            });
        }

        // Check existing user   
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        req.session.userData = { name, email, password, role, phoneNumber, address, dateOfBirth, profilePicture, isEmailVerified: false };

        console.log('Session data set:', req.session.userData);
        await otpController.sendOTP(req, res);

    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            res.status(401).json({message:'Invalid Username or password'});
            
        }
        const isPasswordValid=await bcrypt.compare(password,user.password );
            if(!isPasswordValid){
                res.status(401).json({error:'Invalid username or password'});
            }

            //generate a JWT TOKEN

            const token=jwt.sign({userId:user._id},'secretKey');
            req.session.userData = {  email:email, password:password,token:token };
            await otpController.sendOTP(req, res); 
            // res.status(200).json({token});

    }
    catch(error){
        console.log('error logging in ',error);
        res.status(500).json({error:'An error occured while logging in'});
    }

}
module.exports={
    registerUser,loginUser
}