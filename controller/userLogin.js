const userModel = require("../model/user");
const sendEmail = require("../helper/sendEmail")
const getUniqueCode = require("../helper/getUniqueCode")

const loginUser = async (req, res) => {
    try {
        const { userName } = req.body;
        const userDetails = await userModel.find({ userName: userName });
        if (userDetails.length > 0) {
            const OTP = getUniqueCode(6);
            const userEmail = userDetails[0].email;
            const mailOption = {
                from: 'laxmidhar.sahoo.551832@gmail.com',
                to: userEmail,
                subject: "OTP for sign in",
                text: `Your One Time Password(OTP) is required to get sign in. \n OTP - ${OTP} \n\n\n Thank you. \n Regards`
            };
            sendEmail(mailOption).then(resp => {
                console.log("OTP sent to user successfully");
                userModel.findOneAndUpdate(
                    { userName: userDetails[0].userName },
                    { $set: { otp: OTP } },
                    { new: true }
                )
                    .then(updatedUser => {
                        if (updatedUser) {
                            console.log('User updated:', updatedUser);
                            req.session.isAuthenticated = true;
                            req.session.userName = userName;
                            return res.render("OTpValidation")
                        } else {
                            console.log('User not found.');
                            return res.render("something-went-wrong")
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        return res.render("something-went-wrong")
                    });
            }).catch(error => {
                console.log("Got error while sending mail to admin.")
                return res.render("something-went-wrong")
            });
        } else {
            console.log("This user is not registered with us")
            return res.render("user-not-registered")
        }
    } catch (error) {
        console.log("error while logged in an user", error);
        return res.render("something-went-wrong")
    }
};

module.exports = { loginUser };