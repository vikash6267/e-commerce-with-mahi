import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { GrShop } from "react-icons/gr";
import Cart from "../../pages/Cart";
import { handleIsCartOpen } from "../../slices/cartSlice";
import Navbar from "./Navbar/Navbar";
import SearchBar from "../core/Search";
import { handleIsMenuOpen } from "../../slices/product";
import { CiMenuFries } from "react-icons/ci";
import { RiMenu4Fill } from "react-icons/ri";
import { useLocation } from 'react-router-dom';

function Header() {
  const { token } = useSelector((state) => state.auth);
  const { totalItems, isCartOpen } = useSelector((state) => state.cart);
  const { isMenuOpen } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const location = useLocation();
  const isCheckoutPage = location.pathname === '/checkout';

  

  useEffect(() => {
    if (isCartOpen || isMenuOpen) {
      const scrollY =
        document.documentElement.style.getPropertyValue("--scroll-y");
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
    };
  }, [isCartOpen, isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <>
{!isCheckoutPage &&
<div className="  ">
      <div className="border-b-2 fixed w-full z-50 bg-black">
        <div className="w-11/12 mx-auto flex h-[60px] items-center justify-between relative">
          <div className="flex  items-center ">
            <RiMenu4Fill
              className="text-2xl cursor-pointer text-white"
              onClick={() => dispatch(handleIsMenuOpen())}
            />
            <Navbar isOpen={isMenuOpen} setIsOpen={handleIsMenuOpen} />
          </div>
          <div className=" ">
            <Link to="/">
              <div className="text-xl font-bold tracking-wider text-center text-white ">
                ABSENCE
              </div>
            </Link>
          </div>
          <div className="flex">
            {/* <SearchBar /> */}
            {/* <div className="min-h-[80%] bg-slate-800 min-w-[1px] mx-3"></div> */}
            <div className="flex items-center gap-3">
              {/* {token ? (
              <Link to="/profile" className="mobile">
                <FaUserAlt />
              </Link>
            ) : (
              <Link to="/login" className="mobile">
                <p className="text-lg">Login</p>
              </Link>
            )} */}

              {/* <div className="mobile">
              <Link to="/wishlist" title="Wishlist">
                <FaRegHeart className="text-lg" />
              </Link>
            </div> */}

              <Cart />

              <div
                title="Cart"
                className=" cursor-pointer"
                onClick={() => dispatch(handleIsCartOpen())}
              >
                <div className="text-lg ">
                  {/* <GrShop className="text-lg " /> */}
                  {/* <img
                    src="https://cdn.shopify.com/s/files/1/0566/7192/8425/files/BO_GIF.gif?v=1704694751"
                    alt=""
                    className=""
                    width={60}
                  /> */}

                  <svg
                    className=" text-white"
                    aria-hidden="true"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="white"
                  >
                    <path d="M14.1,1.6C14,0.7,13.3,0,12.4,0H2.7C1.7,0,1,0.7,0.9,1.6L0.1,13.1c0,0.5,0.1,1,0.5,1.3C0.9,14.8,1.3,15,1.8,15h11.4c0.5,0,0.9-0.2,1.3-0.6c0.3-0.4,0.5-0.8,0.5-1.3L14.1,1.6zM13.4,13.4c0,0-0.1,0.1-0.2,0.1H1.8c-0.1,0-0.2-0.1-0.2-0.1c0,0-0.1-0.1-0.1-0.2L2.4,1.7c0-0.1,0.1-0.2,0.2-0.2h9.7c0.1,0,0.2,0.1,0.2,0.2l0.8,11.5C13.4,13.3,13.4,13.4,13.4,13.4z M10,3.2C9.6,3.2,9.2,3.6,9.2,4v1.5c0,1-0.8,1.8-1.8,1.8S5.8,6.5,5.8,5.5V4c0-0.4-0.3-0.8-0.8-0.8S4.2,3.6,4.2,4v1.5c0,1.8,1.5,3.2,3.2,3.2s3.2-1.5,3.2-3.2V4C10.8,3.6,10.4,3.2,10,3.2z"></path>
                  </svg>

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
    </div>}
   </>
  );
}

export default Header;
