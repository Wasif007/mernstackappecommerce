//Getting app from export from another file
const app=require("./app");
//Importing dotenv for saving variables in hidden place
const dotenv=require("dotenv");
//Importing DataBase
const database=require("./config/database");

//Configuring a file
dotenv.config({path:'backend/config/config.env'});

database();
//express function variable used to listen on a port
app.listen(4000,()=>{
    console.log(`Listening on http://localhost:4000`);
})