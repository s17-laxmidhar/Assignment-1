const express = require("express");
const router = express.Router();

const {registerUser} = require("../controller/userRegistration");
const {loginUser} = require("../controller/userLogin");
const {verifyOTP} = require("../controller/verifyOTP");
const {updateUserDetails} = require("../controller/UpdateUserDetails");

router.post("/registration", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP)
router.post("/update-details", updateUserDetails)

module.exports = router;