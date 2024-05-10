import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProduct: localStorage.getItem("allProduct")
    ? JSON.parse(localStorage.getItem("allProduct"))
    : [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveProduct: (state, action) => {
      state.allProduct = action.payload;
      localStorage.setItem("allProduct", JSON.stringify(state.allProduct));
    },
  },
});

export const { saveProduct } = productSlice.actions;

export default productSlice.reducer;
