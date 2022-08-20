const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

let db_link = 'mongodb+srv://admin:FU0tu1dQI6sIOlds@cluster0.zmpyyt6.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then((db)=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
})
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function () {
           return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.confirmPassword == this.password;
        }
    },
    role:{
        type:String,
        enum:['admin','user','restrauntOwner','deliveryBoy'],
        default: 'user'
    },
    profileImage:{
        type: String,
        default: 'img/users/default.jpeg'
    }
});
// userSchema.pre('save',function(){
//     console.log("before saving to db",this);
// });
// userSchema.post('save',function(db){
//     console.log("after saving to db",db);
// });
userSchema.pre('save',function(){
    if(this.confirmPassword){
    this.confirmPassword = undefined;
    }
});
userSchema.pre('save',async function() {
    //let salt = await bcrypt.genSalt(1);
    let hashedString = await bcrypt.hash(this.password, 10);
    this.password = hashedString;
    console.log(hashedString);
});

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;