const express = require('express');
const userRouter = express.Router();
const {getUser,getAllUser,updateUser,deleteUser} = require('../controller/userController');
const cookieParser = require('cookie-parser');
//const protectRoute = require('../routers/authHelper');
const { signUp, loginUser, isAuthorised, protectRoute } = require('../controller/authController');
const app = express();
app.use('/user',userRouter);
app.use(cookieParser());

// user options
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signUp)

userRouter
.route('/login')
.post(loginUser)

//profile page
app.use(protectRoute);
userRouter
.route('/userProfile')
.get(protectRoute,getUser)

//admin func
app.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)


module.exports = userRouter;