const mongoose = require('mongoose');


const modelSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    password: {
        type: String,
    },
    // confirmPassword : {
    //     type: String,
    // },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    otp:{
        type:Number,
        // expires:'5m',
        //         index:true
    },
    selectedRole:{
        type:String,
        enum:['admin','dj'],
        default:'admin'
    },
    // verification:{
    //     type:Boolean,default:false
    // },
    phoneNumber:{
        type:String
    },
    userName :{
        type:String
    }
});


module.exports = mongoose.model('user', modelSchema)