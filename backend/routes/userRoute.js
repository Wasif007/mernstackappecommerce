const express=require("express");
//Importing all controllers for user 
const { userRegister, userLogin, loggingOutUser, resetUserFunction, resetUserForgotPassword, userDetailsGetting, userPasswordUpdate, userProfileUpdate, gettingAllUsersFAdmin, gettingOneUserFAdmin, userRoleDetail, userDetailDeleFAdmin }=require("../controllers/userController");
const isAuthenticatedUser = require("../middleware/authenticatingUser");
const isRoleDefined = require("../middleware/roleDefinedAuth");
const router=express.Router();

//Making all routes for product CRUD
router.route("/registeruser").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(loggingOutUser);
router.route("/reset/password").post(resetUserFunction);
router.route("/reset/forgot/:token").put(resetUserForgotPassword);
router.route("/me").get(isAuthenticatedUser,userDetailsGetting);
router.route("/password/update").put(isAuthenticatedUser,userPasswordUpdate);
router.route("/me/update").put(isAuthenticatedUser,userProfileUpdate);
router.route("/admin/allusers").get(isAuthenticatedUser,isRoleDefined("admin"),gettingAllUsersFAdmin);
router.route("/admin/specificuser/:id").get(isAuthenticatedUser,isRoleDefined("admin"),gettingOneUserFAdmin)
.put(isAuthenticatedUser,isRoleDefined("admin"),userRoleDetail)
.delete(isAuthenticatedUser,isRoleDefined("admin"),userDetailDeleFAdmin);

module.exports=router