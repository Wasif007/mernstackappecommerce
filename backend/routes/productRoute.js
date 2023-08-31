const express=require("express");
//Importing all controllers for products 
const { getAllProducts, addingAProduct, updatingAProduct, deleteAProduct,findingASProduct} = require("../controllers/productcontrollers");
const isAuthenticatedUser=require("../middleware/authenticatingUser")

const router=express.Router();

//Making all routes for product CRUD
router.route("/products").get(isAuthenticatedUser,getAllProducts);
router.route("/new/product").post(addingAProduct);
router.route("/product/:id").put(updatingAProduct).delete(deleteAProduct).get(findingASProduct);


module.exports=router