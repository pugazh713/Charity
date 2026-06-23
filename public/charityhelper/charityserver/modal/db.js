const mongoose = require ("mongoose");

const myDatabase = new mongoose.Schema({
    userName: {
        type:String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userMobile: {
        type: String,
        required: true
    }
},{
    collection:"userinfo"
});


module.exports= mongoose.model("userinfo",myDatabase,"userinfo");