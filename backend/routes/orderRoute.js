const express=require("express");
const isAuthenticatedUser = require("../middleware/authenticatingUser");
const { newOrderCreating, gettingSingleOrder } = require("../controllers/orderController");
const router=express.Router();

router.route("/order/new").post(isAuthenticatedUser,newOrderCreating);
router.route("/myorder").get(isAuthenticatedUser,gettingSingleOrder);

module.exports=router;