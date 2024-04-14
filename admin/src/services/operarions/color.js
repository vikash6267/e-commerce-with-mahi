import { toast } from "react-hot-toast"
import { productEndpoints } from "../apis"
import { apiConnector } from "../apiConnector"

const {
    ADD_COLOR_API,
    GET_ALL_COLOR_API,
    
} = productEndpoints;


export const createColor = async(title,token)=>{
   
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", ADD_COLOR_API, {title}, {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        })
        console.log("CREATE COLOR API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Add COLOR Details")
        }
        toast.success("COLOR Details Added Successfully")
      
      } catch (error) {
        console.log("CREATE COLOR API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
    
}

export const getAllColor = async()=>{

  const toastId = toast.loading("Loading...")
  let result = null;

  try {
      const response = await apiConnector("GET", GET_ALL_COLOR_API)


      if (!response?.data?.success) {
        throw new Error("Could Not Get all COLOR Details")
      }

      toast.success("Get All Color fetch Successfully")
     result = response?.data?.data



    } catch (error) {
      console.log("GET COLOR API ERROR............", error)
      toast.error(error.message)
      result = error.response.data

    }
   
    toast.dismiss(toastId)
    return result;
}