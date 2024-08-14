const commingSoon = require("../models/commingSoon");

exports.createCommingSoon = async(req,res)=>{
    try {
        const {email}=req.body;


        if(!email){
            return res.status(403).json({
                success:false,
                message: "Email Are Requireds"
            })
        }


        const createComming = await commingSoon.create({
            email
        })

        res.status(200).json({
            success:true,
            message:"Created Successfull",
            email
        })
    } catch (error) {
     console.log(error)
     
     res.status(500).json({
        success:false,
        message:"Internal Error",
        error
     })
    }
}