import { apiConnector } from "../apiConnector";
import {productEndpoints}  from "../apis"
import { toast } from "react-hot-toast"

const {
    UPLOAD_IMAGE_API
} = productEndpoints;

// const response = await apiConnector("POST", "http://localhost:5000/api/upload", formData, {


export const uploadImg = async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result = null;
    try{
        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
          formData.append("images", data[i]);
        }
        const response = await apiConnector("POST", UPLOAD_IMAGE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          })
          result = response?.data?.data?.secure_url;
          // console.log(response?.data?.data?.secure_url)

    }catch (error) {
        console.log("UPLOAD API ERROR............", error)
        toast.error(error.message)
        
      }
      toast.dismiss(toastId)
      return result
}