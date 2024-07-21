const express = require("express")
const router = express.Router()

const{
    auth,
    isAdmin,
    isCustomre
}= require("../middlewares/auth")


const {
    createCoupon,
    getCouponByName,
    getAllCoupons,
    deleteCouponByName
} = require("../controllers/couponCtrl")


router.post("/create",createCoupon)
router.post("/get",getCouponByName)
router.get("/getAll",getAllCoupons)
router.delete("/delete/:name",deleteCouponByName)



module.exports = router


