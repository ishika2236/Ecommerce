    const express = require('express');
    const User = require('../Model/user');
    const router=express.Router();
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const {registerUser,loginUser}=require('../CONTROLLERS/auth')
    

    router.post('/register',registerUser);
    router.post('/login',loginUser)


    module.exports = router;


