const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    employeeId : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
});

const employee = mongoose.model("Employee", employeeSchema);
module.exports = employee;