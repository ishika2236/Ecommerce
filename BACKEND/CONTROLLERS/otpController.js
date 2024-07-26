const otpGenerator = require('otp-generator');
const OTP = require('../Model/otp');
const User = require('../Model/user');
const bcrypt = require('bcrypt');

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.session.userData;
        console.log('Sending OTP to:', email);  // Debug log

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User is already registered.'
            });
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let result = await OTP.findOne({ otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };
        await OTP.create(otpPayload);
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });
    } catch (error) {
        console.log('Error in sendOTP:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        console.log('Verifying OTP:', req.body);  // Debug log
        console.log('Session data:', req.session.userData);  // Debug log

        const { otp } = req.body;
        const { name, email, password } = req.session.userData;
        if (!name || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: 'User data is missing. Please restart the registration process.',
            });
        }

        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }

        console.log("OTP is valid:", otp);

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error finalizing registration:', error);
        res.status(500).json({ error: 'An error occurred during final registration' });
    }
}
