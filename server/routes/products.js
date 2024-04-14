const express = require("express")
const router = express.Router()

const{ createProduct , editProduct, deleteProduct} = require("../controllers/ProductCtrl")
const{createColor,updateColor,deleteColor,getColor,getallColor} = require("../controllers/ColorCtrl")
const{createCategory,updateCategory,deleteCategory,getCategory,getallCategory} = require("../controllers/CategoryCtrl")

const { isAdmin, auth } = require("../middlewares/auth");

// CREATE PRODUCTS
router.post("/create-product", auth,isAdmin , createProduct)

// ?? UPDATE SINGLE PRODUCTS
router.put("/update-product", auth,isAdmin , editProduct)

// delete single product
router.delete("/delete-product/:id", auth,isAdmin , deleteProduct)


// color
router.post("/create-color", auth,isAdmin , createColor)
router.get("/getallcolor",   getallColor)



// CAtegory
router.post("/create-category", auth,isAdmin , createCategory)
router.get("/getallcategory",  getallCategory)




// export all router
module.exports = router


