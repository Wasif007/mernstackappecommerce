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
    //Update an order status
    exports.updateOrderFAdmin=middleWareForTC(async(req,res,next)=>{
        //First finding an order
        const order=await orderSchema.findById(req.params.id);
        //If no order found send status of 400 
        if(!order){
            return res.status(400).json({
                success:false,
                message:"No order found of provided Id"
            })
        }
        //If order status is delievered we dont need to do anything
        if(order.orderStatus==="Delivered"){
                return res.status(401).json({
                    success:false,
                    message:"Order has been already Delivered"
                })
        }
        //Loop through orderItems details and update stock of products
        order.orderItems.forEach(async (order)=>{
            await updateStockFunc(order.product,order.quantity)
        });
        //Update order status acc to sent in req.body
        order.orderStatus=req.body.status;
        if(req.body.status==="Delivered"){
            order.createdAt=Date.now();
        }
        //save order status and stock
        await order.save({validateBeforeSave:false});
        res.status(200).json({
            success:true,
            message:"Order Status Updated Successfully"
        })
        
    });
//Order stock update function
    async function updateStockFunc(productId,quantityOfProducts){
const productFinding=await productSchema.findById(productId);
productFinding.Stock=productFinding.Stock-quantityOfProducts;
await productFinding.save({validateBeforeSave:false});

    }
      //Delete an order for admin
exports.deleteOrderFAdmin=middleWareForTC(async(req,res,next)=>{

    //Find an order of id provided
   const order= await orderSchema.findById(req.params.id);
   if(!order){
    //If no order found
    return res.status(400).json({
        success:false,
        message:"No order found of provided Id"
    })
   }
   //If order is there delete its collection
   await orderSchema.deleteOne(order._id);
    res.status(200).json({
        success:true
       
    })
    });