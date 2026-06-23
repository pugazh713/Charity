const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

const mydb = require('./model/mysqldb');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome to the backend of charity helps");
    res.end();
});

app.post('/donate', async(req,res)=>{
    const {Username,Email,upassword,Amount} = req.body;
    const fdata = {Username,Email,upassword,Amount};
    console.log(fdata);
    try{
      if(!Username || !Email || !upassword || !Amount){
        return res.status(400).json({message:"Please fill all the fields client error 400"});
      }
      else{
        const myquery = "INSERT INTO userinfo (Username,Email,upassword,Amount) VALUES (?,?,?,?)";
        mydb.query(myquery,[Username,Email,upassword,Amount],(e,s)=>{
           if (e) {
              console.log("MySQL Error:", e);
              return res.status(500).json({message: "Error inserting data into database" });
}
            else{
                console.log(s);
                return res.status(200).json({message:"Data saved successfully"});
            }
        });
      }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Error inserting data into database 500"});
    }
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});