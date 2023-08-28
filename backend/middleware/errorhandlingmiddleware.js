const importingUtilsError=require("../Utils/errorHandling");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server Error";

    if(err.name==="Casterror"){
        const message=`Invalid Resource found ${err.path}`;
        err=new importingUtilsError(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.stack
    })
}