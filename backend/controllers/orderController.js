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
//Getting All  order detail of logged in user
exports.gettingSingleOrder=middleWareForTC(async(req,res,next)=>{
const orderDetails=await orderSchema.find({userAdded:req.user._id});
res.status(200).json({
    success:true,
    orderDetails
})
});

//Getting Single order details 
exports.gettingOrderDetails=middleWareForTC(async(req,res,next)=>{
    const orderDetails=await orderSchema.findById(req.params.id).populate('userAdded','name email');
    if(!orderDetails){
        return res.status(400).json({
            success:false,
            message:"No order found in Database"
        })
    }
    res.status(200).json({
        success:true,
        orderDetails
    })
    });

    //Getting All  order detail for Admin
exports.gettingAllOrdersAdmin=middleWareForTC(async(req,res,next)=>{
    const orderDetails=await orderSchema.find();
    let totalAmount=0;
    orderDetails.forEach((order)=>{
        totalAmount+=order.totalPrice;
    })
    res.status(200).json({
        success:true,
        orderDetails,
        totalAmount
    })
    });