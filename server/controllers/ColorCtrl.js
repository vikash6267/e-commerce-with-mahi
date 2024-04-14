const Color = require("../models/Color");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utills/validateMongoDbId");

exports.createColor = asyncHandler(async (req, res) => {
    try {
      console.log(req.body.title)
      const newColor = await Color.create(req.body);
      return res.status(200).json({
        success: true,
        message : "Color Create Succlefully ",
        data: newColor,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });

exports.updateColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        message : "Color Upadate Succlefully ",
        data: updatedColor,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });

 exports.deleteColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedColor = await Color.findByIdAndDelete(id);
        return res.status(200).json({
        success: true,
        message : "Color Deleted Succlefully ",
        data: deletedColor,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });

    
  exports.getColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getaColor = await Color.findById(id);
        return res.status(200).json({
        success: true,
        message : "Single Color succesfully ",
        data: getaColor,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });

  
  exports.getallColor = asyncHandler(async (req, res) => {
    try {
      const getallColor = await Color.find();
      console.log(getallColor)
        return res.status(200).json({
        success: true,
        message : "All Color Fetch Succlefully ",
        data: getallColor,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });