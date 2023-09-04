const express=require("express");
//Importing all controllers for products 
const { getAllProducts, addingAProduct, updatingAProduct, deleteAProduct,findingASProduct, reviewsAndRatingFunc, fetchingAllReviews} = require("../controllers/productcontrollers");
const isAuthenticatedUser=require("../middleware/authenticatingUser");
const isRoleDefined = require("../middleware/roleDefinedAuth");

const router=express.Router();

//Making all routes for product CRUD
router.route("/admin/products").get(isAuthenticatedUser,isRoleDefined("admin"),getAllProducts);
router.route("/admin/new/product").post(isAuthenticatedUser,isRoleDefined("admin"),addingAProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,isRoleDefined("admin"),updatingAProduct).delete(isAuthenticatedUser,isRoleDefined("admin"),deleteAProduct);
router.route("/product/:id").get(findingASProduct)
router.route("/product/ratings").put(isAuthenticatedUser,reviewsAndRatingFunc);
router.route("/reviewslist").get(fetchingAllReviews);

module.exports=router