const express=require("express");
const isAuthenticatedUser = require("../middleware/authenticatingUser");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const router=express.Router();

router.route("/payment/process").post(isAuthenticatedUser,processPayment);

module.exports=router;
