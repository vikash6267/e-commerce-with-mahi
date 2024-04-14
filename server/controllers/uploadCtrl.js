const fs = require("fs");

const {
    cloudinaryUploadImg,
    cloudinaryDeleteImg,
  } = require("../utills/cloudinary");


  const uploadImages = async (req, res) => {
    try {
      console.log("enter the uplooad")
  
      const uploader = (path) => cloudinaryUploadImg(path, "images");
      const urls = [];
      const files = req.files;
  
      console.log(files)
      if (!files || files.length === 0) {
        return res.status(400).json({ status: 'fail', message: 'No files uploaded' });
      }
      console.log("Images",files)
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        console.log(newpath);
        urls.push(newpath);
        // fs.unlinkSync(path);
      }
      const images = urls.map((file) => {
        return file;
      });
      res.json({
        success: true,
        message: "Iamges Uploaded successfully",
        data: images,
      })
    } catch (error) {
      console.log("image upload error", error)
      res.status(500).json({
        success: false,
        message: "Internal server error ",
        error: error.message,
      })
    }
  };


  const deleteImages = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = cloudinaryDeleteImg(id, "images");
      res.json({ message: "Deleted" });
    } catch (error) {
      throw new Error(error);
    }
};
  
  module.exports = {
    uploadImages,
    deleteImages,
  };