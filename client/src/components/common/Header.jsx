import React from "react";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { GrShop } from "react-icons/gr";



import SearchBar from "../core/Search";

function Header() {
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  return (
  <div className="  ">
      <div className="border-b-2 fixed w-full z-50 bg-white">
      <div className="w-11/12 mx-auto flex h-[60px] items-center justify-between">
        <div className="flex gap-4 items-center">
          <RxHamburgerMenu className="text-2xl cursor-pointer" />
          <Link to="/"><div className="text-2xl font-bold tracking-wider">ABSENCE</div></Link>
        </div>

        <div className="flex">
          <SearchBar />
          <div className="min-h-[80%] bg-slate-800 min-w-[1px] mx-3"></div>
          <div className="flex items-center gap-3">
            {token ? (
              <Link to="/profile">
                <FaUserAlt />
              </Link>
            ) : (
              <Link to="/login">
                <p className="text-lg">Login</p>
              </Link>
            )}

            <div className="mobile">
              <Link to="/wishlist" title="Wishlist">
                <FaRegHeart className="text-lg" />
              </Link>
            </div>

            <div className="mobile">
              <Link to="/cart" title="Cart">
           
             
             <div className="text-lg ">
             <GrShop className="text-lg relative" />

                  {totalItems > -1 && (
                    <p className="absolute top-8 right-[3.3rem] z-20 rounded-full text-sm bg-yellow-300 ">
                      {totalItems}
                    </p>
                  )}
                </div>
              </Link>
          
            </div>



          </div>
        </div>
      </div>

  
    </div>

  </div>
  );
}

export default Header;
