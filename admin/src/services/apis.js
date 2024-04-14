const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    ADMIN_LOGIN : BASE_URL + "/auth/adminlogin",

    MONTH_DATA : BASE_URL + "/auth/getMonthWiseOrderIncome",
    YEARLY_DATA : BASE_URL + "/auth/getyearlyorders",
    GET_ALL_ORDERS : BASE_URL + "/auth/getAllOrders",
  

  
}

export const productEndpoints = {
    // Products apis
    ADD_PRODUCT_API : BASE_URL + "/product/create-product",
    // color apis
    ADD_COLOR_API : BASE_URL + "/product/create-color",
    GET_ALL_COLOR_API : BASE_URL + "/product/getallcolor",


    // cATEGORIES
    ADD_CATEGORY_API : BASE_URL + "/product/update-product",
   GET_ALL_CATEGORY_API : BASE_URL + "/product/getallcategory",



//    uploads
    UPLOAD_IMAGE_API : BASE_URL + "/upload/img"
}

