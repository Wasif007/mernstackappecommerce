const express=require("express");
//using express
const app=express();
//Using json to read json data
app.use(express.json());

//Importing routes here
const productsAll=require("./routes/productRoute");

//Importing Middlewares
const errorHandlingMiddlewares=require("./middleware/errorhandlingmiddleware")

app.use("/api/v1",productsAll);
app.use(errorHandlingMiddlewares);


module.exports =app