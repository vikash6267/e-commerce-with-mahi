const express = require("express");
const { uploadImages, deleteImages } = require("../controllers/uploadCtrl");
const { isAdmin, auth } = require("../middlewares/auth");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const {uploadCloud} = require("../controllers/uploadCloudinary")
const router = express.Router();


router.post(
  "/",
  auth,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete("/delete-img/:id", auth, isAdmin, deleteImages);
router.post("/img", uploadCloud)

module.exports = router;
