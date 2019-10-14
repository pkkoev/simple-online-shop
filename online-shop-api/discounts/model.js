const mongoose = require("mongoose");


const DiscountSchema = new mongoose.Schema(
    {
        
     discountName: {
        type: String,
         required:[true,"Name is required"],
    },
    amount: {
        type: Number,
        required:true
    },
    max_uses:{
        type : Number,
        required:true
    },
    curr_uses:{
        type: Number,
        required:true,
        default: 0
    },
    starts_at: {
      type: Date,
      default: Date.now
    },
    expires_at:{
      type: Date
    }
  }
)


const Discount = mongoose.model("Discount",DiscountSchema);

module.exports = Discount;