const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const cookieParser = require('cookie-parser');
const protectRoute = require('../routers/authHelper');
const app = express();
app.use('/user',userRouter);
app.use(cookieParser());
userRouter
.route('/')
.get(protectRoute,getUsers)
.post(postUser)
.patch(patchUser)
.delete(deleteUser)

userRouter
.route('/setCookies')
.get(setCookies)

userRouter
.route('/getCookies')
.get(getCookies)

userRouter
.route('/:id')
.get(getUserById)

async function getUsers(req, res){
    let allusers = await userModel.find();
    res.json(
        {
            message: "Get Request Successful",
            user: allusers
        }
    )
}
function postUser(req,res){
    users.push(req.body);
    res.json({
        message: "Post request Successful",
        user: req.body
    })
}
async function patchUser(req,res){
    // let user = await userModel.findOne({email:"tus@gmail.com"}).exec();
    // for(key in req.body){
    //     user[key]=req.body[key];
    // }
    const query = {email : "tus@gmail.com"};
    await userModel.findOneAndUpdate(query,{email: "tushar123@gmail.com"})
    res.json({
        message: "Patch successful",
    })
}
async function deleteUser(req,res){
    // for(key in req.body){
    //     if(users[key]==req.body[key]){
    //          delete users[key];
    //     }
    // }
    let del = await userModel.deleteOne({email:"tushar55@gmail.com"})
    res.json({
        message: "delete successful",
        delete: del
    })
}
function getUserById(req,res){
    // let obj ={};
    // for(let i=0;i<users.length;i++){
    //     if(users[i]['id']==req.params.id){
    //         obj = users[i];
    //     }
    // }
    // res.json({
    //     message: "Get user by id successfull",
    //     user: obj
    // })
}

function setCookies(req,res) {
    //res.setHeader('Set-Cookie','isLoggedIn = True');
    res.cookie('isLoggedIn',true,{maxAge: 1000*60*60*24, secure:true, httpOnly:true});
    res.cookie('isPrimeMember',true);
    res.send('cookies has been set');
}

function getCookies(req,res) {
    let cookie = req.cookies;
    console.log(cookie);
    res.send('cookies recieved');
}
//let flag = false;


module.exports = userRouter;