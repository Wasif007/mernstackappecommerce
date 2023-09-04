const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please provide the product name"]
  },
  description:{
    type:String,
    required:[true,"Please provide the product description"]
  },
  price:{
    type:Number,
    required:[true,"Price must be provided"],
    default:0,
    maxLenght:[7,"Price cannot exceeds 7 digits"]
  },
  ratings:{
    type:Number,
    default:0
  },
  images:[
    {
        public_uid:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
  ],
  category:{
    type:String,
    required:[true,"Please provide category of product"]
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  Stock:{
    type:Number,
    required:[true,"Please provide the Stock Value"],
    maxLenght:[4,"Stock must be under 4 digits"],
    default:1
  },
  numOfReviews:{
    type:Number,
    default:0
  },
  reviews:[
    {
      userAdded:{
        type:mongoose.Schema.ObjectId,
        ref:"userSchema",
        required:true
      },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String
        }
    }
  ],
  userAdded:{
    type:mongoose.Schema.ObjectId,
    ref:"userSchema",
    required:true
  }


});

module.exports=mongoose.model("productSchema",productSchema);