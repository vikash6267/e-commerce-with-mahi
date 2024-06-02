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
    REFER_CODE : BASE_URL +"/user/refer",

    




}


// PRODUCT APIS
export const productEndpoints = {
    GET_ALL_PRODUCT_API: BASE_URL + "/product/all-product",
     GET_PRODUCT_DETAILS : BASE_URL + "/product/getProductDetails",



     //WishList 
     ADD_TO_WISHLIST : BASE_URL + "/wishlist/addtowish",
     REMOVE_TO_WISHLIST : BASE_URL + "/wishlist/removetowish",
     GET_WISHLIST : BASE_URL + "/wishlist/getWishlist",






     //COUPON APIS 
     GET_COUPON : BASE_URL + "/coupon/get"
     
  }
  
