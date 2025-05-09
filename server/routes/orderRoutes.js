const express = require("express")
const router = express.Router()

const{
    auth,
    isAdmin,
    isCustomre
}= require("../middlewares/auth")



const {
    capturePayment,
    paymentVerification,
    getAllOrder,
    adminAllOrders
} = require("../controllers/OrderCtrl")


router.post("/capturePayment", auth, isCustomre, capturePayment)
router.post("/verifyPayment", auth, isCustomre, paymentVerification)
router.get("/get", auth, isCustomre, getAllOrder)

// Admin
router.get("/getAll", adminAllOrders)


module.exports = router
