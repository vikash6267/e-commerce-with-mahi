import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { userEndpoints } from "../apis"

const{
    SEND_OTP_API,
    VERIFY_OTP_API,
    SIGNUP_API,
    LOGIN_API
} = userEndpoints



export function sendOtp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      let result = []

      try {
        const response = await apiConnector("POST", SEND_OTP_API, {
          email
        })
        // console.log("SENDOTP API RESPONSE............", response)
  
        // console.log(response.data.success)
        result = response.data.success
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        // navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
        return result
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
      return result

    }
  }


  
export function compareOtp(otp,email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      let result = []
      try {
        const response = await apiConnector("POST", VERIFY_OTP_API, {
            otp,email
        })
        console.log("SENDOTP API RESPONSE............", response)
  
     
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        if(response.data.userFind){
          dispatch(setToken(response.data.token))
          const userImage = response.data?.user?.image
          dispatch(setUser({ ...response.data.user, image: userImage }))
          localStorage.setItem("token", JSON.stringify(response.data.token))
          navigate("/profile")
      
          
        }
        result = response?.data?.userFind
  
        toast.success("OTP Sent Successfully")
        // navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function signUp(
    formData,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, formData)
  
        // console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        navigate("/profile")


        toast.success("Login Successful")
      
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Login Failed")
        navigate("/login")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }