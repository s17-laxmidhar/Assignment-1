const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    otp : {
        type : String,
        default : null
    }
});

const user = mongoose.model("User", userSchema);
module.exports = user;