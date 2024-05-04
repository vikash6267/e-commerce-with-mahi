import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    allProduct: localStorage.getItem("allProduct")
      ? JSON.parse(localStorage.getItem("allProduct"))
      : [],
  }


  
const productSlice = createSlice({
    name:"product",
    initialState
})