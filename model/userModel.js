const mongoose = require('mongoose');


const modelSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    password: {
        type: String,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    selectedRole:{
        type:String,
        enum:['admin','dj','user'],
        
    },
    phoneNumber:{
        type:String
    },
    userName :{
        type:String
    },
    firebaseUId:{
        type:String
    }

});


module.exports = mongoose.model('user', modelSchema)