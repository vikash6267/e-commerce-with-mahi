import { productEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast"


const {
    ADD_PRODUCT_API
} = productEndpoints;


export const createProduct = async(data,token) =>{
    let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", ADD_PRODUCT_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create PRODUCT")
    }
    toast.success("Course PRODUCT Created")
    result = response?.data
  } catch (error) {
    console.log("CREATE PRODUCT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}