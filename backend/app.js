const express=require("express");
//using express
const app=express();
const cookie_parser=require("cookie-parser");

//Using json to read json data
app.use(express.json());
app.use(cookie_parser());

//Importing Middlewares
const errorHandlingMiddlewares=require("./middleware/errorhandlingmiddleware")

//Importing routes here
const productsAll=require("./routes/productRoute");
const userAll=require("./routes/userRoute");
const orderAll=require("./routes/orderRoute");

app.use(errorHandlingMiddlewares);

//Using routes here
app.use("/api/v1",productsAll);
app.use("/api/v1",userAll);
app.use("/api/v1",orderAll);




module.exports =app