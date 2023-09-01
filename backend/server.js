//Getting app from export from another file
const app=require("./app");

//Importing DataBase
const database=require("./config/database");
//UnCaught Exception errors
process.on("uncaughtException",(error)=>{
    console.log(`Error is ${error.message}`);
    console.log("Shutting down Server");
        process.exit(1);
   
})

database();
//express function variable used to listen on a port
const server=app.listen(4000,()=>{
    console.log(`Listening on http://localhost:3000`);
})


//Unhandled Promises resolved
process.on("unhandledRejection",(error)=>{
    console.log(`Error is ${error.message}`);
    console.log("Shutting down Server");
    server.close(()=>{
        process.exit(1);
    });
})

