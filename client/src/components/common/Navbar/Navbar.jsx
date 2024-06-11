import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Backdrop from "../../core/Cart/Backdrop";
import { FaSun, FaCloudSun, FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavbarLinks } from "../../../constant/menubar";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDoubleDown } from "react-icons/fa";
import { logout } from "../../../serivces/operations/user";
import LogoutModal from "../LogoutModal";
import AOS from "aos";
import "aos/dist/aos.css";


function getGreeting() {
  const currentHour = new Date().getHours();
  let greeting = "";
  let icon = null;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
    icon = <FaSun className="text-yellow-500" />;
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
    icon = <FaCloudSun className="text-yellow-400" />;
  } else {
    greeting = "Good Evening";
    icon = <FaMoon className="text-blue-500" />;
  }

  return { greeting, icon };
}

function Navbar({ isOpen, setIsOpen }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const ref = useRef(null);
  useOnClickOutside(ref, () => dispatch(setIsOpen(false)));
  const { user } = useSelector((state) => state.profile);

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };
  const { greeting, icon } = getGreeting();

  const handleClose = () => {
    console.log("Backdrop clicked, closing navbar");
    dispatch(setIsOpen(false));
  };

  useEffect(() => {
    console.log(isOpen);
    AOS.init({  once: true });
    AOS.refresh();

    return () => {
      AOS.refreshHard();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 z-40 `}
        >
          <Backdrop onClick={handleClose} />
          <motion.div
            id="cart"
            ref={ref}
            className="fixed top-0 left-0 bottom-0 lg:w-[350px] w-[320px] bg-white p-4 z-40 border-r-2 shadow-2xl text-lg overflow-y-auto hidden-scrollbar"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="w-11/12 mx-auto mt-6 uppercase" key="navbar" >
              <div className="flex flex-col  text-lg gap-1 items-center">
                <div>
                  <div className=" flex justify-center">
                    <img
                      src={user?.image}
                      alt=""
                      width={50}
                      className=" rounded-full"
                         data-aos="fade-up"
                    />
                  </div>

                  <div className="flex items-center" data-aos="fade-up" data-aos-delay="100">
                    <div className="mr-2">{icon}</div>
                    <div className="flex flex-col gap-3 ">{greeting}</div>
                  </div>
                </div>

                <div className=" flex flex-col gap-1">
                  <div className=" flex  gap-1" data-aos="fade-up" data-aos-delay="200">
                    {user && <p>{user.name}</p>}
                  </div>
                </div>
              </div>
              <div className="flex  w-full mt-5 flex-col">
               
                <ul className="flex flex-col  justify-center  text-[13px] ">
                  {NavbarLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      data-aos="fade-up"
                      data-aos-delay={`${200 + index * 50}`}
                      className="transition-colors duration-300 hover:text-blue-600 border-b-2  p-[10px] tracking-wide "
                      onClick={() => dispatch(setIsOpen(false))}
                    >
                      <p>{link.title}</p>
                    </Link>
                  ))}


                  {user ? (
                  <>
                    <Link
                      to="profile"
                      onClick={() => dispatch(setIsOpen(false))}
                      className="   font-semibold flex items-center gap-2  p-[7px]  "
                    data-aos="fade-up" data-aos-delay="600"
                    >
                      {" "}
                      My Profile{" "}
                      <FaAngleDoubleDown className=" -rotate-45 text-blue-500" />
                    </Link>
                    <button
                      onClick={() => {
                        setShowLogoutModal(true);
                        dispatch(setIsOpen(false));
                      }}
                      className=" text-start  text-red-500 pl-[7px]"
                           data-aos="fade-up" data-aos-delay="650"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="-ml-[9px] my-2 p-[7px]"
                    onClick={() => dispatch(setIsOpen(false))}
                       data-aos="fade-up" data-aos-delay="600"
                  >
                    {" "}
                    Login
                  </Link>
                )}
                </ul>


         
           
          
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div key="logout-modal">
        {showLogoutModal && (
          <LogoutModal
            onClose={() => setShowLogoutModal(false)}
            onConfirmLogout={logoutHandler}
            setIsOpen={setIsOpen}
            
          />
        )}
      </div>
    </AnimatePresence>
  );
}

export default Navbar;
