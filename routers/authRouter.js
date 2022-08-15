const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');
const app = express();
app.use('/auth',authRouter);

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp)

authRouter
.route('/login')
.post(loginUser)

function getSignUp(req,res) {
    res.sendFile("/public/index.html",{root:__dirname});
}

function postSignUp(req,res) {
    let user = req.body;
    userModel.create(user);
    res.json({
        message:"User Signed Up",
        data:user
    })
}

async function loginUser(req,res) {
    try{
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email:data.email});
            if(user){
                if(data.password==user.password){
                    res.cookie('isLoggedIn',true);
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

module.exports = authRouter;