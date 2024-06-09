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
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 z-40 overflow-hidden`}
        >
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
              <div className="flex flex-col  text-lg gap-1 items-center">
                <div>
                  <div className=" flex justify-center">
                    <img
                      src={user?.image}
                      alt=""
                      width={50}
                      className=" rounded-full"
                    />
                  </div>

                  <div className="flex items-center">
                    <div className="mr-2">{icon}</div>
                    <div className="flex flex-col gap-3 ">{greeting}</div>
                  </div>
                </div>

                <div className=" flex flex-col gap-1">
                  <div className=" flex  gap-1">
                    {user && <p>{user.name}</p>}
                  </div>
                </div>
              </div>
              <div className="flex  w-full mt-14 flex-col">
                {user ? (
                  <>
                    <Link
                      to="profile"
                      onClick={() => dispatch(setIsOpen(false))}
                      className=" -ml-3 mb-4 font-semibold flex items-center gap-2  "
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
                      className="-ml-[9px] my-2 text-red-500"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="-ml-[9px] my-2"
                    onClick={() => dispatch(setIsOpen(false))}
                  >
                    {" "}
                    Login
                  </Link>
                )}
                <ul className="flex flex-col  justify-center gap-4">
                  {NavbarLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="transition-colors duration-300 hover:text-blue-600"
                      onClick={() => dispatch(setIsOpen(false))}
                    >
                      <p>{link.title}</p>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div>
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
