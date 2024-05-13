const BASE_URL = process.env.REACT_APP_BASE_URL

// ??USER APIS
export const userEndpoints = {
    LOGIN_API : "http://localhost:4000/api/v1/user/login",
    SIGNUP_API : BASE_URL +"/user/signup",
    FETCH_PROFILE : BASE_URL + "/user/fetchMyProfile",
    SEND_OTP_API : BASE_URL +"/user/sentotp",
    VERIFY_OTP_API : BASE_URL +"/user/verifyotp",

    // Address
    GET_ADDRESS : BASE_URL +"/address/get",
    ADD_ADDRESS : BASE_URL +"/address/add",
    DELETE_ADDRESS : BASE_URL +"/address/delete",
    UPDATE_ADDRESS : BASE_URL +"/address/update",

    




}


// PRODUCT APIS
export const productEndpoints = {
    GET_ALL_PRODUCT_API: BASE_URL + "/product/all-product",
     GET_PRODUCT_DETAILS : BASE_URL + "/product/getProductDetails"
  }
  
