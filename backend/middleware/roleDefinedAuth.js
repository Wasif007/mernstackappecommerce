const errorHandlingClass = require("../Utils/errorHandling")

const isRoleDefined=(...roles)=>{
return(req,res,next)=>{

if(!roles.includes(req.user.role)){
    return next(new errorHandlingClass(`Requesting role is: ${req.user.role} not authorized`,403));
}
next();
}}

module.exports=isRoleDefined