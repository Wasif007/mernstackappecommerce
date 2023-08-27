//Route of all products made here
exports.getAllProducts=(req,res)=>{
    console.log("Hello");
res.status(200).json({success:"Route created of all products"});
}