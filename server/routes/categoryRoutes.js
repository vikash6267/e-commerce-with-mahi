const express = require("express");
const router = express.Router();

const { auth, isAdmin, isCustomre } = require("../middlewares/auth");

const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
  editCategory,
} = require("../controllers/Category");

router.post("/createCategory", createCategory);
router.post("/editCategory",  editCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

module.exports = router;
