const orderSchema=require("../models/orderModel");
const errorHandlingClass = require("../Utils/errorHandling");
const productSchema=require("../models/productModel");
//MiddleWare for try Catch for async
const middleWareForTC=require("../middleware/asyncErrorHandling");


exports.newOrderCreating=middleWareForTC(async(req,res,next)=>{
    //Destructing order details from req body
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
//Creating order acc to details
      const orderCreated=await orderSchema.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,paidAt: Date.now(),
        userAdded: req.user._id,
      });
      //Sending it in response
      res.status(201).json({
        success:true,
        orderCreated
      })
});
//Getting my orders detail
exports.gettingSingleOrder=middleWareForTC(async(req,res,next)=>{
const orderDetails=await orderSchema.find({userAdded:req.user._id});
res.status(200).json({
    success:true,
    orderDetails
})
});