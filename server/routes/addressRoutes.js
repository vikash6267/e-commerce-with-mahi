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
router.get("/get", auth,isCustomre,getUserAddresses)
router.delete("/delete", auth,isCustomre,deleteAddress)
router.put("/update", auth,isCustomre,updateAddress)



module.exports = router
