// Import the required modules
const express = require("express")
const router = express.Router()

const{
    login,
    signup,
    sendotp,
    compareOtp,
    fetchMyProfile
} = require("../controllers/Auth")

const{
    auth,
    isCustomre
} = require("../middlewares/auth")

router.post("/login", login)

router.post("/sentotp", sendotp)
router.post("/verifyotp", compareOtp)
router.post("/signup", signup)



router.get("/fetchMyProfile",auth,fetchMyProfile )




module.exports = router
