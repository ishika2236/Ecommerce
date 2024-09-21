const mongoose = require('mongoose')

const CartSchema=new mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId, ref:'USER', required:true
        },
        items:[
            {
                product:
                {
                    type:mongoose.Schema.Types.ObjectId, ref: 'PRODUCT', required:true,
                    
                },
                quantity: {type: Number, required: true, default: 1}
            }
        ],
        createdAt:{ type:Date, default:Date.now}
    }

)

const CART= mongoose.model( 'CART',CartSchema);

module.exports=CART;