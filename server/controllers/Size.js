const Size = require("../models/Size");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utills/validateMongoDbId");

exports.createSize = asyncHandler(async (req, res) => {
    try {
      const newSize = await Size.create(req.body);
      return res.status(200).json({
        success: true,
        message : "Size Create Succlefully ",
        data: newSize,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });

exports.updateSize = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedSize = await Size.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        message : "Size Upadate Succlefully ",
        data: updatedSize,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });

 exports.deleteSize = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedSize = await Size.findByIdAndDelete(id);
        return res.status(200).json({
        success: true,
        message : "Size Deleted Succlefully ",
        data: deletedSize,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });

    
  exports.getSize = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getaSize = await Size.findById(id);
        return res.status(200).json({
        success: true,
        message : "Single Size succesfully ",
        data: getaSize,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });
exports.getallSize = asyncHandler(async (req, res) => {
    try {
      const getallSize = await Size.find();
        return res.status(200).json({
        success: true,
        message : "All Size Fetch Succlefully ",
        data: getallSize,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });