//Error Handling Middleware
const errorHandlingClass = require("../Utils/errorHandling");
//User Model Schema 
const userSchema=require("../models/userModel");
//MiddleWare for try Catch for async
const middleWareForTC=require("../middleware/asyncErrorHandling");
const sendEmail = require("../Utils/sendEmail");


//Register a user Function
exports.userRegister=middleWareForTC(async(req,res,next)=>{
    //Taking name email and password from request body
    const {name,email,password}=req.body;
    //Making a new user
    const userCreated = await userSchema.create({
        name,email,password,avatar:{
            public_id:"Sample id",
            url:"Sample profile id"
        }
    });
  
    // //Token Created
     const tokenget=userCreated.getJwtTokens();
     const options={
         httpOnly:true,
         expires:new Date(
             Date.now()+604800
         ),
     };
     res.status(200).cookie("token",tokenget,options).json({
         success:true,
         tokenget
     })

});
//Login a user Function
exports.userLogin=middleWareForTC(async(req,res,next)=>{
    const {email,password}=req.body;
    //Checking if email and password is provided or not
    if(!email || !password){
        return next(new errorHandlingClass("Please provide email or password",404));
    }
    //Finding user with email basis
    const findingUserWEmail=await userSchema.findOne({email}).select("+password");
    if(!findingUserWEmail){
        return next(new errorHandlingClass("Email or password is incorrect"),401);
    }
    //Checking password from user model function
    const comparisonPassword=await findingUserWEmail.checkPassword(password);
    if(!comparisonPassword){
        return next(new errorHandlingClass("Email or password is incorrect"),401);

    }
    // //If all goes well create token
       //Token Created
     const tokenget=findingUserWEmail.getJwtTokens();
     const options={
         httpOnly:true,
         expires:new Date(
             Date.now()+604800
         ),
     };
     //Cookie setting
     res.status(200).cookie("token",tokenget,options).json({
         success:true,
         tokenget
     })

});
//LogOut a User
exports.loggingOutUser=middleWareForTC(async(req,res,next)=>{

    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now())
    })
    res.status(200).json({
        success:true,
        message:"LogOut Successful"
    })
});
//Reset user function
exports.resetUserFunction=middleWareForTC(async(req,res,next)=>{
    //finding user from email found in email
    const user =await userSchema.findOne({email:req.body.email});
    //If user not found return it
    if(!user){
        return next(new errorHandlingClass("No user Found",404));
    }
    //token fetched from user schema function
    const tokenFetched=user.resetPasswordMethod();
    //Saving the user so all tokens can be saved
    await user.save({validateBeforeSave:false});
    //Email made to be sent   
    const emailSenturl=`http://localhost/api/v1/${tokenFetched}`;
    //Message to be sent saved
    const message=`Email sent to you \n\n ${emailSenturl} \n If you have not sent this Kindly ignore this \n\n `;

    try {
        await sendEmail({
            email:user.email,
            subject:"Ecommerce Reset Password",
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
       
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new errorHandlingClass(error.message,500));
    }

});