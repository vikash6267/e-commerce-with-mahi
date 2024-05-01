const {uploadImageToCloudinary} = require("../utills/imageUploader")

exports.imageUpload = async(req,res)=>{
    try{
    const thumbnail = req.files.file  

    const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )

      res.status(200).json({
        success:true,
        message:"Image upload successfully",
        thumbnailImage
      })


    }catch(error){

    }
}