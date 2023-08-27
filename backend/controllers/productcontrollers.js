const productSchema=require("../models/productModel");


//Route to add a new Product acc to Schema
exports.addingAProduct=async(req,res)=>{
const productCreatedViaReq=await productSchema.create(req.body);
res.status(201).json({success:true,productCreatedViaReq});
}


//Route of all products made here
exports.getAllProducts=(req,res)=>{
    console.log("Hello");
res.status(200).json({success:"Route created of all products"});
}