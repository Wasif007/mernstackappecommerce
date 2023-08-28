const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,"Please provide the name"],
    maxLength:[30,"Name should not be greater than 30 characters"],
    minLength:[5,"Name should not be less than 5 characters"]
},
email:{
    type:String,
    required:[true,"Please provide the email address"],
    unique:true,
    validate:[validator.isEmail,"Please provide correct email format"]

},
password:{
    type:String,
    required:[true,"Please provide the password linked to your  email address"],
    minLength:[5,"Password should not be less than 5 characters"],
    select:false
},
avatar:{
    public_uid:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
},
role:{
    type:String,
    default:"user"
},
resetPasswordToken:String,
resetPasswordExpire:Date

});
module.exports=mongoose.model("userSchema",userSchema);