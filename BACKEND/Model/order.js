const express = require('express')
const mongoose = require('mongoose')

const orderSchema= new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'USER', required:true},
    items: [
        {
            product :{ type:mongoose.Schema.Types.ObjectId, ref: 'PRODUCT', required:true},
            quantity: {type:Number, required:true},
            price:{type:Number, required:true}
        }
    ],
    totalAmount:{type:Number, required:true},
    paymentStatus :{type:String, enum:['pending', 'completed', 'failed'], default:'pending'},
    createdAt: {type:Date, default: Date.now}
})

const ORDER= mongoose.model('ORDER',orderSchema);

module.exports= ORDER;