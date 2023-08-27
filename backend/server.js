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
const server=app.listen(4000,()=>{
    console.log(`Listening on http://localhost:4000`);
})


//Unhandled Promises resolved
process.on("unhandledRejection",(error)=>{
    console.log(`Error is ${error.message}`);
    console.log("Shutting down Server");
    server.close(()=>{
        process.exit(1);
    });
})

