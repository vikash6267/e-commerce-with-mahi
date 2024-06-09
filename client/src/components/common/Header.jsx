import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { GrShop } from "react-icons/gr";
import Cart from "../../pages/Cart";
import {handleIsCartOpen} from "../../slices/cartSlice"
import Navbar from "./Navbar/Navbar";
import SearchBar from "../core/Search";
import { handleIsMenuOpen } from "../../slices/product";

function Header() {
  const { token } = useSelector((state) => state.auth);
  const { totalItems ,isCartOpen} = useSelector((state) => state.cart);
  const { isMenuOpen} = useSelector((state) => state.product);
  const dispatch = useDispatch()




    
  return (
  <div className="  ">
      <div className="border-b-2 fixed w-full z-50 bg-white">
      <div className="w-11/12 mx-auto flex h-[60px] items-center justify-between relative">
        <div className="flex  items-center ">
          <RxHamburgerMenu className="text-2xl cursor-pointer" onClick={()=> dispatch(handleIsMenuOpen())} />
          <Navbar isOpen={isMenuOpen} setIsOpen={handleIsMenuOpen} />

        </div>
<div className=" ">
<Link to="/"><div className="text-xl font-bold tracking-wider text-center ">ABSENCE</div></Link>

</div>
        <div className="flex">
          {/* <SearchBar /> */}
          {/* <div className="min-h-[80%] bg-slate-800 min-w-[1px] mx-3"></div> */}
          <div className="flex items-center gap-3">
            {token ? (
              <Link to="/profile" className="mobile">
                <FaUserAlt />
              </Link>
            ) : (
              <Link to="/login" className="mobile">
                <p className="text-lg">Login</p>
              </Link>
            )}

            <div className="mobile">
              <Link to="/wishlist" title="Wishlist">
                <FaRegHeart className="text-lg" />
              </Link>
            </div>

          



  <Cart />  

  
     <div  title="Cart" className=" cursor-pointer" onClick={()=>dispatch(handleIsCartOpen())}>
           
             
           <div className="text-lg ">
           {/* <GrShop className="text-lg " /> */}
           <img src="https://cdn.shopify.com/s/files/1/0566/7192/8425/files/BO_GIF.gif?v=1704694751" alt="" className="" width={60} />


                {/* {totalItems > -1 && (
                  <p className="absolute top-1  z-20 rounded-full text-sm  ">
                    {totalItems}
                  </p>
                )} */}
              </div>
            </div>


          
          
        



          </div>
        </div>
      </div>

  
    </div>

  </div>
  );
}

export default Header;
