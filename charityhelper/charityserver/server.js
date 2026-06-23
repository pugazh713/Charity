const express = require('express');
const {default:mongoose} = require('mongoose');
const cors = require("cors");
const PORT = 8000;
const Mydb = require("./modal/db");

//frontend setup
const app = express();
app.use(express.json());
app.use(cors());

//backend setup
app.get("/",(req,res)=>{
    res.send("Welcome to charity server");
    res.end();
})

//mongodblocal
app.post("/contact",async(req,res)=>{
    try{
        const{userName,userEmail,userMobile} = req.body; 
        const newcontactdata = {userName,userEmail,userMobile};
        console.log("Data received in backend",newcontactdata);  
        if(!userName || !userEmail || !userMobile){
            console,error("Please fill all the fields front end");
            res.status(400).json({Error:"Please fill all the fields front end client error 404"});
        }
        else{
            const contactdata = new Mydb(newcontactdata);
            await contactdata.save();
            res.status (200).json({Messages:"Data saved successfully in db success 202"});
        }
    }
    catch(err){
        console.error("Data will not save in DB",err);
        res.status(500).json({Error:"Data will not save in DB server error 505"});
    }
})

//mysqldb
app.post("/Donate",async(req,res)=>{
    try{
        const{userName,userEmail,userMobile} = req.body; 
        const newcontactdata = {userName,userEmail,userMobile};
        console.log("Data received in backend",newcontactdata);  
        if(!userName || !userEmail || !userMobile){
            console,error("Please fill all the fields front end");
            res.status(400).json({Error:"Please fill all the fields front end client error 404"});
        }
        else{
            const contactdata = new Mydb(newcontactdata);
            await contactdata.save();
            res.status (200).json({Messages:"Data saved successfully in db success 202"});
        }
    }
    catch(err){
        console.error("Data will not save in DB",err);
        res.status(500).json({Error:"Data will not save in DB server error 505"});
    }
})



//database setup
mongoose.connect("mongodb://localhost:27017/Charity")
.then(()=>{
    console.error("Database connected successfully...!");
})
.catch((err)=>{
    console.error("Error in mongodb database connection",err);
});
//deployment setup
app.listen(PORT,(err)=>{
    if(err){
        console.error("Server will not start",err);
    }
    else{
        console.log(`Server is running on port ${PORT}`);
    }
});
