const BASE_URL = process.env.REACT_APP_BASE_URL


// PRODUCT APIS
export const productEndpoints = {
    GET_ALL_PRODUCT_API: BASE_URL + "/product/all-product",
     GET_PRODUCT_DETAILS : BASE_URL + "/product/getProductDetails"
  }
  