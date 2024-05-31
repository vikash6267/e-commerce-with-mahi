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

function Header() {
  const { token } = useSelector((state) => state.auth);
  const { totalItems ,isCartOpen} = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{
    console.log(isOpen)
      },[isOpen])

    
  return (
  <div className="  ">
      <div className="border-b-2 fixed w-full z-50 bg-white">
      <div className="w-11/12 mx-auto flex h-[60px] items-center justify-between">
        <div className="flex gap-4 items-center ">
          <RxHamburgerMenu className="text-2xl cursor-pointer" onClick={()=> setIsOpen(true)} />
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

          <Link to="/"><div className="text-2xl font-bold tracking-wider ">ABSENCE</div></Link>
        </div>

        <div className="flex">
          <SearchBar />
          <div className="min-h-[80%] bg-slate-800 min-w-[1px] mx-3"></div>
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
           <GrShop className="text-lg relative" />

                {totalItems > -1 && (
                  <p className="absolute top-8 right-[3.3rem] z-20 rounded-full text-sm bg-yellow-300 ">
                    {totalItems}
                  </p>
                )}
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
