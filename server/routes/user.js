const express = require("express")
const router = express.Router()

const{ signup , sendotp, login, adminLogin} = require("../controllers/Auth")
const { isAdmin, auth } = require("../middlewares/auth");
const {getMonthWiseOrderIncome, getYearlyTotalOrder,getAllOrders} = require("../controllers/userCtrl")

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)
router.post("/singup", signup)
router.post("/login",login)


router.post("/adminlogin", adminLogin)




module.exports = router
