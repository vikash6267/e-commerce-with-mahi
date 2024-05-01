const express = require("express")
const router = express.Router()

const{
    auth,
    isAdmin,
    isCustomre
}= require("../middlewares/auth")

const {
    imageUpload
}=require("../controllers/imageCtrl")

router.post("/upload",imageUpload)
// export all router
module.exports = router


