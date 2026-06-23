const express = require('express');
const port = 7000;
const server = express();

server.use(express.json());

server.get("/",(req,res)=>{
    res.send("hi")
})

server.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`sever running ${port}`);
    }
})