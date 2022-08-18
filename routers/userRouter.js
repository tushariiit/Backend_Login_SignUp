const express = require('express');
const userRouter = express.Router();
const {getUsers,getUserById,updateUser,deleteUser,postUser} = require('../controller/userController');
const cookieParser = require('cookie-parser');
const protectRoute = require('../routers/authHelper');
const app = express();
app.use('/user',userRouter);
app.use(cookieParser());
userRouter
.route('/')
.get(protectRoute,getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

// userRouter
// .route('/setCookies')
// .get(setCookies)

// userRouter
// .route('/getCookies')
// .get(getCookies)

userRouter
.route('/:id')
.get(getUserById)



module.exports = userRouter;