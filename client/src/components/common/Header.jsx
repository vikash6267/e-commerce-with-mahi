import React from "react";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";


import { MobileLinks } from "../../constant/mobileNav";

import SearchBar from "../core/Search";
function Header() {
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <div className="border-b-2">
      <div className=" w-11/12 mx-auto flex h-[60px] items-center justify-between   ">
        <div className=" flex gap-4 items-center">
          <RxHamburgerMenu className=" text-2xl cursor-pointer" />

          <div className=" text-2xl font-bold tracking-wider">ABSENCE</div>
        </div>

        <div className="flex ">
          <SearchBar />

          <div className=" min-h-[80%] bg-slate-800 min-w-[1px] mx-3"></div>

          <div className=" flex items-center gap-3">
            {token ? (
              <Link to="/profile">
                <FaUserAlt />
              </Link>
            ) : (
              <Link to="/login">
                <p className=" text-lg ">Login</p>
              </Link>
            )}

            {/* {
  user && user.role == 'user' && <Link to="/wishlist">
<FaRegHeart />
</Link>
} */}

            <div className="mobile">
              <Link to="/wishlist" title="Wishlist">
                <FaRegHeart className=" text-lg" />
              </Link>
            </div>

            <div className="mobile">
              <Link to="/wishlist" title="Wishlist">
                <HiOutlineShoppingBag className=" text-lg relative " />
                <p className=" absolute top-1 right-14  z-20  rounded-full   ">
                  {totalItems > 0 && totalItems}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div className=" bottom-0 absolute w-full border-2 p-2 lg:hidden sm:hidden md:hidden ">
      <ul className=" w-11/12 mx-auto flex justify-between ">
      {
  MobileLinks.map((link)=>(
    <li key={link.id}>
   <Link to={link.path}>
   <div className=" flex flex-col items-center font-semibold">
        {link.icon}
        <p>{link.title}</p>
      </div>
   </Link>
    </li>
  ))
}
      </ul>


      </div>
    </div>
  );
}

export default Header;
