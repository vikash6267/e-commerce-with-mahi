import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayMoney, calculateTotal } from "../helper/utills";
import { BsCartX } from "react-icons/bs";
import EmptyView from "../components/core/Cart/EmptyView";
import CartItems from "../components/core/Cart/CartItems";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { handleIsCartOpen } from "../slices/cartSlice";
import { setCheckout } from "../slices/paymentSlice";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Backdrop from "../components/core/Cart/Backdrop";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, total, totalItems, isCartOpen } = useSelector(
    (state) => state.cart
  );
  const cartQuantity = cart.length;
  const calculateCartTotal = total;
  const displayCartTotal = displayMoney(calculateCartTotal);
  const deliveryCharge = displayMoney(60);

  const ref = useRef(null);
  useOnClickOutside(ref, () => dispatch(handleIsCartOpen(false)));

  const dispatch = useDispatch();

  // total discount
  const cartDiscount = cart.map((item) => {
    return (item.product.price - item.product.highPrice) * item.quantity;
  });

  const calculateCartDiscount = calculateTotal(cartDiscount);
  const displayCartDiscount = displayMoney(calculateCartDiscount);

  // final total amount
  const displayTotalAmount = displayMoney(total);

  const checkoutHandel = () => {
      dispatch(handleIsCartOpen(false));
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <Backdrop onClick={() => dispatch(handleIsCartOpen(false))} />
          <motion.div
            id="cart"
            ref={ref}
            className="fixed top-0 right-0 bottom-0 lg:w-[450px] w-[320px] bg-white p-4 z-50 max-h-screen overflow-hidden "
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="ml-5 font-bold border-b-2 h-[50px] flex items-center justify-between">
              <p className="font-bold text-2xl">CART</p>
              <div className="mr-4">
                <button onClick={() => dispatch(handleIsCartOpen(false))}>
                  <HiOutlineArrowNarrowRight className="text-end" />
                  <p className="font-normal">Back</p>
                </button>
              </div>
            </div>
            <div className="container flex">
              {cartQuantity === 0 ? (
                <EmptyView
                  icon={<BsCartX />}
                  msg="Your Cart is Empty"
                  btnText="Start Shopping"
                />
              ) : (
                <div className="flex w-full justify-between flex-col h-screen">
                  <div className="w-full bg-bg-color-2 h-[400px] py-4 overflow-x-hidden overflow-y-scroll scrollbar-w-[0.35vw]">
                    {cart.map((item, ind) => (
                      <CartItems key={ind} {...item} />
                    ))}
                  </div>

                  <div className="w-full  mb-[180px] lg:mb-[5rem] sm:mb-[5rem] md:mb-[5rem] text-gray-500 font-montserrat">
                    <div className="flex flex-col">
                      <h3 className="font-montserrat text-sm font-medium">
                        Total &nbsp; ({cartQuantity}{" "}
                        {cartQuantity > 1 ? "items" : "item"})
                      </h3>
                      <div className="flex flex-col gap-3 font-montserrat text-sm">
                        <div className="border-gray-600"></div>
                        <div className="flex justify-between font-medium">
                          <b>
                            <small>Total Price</small>
                          </b>
                          <b>{displayTotalAmount}</b>
                        </div>
                      </div>
                 <Link to="/checkout">
                 
<button
  type="button"
  className="checkout-button"
  onClick={checkoutHandel}
  disabled={cartQuantity === 0}
>
  Checkout
</button>



                 </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Cart;
