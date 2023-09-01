const ErrorHander = require("../Utils/errorHandling");
const catchAsyncErrors = require("./asyncErrorHandling");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
 const {token}=req.cookies;
 if(!token){
    return next(new ErrorHander("You are Logout, Please Login to access data",401));
 }
 const decodeData=jwt.verify(token,"asdlasdhjaskdjaskhd");
 req.user=await User.findById(decodeData.id);
 next();
});

module.exports=isAuthenticatedUser;