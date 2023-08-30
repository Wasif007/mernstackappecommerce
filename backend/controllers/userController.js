//Error Handling Middleware
const errorHandlingClass = require("../Utils/errorHandling");
//User Model Schema 
const userSchema=require("../models/userModel");
//MiddleWare for try Catch for async
const middleWareForTC=require("../middleware/asyncErrorHandling");

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
    const tokenget=userCreated.getJwtTokens();
    console.log(userCreated);
    res.status(200).json({
        success:true,
        tokenget
    })

});