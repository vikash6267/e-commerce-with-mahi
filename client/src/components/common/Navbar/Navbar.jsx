import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Backdrop from "../../core/Cart/Backdrop";
import { FaSun, FaCloudSun, FaMoon } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { NavbarLinks } from "../../../constant/menubar";
import { Link } from "react-router-dom";

function getGreeting() {
  const currentHour = new Date().getHours();
  let greeting = '';
  let icon = null;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning';
    icon = <FaSun className="text-yellow-500" />;
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon';
    icon = <FaCloudSun className="text-yellow-400" />;
  } else {
    greeting = 'Good Evening';
    icon = <FaMoon className="text-blue-500" />;
  }

  return { greeting, icon };
}

function Navbar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch()
  const ref = useRef(null);
  useOnClickOutside(ref, () => dispatch(setIsOpen(false)));
  const { user } = useSelector((state) => state.profile);

  const { greeting, icon } = getGreeting();

  const handleClose = () => {
    console.log("Backdrop clicked, closing navbar");
    dispatch(setIsOpen(false))
  };

  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed top-0 left-0 right-0 bottom-0 z-50 overflow-hidden`}>
          <Backdrop onClick={handleClose} />
          <motion.div
            id="cart"
            ref={ref}
            className="fixed top-0 left-0 bottom-0 lg:w-[350px] w-[270px] bg-white p-4 z-40 border-r-2 shadow-2xl"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="w-11/12 mx-auto mt-6">
              <div className="flex flex-col items-center text-2xl">
                <div className="flex items-center">
                  <div className="mr-2">{icon}</div>
                  <div className="flex flex-col gap-3">{greeting}</div>
                </div>
                <div>
                  {user && <p>{user.name}</p>}
                </div>
              </div>
              <div className="flex justify-center-center w-full mt-14">
                <ul className="flex flex-col items-center justify-center gap-4">
                  {NavbarLinks.map((link, index) => (
                    <Link key={index} to={link.path} className="transition-colors duration-300 hover:text-blue-600" onClick={()=>dispatch(setIsOpen(false))}>
                      <p>{link.title}</p>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Navbar;
