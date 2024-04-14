
import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../redux/slices/authSlice"
import { setUser } from "../../redux/slices/profileSlice"
import { endpoints } from "../apis"
import { apiConnector } from "../apiConnector"

const {
    ADMIN_LOGIN,
    MONTH_DATA,
    YEARLY_DATA,
    GET_ALL_ORDERS
} = endpoints;

export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", ADMIN_LOGIN, {
          email,
          password,
        })
  
        // console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        navigate("/dashboard")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export const getMonthlyData = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("GET", MONTH_DATA,null,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log(response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Monthly Data ")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("MONTH_DATA API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const getYearlyData = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      console.log(token)
      const response = await apiConnector("GET", YEARLY_DATA,null,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Yearly Data ")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("YEARLY_DATA API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const getOrders = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("GET", GET_ALL_ORDERS,null,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Orders ")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_ALL_ORDERS API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }