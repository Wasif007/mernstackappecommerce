const express=require("express");
const isAuthenticatedUser = require("../middleware/authenticatingUser");
const { newOrderCreating } = require("../controllers/orderController");
const router=express.Router();

router.route("/order/new").post(isAuthenticatedUser,newOrderCreating);

module.exports=router;