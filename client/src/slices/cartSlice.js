import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
    totalCount: localStorage.getItem("totalCount")
    ? JSON.parse(localStorage.getItem("totalCount"))
    : 0,
    isCartOpen : false
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload.quantity);
      const product = action.payload.products;
      const index = state.cart.findIndex((item) => item.product._id === product._id);
    
      let quant = action.payload.quantity !== undefined ? action.payload.quantity : 1;
      let size = action.payload.size !== undefined ? action.payload.size : "S";
    
      if (index >= 0) {
        // Product is already in the cart
        let item = state.cart[index];
        let updated = false;
    
        if (item.size !== size) {
          // Update the size if different
          item.size = size;
          updated = true;
          toast.success(`Product size updated to ${size} in cart`);
        }
        
        if (item.quantity !== quant) {
          // Update the quantity if different
          state.total += Number(product.price * (quant - item.quantity));
          state.totalItems += (quant - item.quantity);
          item.quantity = quant;
          updated = true;
          toast.success("Product quantity updated in cart");
        }
    
        if (!updated) {
          toast.error("Product already in cart");
          return;
        }
    
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      } else {
        // Product is not in the cart, add it
        state.cart.push({product, quantity: quant, size: size});
        state.totalItems++;
        state.total += Number(product.price * quant);
        toast.success("Product added to cart");
    
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      }
    },
    
    
    removeFromCart: (state, action) => {
      const productID = action.payload
      console.log(productID)
      const index = state.cart.findIndex((item) => item.product._id === productID)

      if (index >= 0) {
        // If the product is found in the cart, remove it
        state.totalItems--
        state.total -= Number(state.cart[index].product.price * state.cart[index].quantity)
        state.cart.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("Product removed from cart")
      }
    },
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },

    increanQuantity: (state, action) => {

      const product = action.payload;
    
      const productInCart = state.cart.find((item) => item.product._id === product);
 

      if (productInCart) {
        state.total += Number(productInCart.product.price);
        productInCart.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
      }
    },
    
    decreaseQuantity: (state, action) => {
      const product = action.payload;
      const productInCart = state.cart.find((item) => item.product._id === product);
    

      if(productInCart.quantity == 1){
        toast.error("Product Quantity Atleast 1")
        return
      }
      if (productInCart && productInCart.quantity > 1) {
        state.total -= Number(productInCart.product.price);
        productInCart.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
      }
    },

    // dispatch(changeSize({ productID: productID, size: newSize }));
    
    changeSize: (state, action) => {
      const product = action.payload.productID;
      const productInCart = state.cart.find((item) => item.product.id === product.product.id);
    
      if (productInCart && productInCart.size !== action.payload.size ) {
        state.total -= Number(productInCart.product.price);
        productInCart.size = action.payload.size;
      }else return;
    },
    handleIsCartOpen: (state, action) => {
      return {
        ...state,
        isCartOpen: action.payload !== undefined ? action.payload : !state.isCartOpen
      };
    }
    
  },

  
})

export const { addToCart, removeFromCart, resetCart,increanQuantity,decreaseQuantity,handleIsCartOpen } = cartSlice.actions

export default cartSlice.reducer
