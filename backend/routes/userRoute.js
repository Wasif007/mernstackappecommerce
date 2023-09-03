const express=require("express");
//Importing all controllers for user 
const { userRegister, userLogin, loggingOutUser, resetUserFunction, resetUserForgotPassword, userDetailsGetting, userPasswordUpdate }=require("../controllers/userController");
const isAuthenticatedUser = require("../middleware/authenticatingUser");

const router=express.Router();

//Making all routes for product CRUD
router.route("/registeruser").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(loggingOutUser);
router.route("/reset/password").post(resetUserFunction);
router.route("/reset/forgot/:token").put(resetUserForgotPassword);
router.route("/me").get(isAuthenticatedUser,userDetailsGetting);
router.route("/password/update").put(isAuthenticatedUser,userPasswordUpdate);

module.exports=router