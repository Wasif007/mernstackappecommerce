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

//Route of updating a product here --Admin
exports.updatingAProduct=async(req,res)=>{
  
         //Finding a product through id given in url
    let productFinding=await productSchema.findById(req.params.id);
     if(!productFinding){
       
     return res.status(500).json({"success":false,"message":"Product Not found with that id"});
    }
   
   
   else{
    //If Id is found than update it with request body values
    productFinding=await productSchema.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({
        success:true,
        productFinding
    })
}
}

//Route for deleting a Product
exports.deleteAProduct=async(req,res)=>{
    const productTBDeleted=await productSchema.findById(req.params.id);
    if(!productTBDeleted){
        return res.status(500).json({success:false,message:"Product not found to be deleted"});
    }
    else{
      await productSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({success:true,message:"Product deleted Successfully"});
    }
}

//Route for getting A Single Product Details
exports.findingASProduct=async(req,res)=>{
    const productTFind=await productSchema.findById(req.params.id);
    if(!productTFind){
        return res.status(400).json({success:false,message:"Product not found"});
    }
    else{
      res.status(200).json({success:true,productTFind});
    }
}