module.exports=tryCatchFunction=>(req,res,next)=>{
    Promise.resolve(tryCatchFunction(req,res,next)).catch(next);
}