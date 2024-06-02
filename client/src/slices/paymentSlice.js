import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  checkout : false,


}




const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
      setStep: (state, action) => {
        state.step = action.payload
      },
      setCheckout: (state, action) => {
        state.checkout = action.payload
      },
    },
  })
  
  export const {
    setStep,
    setCheckout
   
  } = paymentSlice.actions
  
  export default paymentSlice.reducer
  