const employeeModel = require("../model/employee");
const makeEmployeeId = require("../helper/generateEmployeeId")

const registerEmployee = async (req, res) => {
    try{
        const {firstName, lastName, gender, employeeId, designation, phone} = req.body;
        if(!firstName || !lastName || !gender || !employeeId || !designation || !phone){
            res.status(422).send({
                status : false,
                message : "please filled the field properly."
            })
        }
        const findEmpIdIsPresent = await employeeModel.find({employeeId : employeeId});
        if(findEmpIdIsPresent.length == 0){
            const newEmployee = new employeeModel({
                firstName : firstName,
                lastName : lastName,
                gender : gender,
                employeeId : employeeId,
                designation : designation,
                phone : phone
            });
            newEmployee.save().then(resp => {
                console.log('Document saved successfully ---> ', resp);
                res.status(201).send({
                    status : true,
                    message : "The new employee details is registered"
                })
            })
        }else{
            console.log("The new employee details is already registered with us")
            res.status(400).send({
                status : false,
                message : "The employee details is already registered with us"
            })
        }
    }catch(error){
        console.log("error in register an employee", error);
        res.status(400).send({
            status : false,
            message : "something went wrong"
        })
    }   
};

module.exports = {
    registerEmployee
}