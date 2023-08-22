const userModel = require("../model/user");
const sendEmail = require("../helper/sendEmail");
const { getUpdatedValues } = require("../helper/getUpdatedField")

const updateUserDetails = async (req, res) => {
    try {
        const { firstName, lastName, email, userName } = req.session;
        const userDetails = await userModel.find({ userName: userName });
        const { newfirstName, newlastName, newemail, newuserName } = req.body;
        const fieldsToBeUpdated = {}
        if (firstName != newfirstName) {
            fieldsToBeUpdated['firstName'] = newfirstName;
            req.session.firstName = newfirstName;
        };

        if (lastName != newlastName) {
            fieldsToBeUpdated['lastName'] = newlastName;
            req.session.lastName = newlastName;
        };

        if (email != newemail) {
            fieldsToBeUpdated['email'] = newemail;
            req.session.email = newemail;
        }

        if (userName != newuserName) {
            fieldsToBeUpdated['userName'] = newuserName;
            req.session.userName = newuserName;
        };

        console.log("fieldsToBeUpdated  ---> ", fieldsToBeUpdated)
        if (Object.keys(fieldsToBeUpdated).length == 0 ) {
            console.log("There were no changes made to update.");
            return res.render('no-changes');
        }

        const newUserIsPresentOrNot = await userModel.find({ userName: newuserName });
        if (newUserIsPresentOrNot.length == 1) {
            const updatedUser = await userModel.findOneAndUpdate({ userName: newuserName }, fieldsToBeUpdated, { new: true })
            return res.render("user-details", { firstName : newfirstName, lastName : newlastName, email : newemail, userName : newuserName });
        }
        else {
            console.log("More than one user is present using this user name");
            return res.render("username-taken")
        }

    } catch (error) {

    }
};

module.exports = { updateUserDetails }