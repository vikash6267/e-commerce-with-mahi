// Import the required modules
const express = require("express")
const router = express.Router()

const{
    login,
    signup,
    sendotp,
    compareOtp,
    fetchMyProfile,
    allUsers,
    getReferData
} = require("../controllers/Auth")

const{
    referCode
} = require("../controllers/referCodeKnow")
const{
    auth,
    isCustomre,
    isAdmin
} = require("../middlewares/auth")

router.post("/login", login)

router.post("/sentotp", sendotp)
router.post("/verifyotp", compareOtp)
router.post("/signup", signup)
router.post("/refer", referCode)



router.get("/fetchMyProfile",auth,fetchMyProfile )

router.get("/all-user",auth,isAdmin,allUsers )
router.get("/getReferData",auth,isCustomre,getReferData )




module.exports = router
