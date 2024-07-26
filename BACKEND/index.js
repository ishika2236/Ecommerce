const express = require('express');
require('dotenv').config();
const userRoutes = require('./ROUTES/user');
const {authenticateUser,authorizeUser}=require('./MIDDLEWARES/user')
const jwt = require('jsonwebtoken');
const otpRoutes=require('./ROUTES/otp')



const app=express();
app.use(express.json());

const PORT=process.env.PORT;
app.use('/auth',userRoutes);
app.use('/otp',otpRoutes);


app.get('/',(req,res)=>{
    res.send('hello welcome to my ecom website');
})
app.get('/admin', authenticateUser, authorizeUser('admin'), (req, res) => {
    res.send('hello admin');
  });

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})
