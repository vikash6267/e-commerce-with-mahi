import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { productEndpoints } from "../apis"



const {
    GET_ALL_PRODUCT_API,
    GET_PRODUCT_DETAILS,
    GET_COUPON,
    GET_ALL_COUPON,
    ADD_COUPON_API,
    DELETE_COUPON_API
} =productEndpoints

export const getAllProduct = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_PRODUCT_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Product");
    }
    const result = response?.data?.data;
    console.log("Fetched Products:", result); 
    return result;
  } catch (error) {
    console.log("GET_ALL_PRODUCT_API API ERROR:", error);
    throw error; 
  }
};
  
export const fetchProductDetails = async (productID) => {
  //  

  let result = null
  try {
    const response = await apiConnector("POST", GET_PRODUCT_DETAILS, {
      productID,
    })
    console.log("GET_PRODUCT_DETAILS API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("GET_PRODUCT_DETAILS API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message);
  }
  //  
  //   dispatch(setLoading(false));
  return result
}
//COUPON 
  
export const fetchCoupon = async (name,token) => {
   
  console.log(name)

  let result = null
  try {
    const response = await apiConnector("POST", GET_COUPON, {name} )
    // console.log("GET_COUPON API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("GET_COUPON API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message);
  }
   
  //   dispatch(setLoading(false));
  return result
}

export const createCoupon = async (data, token,sessionId) => {
  console.log(sessionId)
  let result = [];
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", ADD_COUPON_API, data, {
      "Content-Type": "application/json", // Assuming JSON format; change to "multipart/form-data" if needed
      Authorization: `Bearer ${token}`,
      'Session-ID': sessionId,

    });

    console.log("CREATE COUPON API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not add coupon details");
    }

    result = response?.data?.couponDetails; // Assuming couponDetails is the correct key in the response
    toast.success("Coupon details added successfully");

  } catch (error) {
    console.log("CREATE COUPON API ERROR............", error);
    toast.error(`Error: ${error.message}`);
  }

  toast.dismiss(toastId);
  return result;
};


export const fetchCoupons = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_COUPON);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Cooupons");
    }
    const result = response?.data?.data;
    // console.log("Fetched Cooupons:", result); 
    return result;
  } catch (error) {
    console.log("GET_ALL_COUPON_API API ERROR:", error);
    throw error; 
  }
};

export const deleteCoupon = async (id, token) => {
  console.log(id)
  const toastId = toast.loading("Deleting Coupon...");

  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_COUPON_API}/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("DELETE Coupon API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not delete coupon");
    }

    toast.update(toastId, {
      render: "Coupon deleted successfully",
      type: "success",
      autoClose: 2000,
    });
  } catch (error) {
    console.log("DELETE Coupon API ERROR............", error);
    toast.update(toastId, {
      render: `Error: ${error.message}`,
      type: "error",
      autoClose: 5000,
    });
  }
};


