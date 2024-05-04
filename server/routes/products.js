const express = require("express")
const router = express.Router()

const{
    auth,
    isAdmin,
    isCustomre
}= require("../middlewares/auth")

const {
    createProduct,
    getAllProduct,
    getProductDetails
} = require("../controllers/productCtrl")


router.post("/create",createProduct)
router.post("/getProductDetails" , getProductDetails)
router.get("/all-product",getAllProduct)



// export all router
module.exports = router


