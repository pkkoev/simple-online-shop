const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
    {
        products: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
        }
        ]
    ,
     address: {
        type: String,
        ref: 'User',
        required:true,
        minlength:[0,'Invalid address format']
    },
    user_email: {
        type: String,
        ref: 'User',
        required:true
    },
    totalQuantity:{
        type : Number,
        default: 0
    },
    totalPrice:{
        type: Number,
        required:true,
        default: 0,
    }
  }
)


const Order = mongoose.model("Order",OrderSchema);
//tuka moje da checkwame regex expressions -> https://regex101.com/
OrderSchema.path('user_email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'The e-mail field cannot be empty.');

module.exports = Order;