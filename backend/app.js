const express=require("express");
//using express
const app=express();
const cookie_parser=require("cookie-parser");
const body_parser=require("body-parser");
const fileUpload=require("express-fileupload");

//Using json to read json data
app.use(express.json());
app.use(cookie_parser());
app.use(body_parser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.static("public"));

//Importing Middlewares
const errorHandlingMiddlewares=require("./middleware/errorhandlingmiddleware")
require("dotenv").config({ path: "backend/config/config.env" });

//Importing routes here
const productsAll=require("./routes/productRoute");
const userAll=require("./routes/userRoute");
const orderAll=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");

app.use(errorHandlingMiddlewares);

//Using routes here
app.use("/api/v1",productsAll);
app.use("/api/v1",userAll);
app.use("/api/v1",orderAll);
app.use("/api/v1",payment);




module.exports =app