const express=require("express");
//Importing all controllers for user 
const { userRegister, userLogin }=require("../controllers/userController")

const router=express.Router();

//Making all routes for product CRUD
router.route("/registeruser").post(userRegister);
router.route("/login").post(userLogin);

module.exports=router