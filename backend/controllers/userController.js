//Error Handling Middleware
const errorHandlingClass = require("../Utils/errorHandling");
//User Model Schema 
const userSchema=require("../models/userModel");
//MiddleWare for try Catch for async
const middleWareForTC=require("../middleware/asyncErrorHandling");
const sendEmail = require("../Utils/sendEmail");
const crypto=require("crypto");
const cloudinary=require("cloudinary");


//Register a user Function
exports.userRegister=middleWareForTC(async(req,res,next)=>{
    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,
    { folder: "avatars",
    width:150,
crop:"scale" } 
    );
    //Taking name email and password from request body
    const {name,email,password}=req.body;
    //Making a new user
    const userCreated = await userSchema.create({
        name,email,password,avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });
  
    // //Token Created
     const token=userCreated.getJwtTokens();
     const options={
         httpOnly:true,
         expires:new Date(
             Date.now()+604800
         ),
     };
     res.status(200).cookie("token",token,options).json({
         success:true,
         token,
         userCreated
     })

});
//Login a user Function
exports.userLogin=middleWareForTC(async(req,res,next)=>{
    const {email,password}=req.body;
    //Checking if email and password is provided or not
    if(!email || !password){
        return res.status(404).json({
            success:false,
            message:"Please provide email or password"
        })
    }
    //Finding user with email basis
    const findingUserWEmail=await userSchema.findOne({email}).select("+password");
    if(!findingUserWEmail){
        return res.status(401).json({
            success:false,
            message:"Email or Password is Incorrect"
        })
        
    }
    //Checking password from user model function
    const comparisonPassword=await findingUserWEmail.checkPassword(password);
    if(!comparisonPassword){
        return res.status(401).json({
            success:false,
            message:"Email or Password is Incorrect"
        })
    }
    // //If all goes well create token
       //Token Created
     const token=findingUserWEmail.getJwtTokens();
     const options={
         httpOnly:true,
         expires:new Date(
             Date.now()+604800
         ),
     };
     //Cookie setting
     res.status(200).cookie("token",token,options).json({
         success:true,
         token,
         message:"Login Successful",
         findingUserWEmail
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
        return res.status(404).json({
            success:false,
            message:"No User Found in Database"
        })
    }
    //token fetched from user schema function
    const token=user.resetPasswordMethod();
    //Saving the user so all tokens can be saved
    await user.save({validateBeforeSave:false});
    //Email made to be sent   
    const emailSenturl=`http://localhost:3000/reset/forgot/${token}`;
    //Message to be sent saved
    const message=`Email sent to you temp\n\n ${emailSenturl} \n If you have not sent this Kindly ignore this \n\n `;

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
        return   res.status(500).json({
            success:false,
            message:error.message
        });
    }

});
//Forgot password route
exports.resetUserForgotPassword=middleWareForTC(async(req,res,next)=>{
    //Getting password for req.params and setting it via sha256 algo
 const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest("hex");

 //Finding the required user
 const userFind=await userSchema.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
})
//If user not found
if(!userFind){
    return res.status(404).json({
        success:false,
        message:"No User Found in Database"
    })
}
//If user added both password wrong
if(req.body.password!==req.body.confirmPassword){
    return res.status(401).json({
        success:false,
        message:"New Password and Confirm Password doesnot matches"
    })
}
//If all goes well save password into user.password
userFind.password=req.body.password;
userFind.resetPasswordToken=undefined;
userFind.resetPasswordExpire=undefined;
//Save the user
userFind.save();
   //Token Created
   const token=userFind.getJwtTokens();
   const options={
       httpOnly:true,
       expires:new Date(
           Date.now()+604800
       ),
   };
   //Cookie setting
   res.status(200).cookie("token",token,options).json({
       success:true,
       token,
       message:"Password Changed Successfully"
   })

});
//Getting user details
exports.userDetailsGetting=middleWareForTC(async(req,res,next)=>{
const user=await userSchema.findById(req.user.id);
res.status(200).json({
    success:true,
    user
})
});
//Updating  Password of a user route
exports.userPasswordUpdate=middleWareForTC(async(req,res,next)=>{

    const user=await userSchema.findById(req.user.id).select("+password");

      //Checking password from user model function
      const comparisonPassword=await user.checkPassword(req.body.oldPassword);
      if(!comparisonPassword){
        return res.status(401).json({
            success:false,
            message:"Password is Incorrect"
        })
         
      }
      if(req.body.newPassword!==req.body.confirmPassword)
      {
        return res.status(401).json({
            success:false,
            message:"Confirm and Old Password doesnot matches"
        })
       
      }
      user.password=req.body.newPassword;
      user.save();

    res.status(200).json({
        success:true,
        user
    })
});
//Updating user details route
exports.userProfileUpdate=middleWareForTC(async(req,res,next)=>{
  
    try {
        let details={
            name:req.body.name,
            email:req.body.email
           }
           
          console.log(req.body.avatar);
           if(req.body.avatar!==""){
            const user =await userSchema.findById(req.user.id);
          
            let imageUrl=user.avatar.public_id;
              
            await cloudinary.v2.uploader.destroy(imageUrl);
             
            const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,
                { folder: "avatars",
                width:150,
            crop:"scale" } 
                );
               
                details.avatar={
                    public_id:myCloud.public_id,
                    url:myCloud.secure_url
                }
        
           }
           
              const userFetched=await userSchema.findByIdAndUpdate(req.user.id,details);
             userFetched.save();
        
            res.status(200).json({
                success:true,
                userFetched
            })
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
   
});
//Getting all users admin
exports.gettingAllUsersFAdmin=middleWareForTC(async(req,res,next)=>{
    const users=await userSchema.find();

    res.status(200).json({
        success:true,
        users
    });
})
// getting specific user for admin via id
exports.gettingOneUserFAdmin=middleWareForTC(async(req,res,next)=>{
    try {
        const user=await userSchema.findById(req.params.id);
    if(!user){
        return res.status(400).json({
            success:false,
            message:"No user found with specified Id"
        })
    }
     res.status(200).json({
        success:true,
        user
    });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }   
})
//Updating user role via admin permission
exports.userRoleDetail=middleWareForTC(async(req,res,next)=>{

    const details={
     name:req.body.name,
     email:req.body.email,
     role:req.body.role
    }
       const findingUser=await userSchema.findByIdAndUpdate(req.params.id,details,{
         runValidators:true,
         new:true,
         userFindAndModify:false
       })
       if(!findingUser){
        return res.status(400).json({
            success:false,
            message:`No User with Id:${req.params.id} Found`
        })
       }
       findingUser.save();
 
     res.status(200).json({
         success:true,
         findingUser
     })
 });
 //Deleting a user with admin permission
 exports.userDetailDeleFAdmin=middleWareForTC(async(req,res,next)=>{

       const findingUser=await userSchema.findById(req.params.id)
       if(!findingUser){
        return res.status(400).json({
            success:false,
            message:`No User with Id:${req.params.id} Found`
        })
       }
      await findingUser.deleteOne({id:req.params.id});
 
     res.status(200).json({
         success:true,
         message:`Deleted User with Id: ${req.params.id}`
     })
 });