const OTP=require('../Model/otp')
const User=require('../Model/user');
const bcrypt=require('bcrypt');
const registerUser=async(req,res)=>{
    try{
        const { name, email, password, role: userRole,otp} = req.body;
        let role = 'user';  // Default role
        if(!name|| !email || !password || !otp){
            res.status(403).json({
                success:false,
                message:"All fields are necessary",
            });
        }
        // Check role in the request body
        if (userRole === 'admin') {
            role = 'admin';
        }


        //check existing user   
        const existinguser=await User.findOne({email});
        if(existinguser){
            return res.status(400).json({error:'email is already registered'});
        }
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
        return res.status(400).json({
            success: false,
            message: 'The OTP is not valid',
        });
        }

        //create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser= new User({name:name,email:email,password:hashedPassword,role});
        await newUser.save();
        res.status(201).json({message:'User registered Successfully'});
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