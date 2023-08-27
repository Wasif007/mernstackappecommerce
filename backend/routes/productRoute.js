const express=require("express");
//Importing all controllers for products 
const { getAllProducts, addingAProduct, updatingAProduct} = require("../controllers/productcontrollers");

const router=express.Router();
//Making all routes for product CRUD
router.route("/products").get(getAllProducts);
router.route("/new/product").post(addingAProduct);
router.route("/product/:id").put(updatingAProduct);


module.exports=router