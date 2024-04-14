const { uploadImageToCloudinary }=  require("../utills/imageUploader")


exports.uploadCloud = async(req,res)=>{
    try{
      console.log(req.files)
        const thumbnail = req.files.images


        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )
          console.log(thumbnailImage)

          return res.status(200).json({
            success:true,
            message:"images upload sucess",
           data: thumbnailImage
          })


    }catch(error){
        console.log("image upload error", error)
        res.status(500).json({
          success: false,
          message: "Internal server error ",
          error: error.message,
        })
    }
}