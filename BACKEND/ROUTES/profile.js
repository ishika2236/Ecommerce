const express = require('express');
const router= express.Router();
const {getProfile} = require('../CONTROLLERS/profile')
const {authenticateUser,authorizeUser} = require('../MIDDLEWARES/user')



router.get('/',authenticateUser,getProfile);

module.exports=router;