const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const crypto=require("crypto");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });
  
//Using hash to save password
userSchema.pre("save",async function(next){
//If document.is not modified password than dont hash it
    if(!this.isModified("password")){
        next();
    }
    //If password is modified hash it
    this.password=await bcrypt.hash(this.password,10);

});
//Method for creating jwt tokens
userSchema.methods.getJwtTokens=function(){
    //sign with unique id than secret key and some expiry conditions
    return jwt.sign({id:this._id},"asdlasdhjaskdjaskhd",
    {expiresIn:"5d" });
}

//Method for checking password
userSchema.methods.checkPassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

//Token regenerate when reset password called
userSchema.methods.resetPasswordMethod=function(){
  //Creating token of random bytes and converted it into hex
  const token=crypto.randomBytes(20).toString("hex");
  //Setting reset Password on sha256 algo and updating token according to it and converting it into hex
  this.resetPasswordMethod=crypto.createHash('sha256').update(token).digest("hex");
  //Setting reset password expiry to 15 min 
  this.resetPasswordExpire=Date.now()+15*60*1000;

  return token;
}
module.exports=mongoose.model("userSchema",userSchema);