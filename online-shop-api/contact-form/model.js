const mongoose = require("mongoose");


const ContactFormSchema = new mongoose.Schema(
    {
    
     name: {
        type: String,
        required:true,
        minlength:[0,'Please insert your name']
    },
    email: {
        type: String,
        required:true
    },
    subject:{
        type : String,
        required:true
    },
    message:{
        type: String,
        required:true,
    }
  }
)


const ContactForm = mongoose.model("ContactForm",ContactFormSchema);
//tuka moje da checkwame regex expressions -> https://regex101.com/
ContactFormSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'The e-mail field cannot be empty.');

module.exports = ContactForm;