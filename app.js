const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000);
const userRouter = require('./routers/userRouter');
//const authRouter = require('./routers/authRouter');
app.use('/user',userRouter);
//app.use('/auth',authRouter);

// let users = [
//     {
//         id: 1,
//         Name: "Tushar"
//     },
//     {
//         id: 2,
//         Name: "Rachit"
//     },
//     {
//         id: 3,
//         Name: "Govind"
//     }
// ]




// (async function createUser(){
//     let user = {
//         name: "Tushar",
//         email: "tushar55@gmail.com",
//         password: "12345678",
//         confirmPassword: "12345678"
//     }
//     let data = await userModel.create(user);
//     console.log(data);
// })();

