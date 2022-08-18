const jwt = require('jsonwebtoken');
const JWT_KEY = 'fxsyr867vjguytu8oubbcuu';

function protectRoute(req,res,next) {
    if(req.cookies.login){
        let isVerified = jwt.verify(req.cookies.login,JWT_KEY);
        if(isVerified){
            next();
        }else{
            return res.json({
                message: 'User Invalid'
            })
        }
    }else{
        res.json({
            message: "Operation not allowed"
        });
    }
}

module.exports = protectRoute;