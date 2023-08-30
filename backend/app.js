const express=require("express");
//using express
const app=express();
//Using json to read json data
app.use(express.json());

//Importing routes here
const productsAll=require("./routes/productRoute");
const userAll=require("./routes/userRoute");

//Importing Middlewares
const errorHandlingMiddlewares=require("./middleware/errorhandlingmiddleware")

//Using routes here
app.use("/api/v1",productsAll);
app.use("/api/v1",userAll);

app.use(errorHandlingMiddlewares);


module.exports =app