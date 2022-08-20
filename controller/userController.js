const userModel = require('../models/userModel');


module.exports.getUser = async function getUser(req, res){
    let id = req.id;
    console.log('id is : ',id);
    let user = await userModel.findById(id);
    console.log('User Profile', user);
    if(user){
        res.json(
            {
                user: user
            }
        )
    }else{
        res.json({
            message: "user not found"
        })
    }
}
// module.exports.postUser =function postUser(req,res){
//     users.push(req.body);
//     res.json({
//         message: "Post request Successful",
//         user: req.body
//     })
// }
module.exports.updateUser =async function updateUser(req,res){
    try{
        let id = req.params.id;
        console.log('update id: ',id);
        let user = await userModel.findById(id);
        console.log('update user : ',user);
        if(user){
            let dataToBeUpdated = req.body;
            let keys =[];
            for(key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            console.log(user);
            user.isNew = false;
            const updatedData = await user.save();
            console.log('updated data: ',updatedData);
            res.json({
                message: "Patch successful",
                user: user
            })
        }else{
            res.json({
                message: 'user not found'
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }
}
module.exports.deleteUser =async function deleteUser(req,res){
    try{
        // for(key in req.body){
        //     if(users[key]==req.body[key]){
        //          delete users[key];
        //     }
        // }
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:'user not found'
            })
        }
        res.json({
            message: "user delete successful",
            user: user
        })
    }catch(err){
        res.json({
            message: err.message
        })
    }
}
module.exports.getAllUser = async function getAllUser(req,res){
    try{
        let users = await userModel.find();
        if(users){
            res.json({
                message: 'All Users',
                users: users
            })
        }else{
            res.json({
                message: 'No users found'
            })
        }
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
    }catch(err){
        res.json({
            message: err.message
        })
    }
}

// function setCookies(req,res) {
//     //res.setHeader('Set-Cookie','isLoggedIn = True');
//     res.cookie('isLoggedIn',true,{maxAge: 1000*60*60*24, secure:true, httpOnly:true});
//     res.cookie('isPrimeMember',true);
//     res.send('cookies has been set');
// }

// function getCookies(req,res) {
//     let cookie = req.cookies;
//     console.log(cookie);
//     res.send('cookies recieved');
// }
//let flag = false;
