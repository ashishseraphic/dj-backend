const mongoose = require('mongoose');

const url = process.env.DATABASE_URL;

mongoose.set("strictQuery", true);
mongoose.connect(url,function(err,db){
    if(err){
        console.log('Database not Connect')
    }else{
        console.log('Database connect successfully')
    }
})