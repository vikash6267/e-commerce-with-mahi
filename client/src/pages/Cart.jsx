import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { displayMoney,calculateTotal } from "../helper/utills";
import { BsCartX } from 'react-icons/bs';
import EmptyView from '../components/core/Cart/EmptyView';
import CartItems from '../components/core/Cart/CartItems';
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import {handleIsCartOpen} from "../slices/cartSlice"
import useOnClickOutside from '../hooks/useOnClickOutside';

function Cart() {

    const {cart,total,totalItems,isCartOpen} = useSelector((state) => state.cart);
    const cartQuantity = cart.length;
    const calculateCartTotal = total;
    const displayCartTotal = displayMoney(calculateCartTotal);
    const delveryCharge  = displayMoney(60)



  const ref = useRef(null)
  useOnClickOutside(ref, () => dispatch(handleIsCartOpen(false)))


    const dispatch = useDispatch()
 // total discount
 const cartDiscount = cart.map(item => {
    return (item.product.price - item.product.highPrice) * item.quantity;
   
});

const calculateCartDiscount = calculateTotal(cartDiscount);
const displayCartDiscount = displayMoney(calculateCartDiscount);


// final total amount

const displayTotalAmount = displayMoney(total);


  return (

<div className={`   inset-0 z-[1000] !mt-0   bg-white bg-opacity-10 backdrop-blur-sm ${isCartOpen ? " fixed" : "hidden"}  transition-all duration-500 ease-in-out      `}>


<div id="cart"     ref={ref} className={`   h-screen  z-50 bg-white p-4 ${isCartOpen ? "lg:w-[450px] w-[320px] absolute right-0 top-0" : "w-0" }   transition-all duration-500 ease-in-out `}>
                
<div className=' ml-5 font-bold border-b-2 h-[50px] flex items-center justify-between  '>
                  <p className='font-bold text-2xl'>  CART</p>
               <div className=' mr-4'> 
               <button onClick={()=>dispatch(handleIsCartOpen(false))}>
                  <HiOutlineArrowNarrowRight className=' text-end' />
                   <p className=' font-normal'>Back </p>
                  </button>
               </div>
                </div>
                <div className="container flex  ">


              
                    {
                        cartQuantity === 0 ? (
                            <EmptyView
                                icon={<BsCartX />}
                                msg="Your Cart is Empty"
                            
                                btnText="Start Shopping"
                            />
                        ) : (
                            <div className="  flex w-full justify-between flex-col h-screen ">
                                <div className="  w-full  bg-bg-color-2 max-h-[400px]  py-4 overflow-x-hidden overflow-y-auto scrollbar-w-[0.35vw]  " >
                                    {
                                        cart.map((item,ind) => (
                                            <CartItems
                                                key={ind}
                                                {...item}
                                            />
                                        ))
                                    }
                                </div>

                                <div className="  w-full mb-[5.2rem] text-gray-500 font-montserrat ">
                                    <div className=" flex flex-col">
                                        <h3 className='  font-montserrat text-sm font-medium'>
                                            Total  &nbsp;
                                            ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} )
                                        </h3>
                                        <div className=" flex flex-col gap-3 font-montserrat text-sm" >
                                            {/* <div className="price flex justify-between">
                                                <span className=' font-bold'> Price</span>
                                                <b>{displayCartTotal}</b>
                                            </div> */}
                                            {/* <div className=" flex justify-between ">
                                            <span className=' font-bold'>Discount</span>
                                                <b className='text-green-700'> {displayCartDiscount}</b>
                                            </div> */}
                                            {/* <div className=" flex justify-between">
                                            <span className=' font-bold'>Delivery</span>
                                                <b>{delveryCharge}</b>
                                            </div> */}
                                            <div className=" border-gray-600 "></div>
                                            <div className=" flex justify-between font-medium">
                                                <b><small>Total Price</small></b>
                                                <b>{displayTotalAmount}</b>
                                            </div>
                                        </div>
                                        <button type="button" className=" w-11/12 bg-gray-900 hover:bg-gray-950 hover:scale-105 text-white p-2 mt-3 rounded-xl  mx-auto font-bold ">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
</div>


 ) 
}

export default Cart