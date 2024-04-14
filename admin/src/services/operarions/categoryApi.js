import { toast } from "react-hot-toast"
import { productEndpoints } from "../apis"
import { apiConnector } from "../apiConnector"

const {
   
    GET_ALL_CATEGORY_API
} = productEndpoints;




export const getAllCategory = async()=>{

    const toastId = toast.loading("Loading...")
    let result = null;
  
    try {
        const response = await apiConnector("GET", GET_ALL_CATEGORY_API)
  
  
        if (!response?.data?.success) {
          throw new Error("Could Not Get all Categories Details")
        }
  
        toast.success("Get All Categories fetch Successfully")
       result = response?.data?.data
  
  
  
      } catch (error) {
        console.log("GET Categories API ERROR............", error)
        toast.error(error.message)
        result = error.response.data
  
      }
     
      toast.dismiss(toastId)
      return result;
  }