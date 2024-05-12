const express = require("express")
const router = express.Router()

const{
    auth,
    isAdmin,
    isCustomre
}= require("../middlewares/auth")


const {
    addAddress,
    updateAddress,
    deleteAddress,getUserAddresses

}= require("../controllers/addressCtrl")


router.post("/add", auth,isCustomre,addAddress)
router.post("/get", auth,isCustomre,getUserAddresses)
router.post("/delete", auth,isCustomre,deleteAddress)
router.post("/update", auth,isCustomre,updateAddress)



module.exports = router
