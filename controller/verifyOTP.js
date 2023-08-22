const userModel = require("../model/user");

const verifyOTP = async (req, res) => {
    try {
        req.session.isAuthenticated == 'undefined' ? false : true;
        console.log("req.session.isAuthenticated ---> ",req.session.isAuthenticated)
        if (req.session.isAuthenticated) {
            const userName = req.session.userName
            const userDetails = await userModel.find({ userName: userName });
            let { firstName, lastName, email } = userDetails[0];
            const OtpStored = userDetails[0].otp;
            const OtpFromReqBody = req.body.otp;
            if(OtpStored === OtpFromReqBody){
                console.log("login successfully");
                req.session.firstName = firstName;
                req.session.lastName = lastName;
                req.session.email = email;
                res.render("user-details", { userName, firstName, lastName, email })
            }else{
                console.log("login failed")
                return res.render("login-failed")
            }

        } else {
            console.log("user is not authenticated");
            let errorMessage = "User is not authenticated."
            return res.render('login', {errorMessage});
        }
    } catch (error) {
        console.log("error in OTP validation ----> ",error);
        return res.render("something-went-wrong")
    }
};

module.exports = { verifyOTP }