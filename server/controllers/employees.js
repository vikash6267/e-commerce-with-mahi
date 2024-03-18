const Employe = require("../models/Employe")

exports.allEmployees  = async (req, res) => {
    try {
      
      const allEmploye = await Employe.find({})
       
      res.status(200).json({
        success: true,
        message: "All Employee Data fetched successfully",
        data: allEmploye,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  exports.getEmployee = async (req,res,next) =>{

    try{

        const { id } = req.params;
        const employee = await Employe.findById(
           id
        )

            if(!employee){
                if(!employee) {
                    const error = new Error('Employee does not exist');
                    return next(error);
                }
            }

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
  }