const express = require("express");
const router = express.Router();
const {registerEmployee} = require("../controller/employee");
router.post("/employeeRegistration", registerEmployee);

module.exports = router;