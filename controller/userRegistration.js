const userModel = require("../model/user");
const sendEmail = require("../helper/sendEmail");
const { response } = require("express");

const registerUser = async (req, res) => {
    try{
        const {firstName, lastName, email, userName} = req.body;
        const findUserIsPresent = await userModel.find({userName : userName});
        if(findUserIsPresent.length == 0){
            const newUser = new userModel({
                firstName : firstName,
                lastName : lastName,
                email : email,
                userName : userName
            });

            newUser.save().then(async resp => {
                console.log('Document saved successfully ---> ', resp);
                const mailOption = {
                    from : 'laxmidhar.sahoo.551832@gmail.com',
                    to : "laxmidhar.dkl@gmail.com",
                    subject : "User Signup",
                    text : `One user is registered now. \n firstName : ${firstName} \n lastName : ${lastName} \n email : ${email} \n userName : ${userName}`
                };
                const sendEmailResponse = sendEmail(mailOption).then(resp => {
                    console.log("email sent to admin successfully")
                }).catch(error => {
                    console.log("Got error while sending mail to admin.")
                });
                console.log("response --> ", {
                    status : true,
                    message : "The new user details is registered"
                })
                res.render("registration-success")
            })
        }else{
            console.log("The new user details is already registered with us")
            return res.render("user-already-present")
        }
    }catch(error){
        console.log("error in register an user", error);
        return res.render("something-went-wrong")
    }   
};

module.exports = {
    registerUser
}