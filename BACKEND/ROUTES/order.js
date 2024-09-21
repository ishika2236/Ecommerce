const express =  require('express')
const {createOrder} =  require('../CONTROLLERS/order')


const router= express.Router();

router.post('/create-order',createOrder);

module.exports =  router;
