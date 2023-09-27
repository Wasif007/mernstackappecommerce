//Getting app from export from another file
const app=require("./app");
const cloudinary=require("cloudinary");          

//Importing DataBase
const database=require("./config/database");
require("dotenv").config({ path: "backend/config/config.env" });

//UnCaught Exception errors
process.on("uncaughtException",(error)=>{
    console.log(`Error is ${error.message}`);
    console.log("Shutting down Server");
        process.exit(1);
   
})

database();
cloudinary.config({ 
    cloud_name: 'dllaqsbrm', 
    api_key: '943714132421857', 
    api_secret: 'exi1096VlXEqgJX9POR5EtyPlhI' 
  });
  
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

