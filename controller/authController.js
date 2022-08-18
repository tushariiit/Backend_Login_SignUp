const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'fxsyr867vjguytu8oubbcuu';

module.exports.getSignUp = function getSignUp(req,res) {
    res.sendFile("/public/index.html",{root:__dirname});
}

module.exports.postSignUp = function postSignUp(req,res) {
    let user = req.body;
    userModel.create(user);
    res.json({
        message:"User Signed Up",
        data:user
    })
}

module.exports.loginUser = async function loginUser(req,res) {
    try{
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email:data.email});
            if(user){
                if(data.password==user.password){
                    let uid = user['_id'];
                    let token = jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token,{httpOnly:true});
                    //res.cookie('isLoggedIn',true);
                    return res.json({
                        message: "User Signed Up",
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
