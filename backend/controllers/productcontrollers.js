const errorHandlingClass = require("../Utils/errorHandling");
const productSchema=require("../models/productModel");
const cloudinary=require("cloudinary");
//MiddleWare for try Catch for async
const middleWareForTC=require("../middleware/asyncErrorHandling");
const ApiFeatures = require("../Utils/apifilters");

//Route to add a new Product acc to Schema --Admin
exports.addingAProduct=middleWareForTC(async(req,res)=>{
//Adding a user Id of who is adding it
req.body.userAdded=req.user.id;
const images=[];
if(typeof req.body.images==="string"){
images.push(req.body.images);
}else{
images=req.body.images;
}
const imagesLink=[];
for (let index = 0; index < images.length; index++) {
    const result = await cloudinary.v2.uploader.upload(images[index], {
        folder: "products",
      });
      imagesLink.push({
        public_uid:result.public_id,
        url: result.secure_url,
    });
    
}
req.body.images=imagesLink;

//Passing all req.body to create new user
const product=await productSchema.create(req.body);
res.status(201).json({success:true,product});
}
)

//Route of all products made here
exports.getAllProducts=middleWareForTC(async(req,res)=>{
    //How many Products to be shown on one page
    const numberOfProducts=4;
    //Keeping the count of products to be shown on front end
    const numOfProducts=await productSchema.countDocuments();
    //Finding from class where query is all and req.query is keyword
    const apiFiltersConstant= new ApiFeatures(productSchema.find(),req.query).search().filter().pagination(numberOfProducts);
    const fetchFilteredCount=new ApiFeatures(productSchema.find(),req.query).search().filter();
    let fetchAllProductsCount=await fetchFilteredCount.query;
    let count=fetchAllProductsCount.length;
    let fetchAllProducts = await apiFiltersConstant.query;
   
res.status(200).json({success:true,fetchAllProducts,numOfProducts,numberOfProducts,count});
});

//Route of all products for Admin made here
exports.getAllForAdminProducts=middleWareForTC(async(req,res)=>{
   const products=await productSchema.find();   
res.status(200).json({success:true,products});
});


//Route of updating a product here --Admin
exports.updatingAProduct=middleWareForTC(async(req,res,next)=>{
  try {
      //Finding a product through id given in url
      let productFinding=await productSchema.findById(req.params.id);
      if(!productFinding){
         return res.status(404).json({
             success:false,
             message:"Product not found"
         })
         }
    
    
    else{
     // Images Start Here
   let images = [];
 
   if (typeof req.body.images === "string") {
     images.push(req.body.images);
   } else {
     images = req.body.images;
   }
 
   if (images !== undefined) {
     // Deleting Images From Cloudinary
     for (let i = 0; i < productFinding.images.length; i++) {
       await cloudinary.v2.uploader.destroy(productFinding.images[i].public_uid);
     }
 
     const imagesLinks = [];
 
     for (let i = 0; i < images.length; i++) {
       const result = await cloudinary.v2.uploader.upload(images[i], {
         folder: "products",
       });
 
       imagesLinks.push({
         public_uid: result.public_id,
         url: result.secure_url,
       });
     }
 
     req.body.images = imagesLinks;
   }
     //If Id is found than update it with request body values
     productFinding=await productSchema.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
     res.status(200).json({
         success:true,
         message:"Product Updated Successfully",
         productFinding
     })
 }
  } catch (error) {
    console.log(error);
  }

       
});

//Route for deleting a Product
exports.deleteAProduct=middleWareForTC(async(req,res,next)=>{
    const productTBDeleted=await productSchema.findById(req.params.id);
    if(!productTBDeleted){
        return res.status(500).json({success:false,message:"Product not found to be deleted"});
    }

    else{
      for (let i = 0; i < productTBDeleted.images.length; i++) {
        await cloudinary.v2.uploader.destroy(productTBDeleted.images[i].public_uid);
        
      }
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
const {comment,rating,productId}=req.body;
//Making object of required documents
const reviewUpdate={
    userAdded:req.user._id,
    name:req.user.name,
    comment,
    rating: Number(rating),
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
    rev.comment=comment;
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
//Finding the avg and setting it to ratings
productFinding.ratings=avg/productFinding.reviews.length;
//Saving  the product after changes
productFinding.save({validateBeforeSave:false});
res.status(200).json({
    success:true,
    productFinding
})
});
//Getting all reviews from a single product
exports.fetchingAllReviews=middleWareForTC(async(req,res,next)=>{
    
 const product=await productSchema.findById(req.query.id);
 if(!product){
     return res.status(400).json({
         success:false,
         message:"Product not found"
     })
 }
res.status(200).json({
    success:true,
    review:product.reviews
})
});
//Deleting a review of a product route
exports.deletingAReview=middleWareForTC(async(req,res,next)=>{
    
    const product=await productSchema.findById(req.query.productId);
    
    if(!product){
        return res.status(400).json({
            success:false,
            message:"Product not found"
        })
    }
    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());
    const numOfReviews=reviews.length;
    //Finding the avg for ratings of a product
let avg=0;
reviews.forEach(rev=>{
    avg+=rev.rating
});
//Finding the avg and setting it to ratings
const ratings=avg/reviews.length;
await productSchema.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
},{
    new:true,
    runValidators:true,
    userFindAndModify:false
})

   res.status(200).json({
       success:true,
       review:reviews
   })
   });
