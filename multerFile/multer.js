const multer = require ('multer');
const path  = require('path');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        // console.log(file)
        cb(null,'uploads')
    },

    filename:function(req,file,cb){
        // console.log(file)
        cb(null,file.fieldname+'-'+ Date.now()+'-'+ file.originalname)
    }
})
    const upload = multer({storage:storage})

    module.exports = {upload:upload}