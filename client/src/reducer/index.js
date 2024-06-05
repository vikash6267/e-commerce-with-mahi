import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import cartReducer from "../slices/cartSlice"
import profileReducer from "../slices/profileSlice"
import productReducer from "../slices/product"
import paymentReducer from "../slices/paymentSlice"
import wishlistReducer from "../slices/wishListSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  product: productReducer,
  payment :paymentReducer,
  wishlist:wishlistReducer

  })
  
  export default rootReducer