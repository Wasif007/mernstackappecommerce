const productSchema=require("../models/productModel");


//Route to add a new Product acc to Schema --Admin
exports.addingAProduct=async(req,res)=>{
const productCreatedViaReq=await productSchema.create(req.body);
res.status(201).json({success:true,productCreatedViaReq});
}


//Route of all products made here
exports.getAllProducts=async(req,res)=>{
   const fetchAllProducts =await productSchema.find();
res.status(200).json({success:true,fetchAllProducts});
}