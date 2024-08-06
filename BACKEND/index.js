const express = require('express');
require('dotenv').config();
const userRoutes = require('./ROUTES/user');
const {authenticateUser,authorizeUser}=require('./MIDDLEWARES/user')
const jwt = require('jsonwebtoken');
const otpRoutes=require('./ROUTES/otp')
const session=require('express-session');
const cors=require('cors');
const productRoutes= require('./ROUTES/product');



const PORT=process.env.PORT;



const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Helps mitigate XSS attacks
        sameSite: 'lax' // or 'strict' depending on your needs
    }
}));

app.use(express.json());
app.use('/auth',userRoutes);
app.use('/otp',otpRoutes);
app.use('/product',productRoutes);



app.get('/',(req,res)=>{
    res.send('hello welcome to my ecom website');
})
app.get('/admin', authenticateUser, authorizeUser('admin'), (req, res) => {
    res.send('hello admin');
  });

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})
