const errorHandlingClass = require("../Utils/errorHandling");
const productSchema=require("../models/productModel");
//MiddleWare for try Catch for async
const middleWareForTC=require("../middleware/asyncErrorHandling");
const ApiFeatures = require("../Utils/apifilters");

//Route to add a new Product acc to Schema --Admin
exports.addingAProduct=middleWareForTC(async(req,res)=>{
//Adding a user Id of who is adding it
req.body.userAdded=req.user.id;
//Passing all req.body to create new user
const productCreatedViaReq=await productSchema.create(req.body);
res.status(201).json({success:true,productCreatedViaReq});
}
)

//Route of all products made here
exports.getAllProducts=middleWareForTC(async(req,res)=>{
    //How many Products to be shown on one page
    const numberOfProducts=5;
    //Keeping the count of products to be shown on front end
    const numOfProducts=await productSchema.countDocuments();
    //Finding from class where query is all and req.query is keyword
    const apiFiltersConstant= new ApiFeatures(productSchema.find(),req.query).search().filter().pagination(numberOfProducts);
    
    const fetchAllProducts =await apiFiltersConstant.query;
res.status(200).json({success:true,fetchAllProducts,numOfProducts});
});

//Route of updating a product here --Admin
exports.updatingAProduct=middleWareForTC(async(req,res,next)=>{
  
         //Finding a product through id given in url
    let productFinding=await productSchema.findById(req.params.id);
     if(!productFinding){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
        }
   
   
   else{
    //If Id is found than update it with request body values
    productFinding=await productSchema.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({
        success:true,
        productFinding
    })
}
});

//Route for deleting a Product
exports.deleteAProduct=middleWareForTC(async(req,res,next)=>{
    const productTBDeleted=await productSchema.findById(req.params.id);
    if(!productTBDeleted){
        return res.status(500).json({success:false,message:"Product not found to be deleted"});
    }
    else{
      await productSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({success:true,message:"Product deleted Successfully"});
    }
});

//Route for getting A Single Product Details
exports.findingASProduct=middleWareForTC(async(req,res)=>{
    const productTFind=await productSchema.findById(req.params.id);
    if(!productTFind){
       return res.status(400).json({
            success:false,
            message:"Product not found"
        })
       
    }
    else{
      res.status(200).json({success:true,productTFind});
    }
});
//Route to make reviews and ratings update
exports.reviewsAndRatingFunc=middleWareForTC(async(req,res,next)=>{
    //destructring all from req.body
const {review,rating,productId}=req.body;
//Making object of required documents
const reviewUpdate={
    userAdded:req.user._id,
    name:req.user.name,
    review,
    rating
}
//Finding the required product from product Id
const productFinding=await productSchema.findById(productId);
//Checking if it is reviewed before or not
const isReviewed=productFinding.reviews.find(rev=>rev.userAdded.toString()===req.user._id.toString());

//If it is reviewed
if(isReviewed){
productFinding.reviews.forEach(rev=>{
    if(rev.userAdded.toString()===req.user._id.toString()){
    rev.rating=rating;
    rev.review=Number(review);
    }
   
})
}
//If not reviewed
else{
productFinding.reviews.push(reviewUpdate);
productFinding.numOfReviews=productFinding.reviews.length;
}
//Finding the avg for ratings of a product
let avg=0;
productFinding.reviews.forEach(rev=>{
    avg+=rev.rating
});
productFinding.ratings=avg/productFinding.reviews.length;
productFinding.save({validateBeforeSave:false});
res.status(200).json({
    success:true,
    productFinding
})
});