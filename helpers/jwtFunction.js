const jwt = require('jsonwebtoken');
const jwtConfig = process.env.JWT_CONFIG;

const verifyToken = function(req,res,next){
    const token = req.body.token||req.query.token||req.headers['authorization']
    if (!token){
        return res.json({
            success: false,
            messege:'Token Required'
        });
    };
    try{
        const decode = jwt.verify(token,jwtConfig)
        req.user = decode 
        return next()
    }catch(err){
        return res.json({
            success: false,
            massage:'Invalid Token'
        });
    };
};

module.exports = verifyToken;


