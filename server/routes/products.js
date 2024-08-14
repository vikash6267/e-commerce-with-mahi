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
    getProductDetails,
    updateProduct,
    deleteProduct,
    searchProducts,
    notifi
} = require("../controllers/productCtrl")
const { createCommingSoon } = require("../controllers/commingSoonCtrl")


router.post("/create",createProduct)
router.post("/edit",updateProduct)
router.delete("/delete",deleteProduct)
router.post("/getProductDetails" , getProductDetails)
router.get("/all-product",getAllProduct)
router.get("/search",searchProducts)


router.post("/notifi",notifi)



router.post("/comming",createCommingSoon)

// export all router
module.exports = router


