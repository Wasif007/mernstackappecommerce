const express=require("express");
const isAuthenticatedUser = require("../middleware/authenticatingUser");
const { newOrderCreating, gettingSingleOrder, gettingOrderDetails, gettingAllOrdersAdmin, updateOrderFAdmin, deleteOrderFAdmin } = require("../controllers/orderController");
const isRoleDefined = require("../middleware/roleDefinedAuth");
const router=express.Router();

router.route("/order/new").post(isAuthenticatedUser,newOrderCreating);
router.route("/myorder").get(isAuthenticatedUser,gettingSingleOrder);
router.route("/orderdetails/:id").get(isAuthenticatedUser,gettingOrderDetails);
router.route("/orderforadmin").get(isAuthenticatedUser,isRoleDefined("admin"),gettingAllOrdersAdmin);
router.route("/order/status/:id").put(isAuthenticatedUser,isRoleDefined("admin"),updateOrderFAdmin).delete(isAuthenticatedUser,isRoleDefined("admin"),deleteOrderFAdmin);

module.exports=router;