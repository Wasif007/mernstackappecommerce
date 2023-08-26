const app=require("./app");
const configure=require("dotenv");
configure.config({path:"backend/config/config.env"});
app.listen(process.env.PORT_NUM,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT_NUM}`)
})