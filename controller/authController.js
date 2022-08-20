const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'fxsyr867vjguytu8oubbcuu';
const bcrypt = require('bcrypt');

// module.exports.getSignUp = function getSignUp(req,res) {
//     res.sendFile("/public/index.html",{root:__dirname});
// }

module.exports.signUp = async function signUp(req,res) {
    try{
        let datObj = req.body;
        let user = await userModel.create(datObj);
        if(user){
           return res.json({
                message:"User Signed Up",
                data:user
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.loginUser = async function loginUser(req,res) {
    try{
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email:data.email});
            console.log(user);
            if(user){
                let matchPass = await bcrypt.compare(data.password,user.password);
                console.log('passmatch',matchPass);
                if(matchPass){
                    let uid = user['_id'];
                    let token = jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token,{httpOnly:true});
                    //res.cookie('isLoggedIn',true);
                    return res.json({
                        message: "User logged in",
                        data: data
                    });
                }else{
                    return res.json({
                        message: "Password not matching please try again",
                        data: data
                    });
                }
            }else{
                return res.json({
                    message:"user not found"
                })
            }
        }else{
            return res.json({
                message: "Please enter an email"
            })
        }
    }catch(err){
        return res.json({
            message: err.message
        })
    }
}

// authorised User

module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req,res,next) {
        if(roles.include(req.role)==true){
            next()
        }else{
            res.status(401).json({
                message: 'Please contact you admin to access this'
            })
        }
    }
}

//Protect Route

module.exports.protectRoute = async function protectRoute(req,res,next) {
    try{
        console.log('this ran');
        let token;
        if(req.cookies.login){
            token = req.cookies.login;
            let payload = jwt.verify(token,JWT_KEY);
            if(payload){
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                console.log('id : ',req.id);
                next();
            }
            else{
                return res.json({
                    message: 'User Invalid'
                })
            }
        }else{
            res.json({
                message: "Operation not allowed"
            });
        }
    }catch(err){
        res.json({
            message: err.message,
        });
    }
}
