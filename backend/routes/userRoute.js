const express=require("express");
//Importing all controllers for user 
const { userRegister, userLogin, loggingOutUser, resetUserFunction }=require("../controllers/userController")

const router=express.Router();

//Making all routes for product CRUD
router.route("/registeruser").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(loggingOutUser);
router.route("/reset/password").post(resetUserFunction);

module.exports=router