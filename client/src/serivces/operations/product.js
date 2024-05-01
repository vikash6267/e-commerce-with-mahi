import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { productEndpoints } from "../apis"

const {
    GET_ALL_PRODUCT_API
} =productEndpoints


export const getAllProduct = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("GET", GET_ALL_PRODUCT_API)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Product")
      }
      result = response?.data?.data
    //   console.log(result)
    } catch (error) {
      console.log("GET_ALL_PRODUCT_API API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }