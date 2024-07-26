const OTP=require('../Model/otp')
const User=require('../Model/user');
const bcrypt=require('bcrypt');
const session = require('express-session');
const otpController=require('../CONTROLLERS/otpController')


const registerUser=async(req,res)=>{
    try{
        const { name, email, password} = req.body;
        console.log(name,email,password);
        let role = 'user';  // Default role
        if(!name|| !email || !password ){
            res.status(403).json({
                success:false,
                message:"All fields are necessary",
            });
        }
        


        //check existing user   
        const existinguser=await User.findOne({email});
        if(existinguser){
            return res.status(400).json({error:'email is already registered'});
        }
        req.session.userData = { name:name, email:email, password:password };

        console.log('Session data set:', req.session.userData); 
        await otpController.sendOTP(req, res); 
       
    }catch(error){
        console.error('Error registering user',error);
        res.status(500).json({error:'An error occured while registering the user'});    
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
            res.status(200).json({token});

    }
    catch(error){
        console.log('error logging in ',error);
        res.status(500).json({error:'An error occured while logging in'});
    }

}
module.exports={
    registerUser,loginUser
}