const BASE_URL = process.env.REACT_APP_BASE_URL


// ??USER APIS
export const userEndpoints = {
    LOGIN_API : BASE_URL + "/admin/login",
    VERIFY_API : BASE_URL +"/admin/verify-otp",

    ALL_USERS :BASE_URL + "/user/all-user",
    
    
    LOGOUT_API :BASE_URL + "/admin/logout",
    ALL_SESSION_API :BASE_URL + "/admin/getsession",
}


// PRODUCT APIS
export const productEndpoints = {
    GET_ALL_PRODUCT_API: BASE_URL + "/product/all-product",
     GET_PRODUCT_DETAILS : BASE_URL + "/product/getProductDetails",
     

      //COUPON APIS 
     GET_ALL_COUPON : BASE_URL + "/coupon/getAll",
    ADD_COUPON_API : BASE_URL + "/coupon/create",
    DELETE_COUPON_API : BASE_URL + "/coupon/delete",

    // Orders


     
  }






  




  // ADMIN APIS 

  export const adminEndPoints = {
    ADD_PRODUCT_API : BASE_URL + "/product/create",
    EDIT_PRODUCT_API : BASE_URL + "/product/edit",
    DELETE_PRODUCT_API : BASE_URL + "/product/delete",


    //

    //Category
    ADD_CATEGORY_API : BASE_URL + "/cat/createCategory",
    EDIT_CATEGORY_API : BASE_URL + "/cat/editCategory",
    DELTE_CATEGORY_API : BASE_URL + "/cat/deleteCategory",
    GET_ALL_CATEGORY_API : BASE_URL + "/cat/showAllCategories",


    IMAGE_UPLOAD : BASE_URL + "/image/multi",


    // Orders
    GET_ALL_ORDER: BASE_URL + "/order/getAll",


   
  }