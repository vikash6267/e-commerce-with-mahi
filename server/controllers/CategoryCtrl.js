const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utills/validateMongoDbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
      return res.status(200).json({
        success: true,
        message : "newCategory succesfully ",
        data: newCategory,
      })
  } catch (error) {
     res.status(500).json({
            success: false,
            message: error.message,
          })
    throw new Error(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
     return res.status(200).json({
        success: true,
        message : "updatedCategory succesfully ",
        data: updatedCategory,
      })
  } catch (error) {
     res.status(500).json({
            success: false,
            message: error.message,
          })
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
     return res.status(200).json({
        success: true,
        message : "deletedCategory succesfully ",
        data: deletedCategory,
      })
  } catch (error) {
     res.status(500).json({
            success: false,
            message: error.message,
          })
    throw new Error(error);
  }
});
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id);
     return res.status(200).json({
        success: true,
        message : "getaCategory succesfully ",
        data: getaCategory,
      })
  } catch (error) {
     res.status(500).json({
            success: false,
            message: error.message,
          })
    throw new Error(error);
  }
});
const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
     return res.status(200).json({
        success: true,
        message : "getallCategory succesfully ",
        data: getallCategory,
      })
  } catch (error) {
     res.status(500).json({
            success: false,
            message: error.message,
          })
    throw new Error(error);
  }
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};
