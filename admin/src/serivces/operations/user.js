import { toast } from "react-hot-toast"
import { setLoading, setToken ,setUser} from "../../slices/profileSlice"

import { apiConnector } from "../apiConnector"
import { userEndpoints } from "../apis"
const {
  SIGNUP_API,
  LOGIN_API,
  VERIFY_API,
  FETCH_PROFILE,
  ALL_USERS
} = userEndpoints





export function login(email, password, ) {
  let result = false
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      // console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Otp Send Successful")
      result = true
   
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      // toast.error("Login Failed")
      toast.error(error?.response?.data?.message)
    
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result
  }
}


export function verify(email, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", VERIFY_API, {
        email,
        otp,
      })

      // console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      console.log(response)
      toast.success("Login Successful")
      dispatch(setToken(response?.data?.token))
      dispatch(setUser(response?.data?.admin))
      localStorage.setItem("user", JSON.stringify(response?.data?.admin))

      localStorage.setItem("token", JSON.stringify(response?.data?.token))
      navigate("/admin/dashboard")
   
    } catch (error) {
      console.log("OTP API ERROR............", error)
      toast.error(error?.response?.data?.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}




export function fetchMyProfile(token) {

  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", FETCH_PROFILE, null, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      })

      console.log("APP JS RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      // console.log(response.data)

      dispatch(setUser(response.data.user))



      localStorage.setItem("user", JSON.stringify(response.data.user))

    } catch (error) {
      // console.log("LOGIN API ERROR............", error)
    }
    dispatch(setLoading(false))
  }
}

// Assuming apiConnector accepts headers as the third argument
export const getAllUsers = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Pass token in Authorization header
    };

    const response = await apiConnector("GET", ALL_USERS, null,  {
      Authorization: `Bearer ${token}`,
    });
    
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Users");
    }
    
    const result = response?.data?.data;
    console.log("Fetched Users:", result); 
    return result;
  } catch (error) {
    console.log("GET_ALL_USERS_API API ERROR:", error);
    throw error; 
  }
};




export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/login")
  }
}