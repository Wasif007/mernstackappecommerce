const express=require("express");
//Importing all controllers for user 
const { userRegister }=require("../controllers/userController")

const router=express.Router();

//Making all routes for product CRUD
router.route("/registeruser").post(userRegister);


module.exports=router