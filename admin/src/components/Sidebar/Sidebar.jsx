import { useState } from "react";
import { VscSignOut, VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../data/dashboard-links.js";
import { logout } from "../../serivces/operations/user.js";
import ConfirmationModal from "./ConfirmationModal";
import { motion } from "framer-motion";
import * as Icons from "react-icons/vsc";

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const{token,sessionID} = useSelector(state=>state.profile)

  const toggleSidebar = () => setCollapsed(!collapsed);
  
  const Adminlogout = async () => {
  try {
    
    await dispatch(logout(token,sessionID,navigate))
  } catch (error) {
    
  }
}
  return (
    <motion.div
      className={`flex flex-col h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 ${collapsed ? "w-16" : "w-56"} min-w-fit`}
      initial={{ width: "w-16" }}
      animate={{ width: collapsed ? "w-16" : "w-56" }}
      transition={{ duration: 0.3 }}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-white bg-gray-800 hover:bg-gray-700 rounded-md mt-2 ml-2 flex items-center justify-center"
      >
        {collapsed ? <VscChevronRight className="text-xl" /> : <VscChevronLeft className="text-xl" />}
      </button>

      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        {/* Logo and Branding */}
        {!collapsed && (
          <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
            <span className="text-xl font-bold">A B S E N C E</span>
          </div>
        )}

        {/* Sidebar Links */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden py-4">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;

            const IconComponent = Icons[link.icon];

            if (!IconComponent) {
              console.error(`Icon component ${link.icon} not found`);
              return null;
            }

            return (
              <motion.div
                key={link.id}
                className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer ${collapsed ? "justify-center" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(link.path)}
                // Ensure pointer events are enabled
                style={{ pointerEvents: 'auto' }}
              >
                <IconComponent className="text-xl mr-3" />
                {!collapsed && <span className="text-lg">{link.name}</span>}
              </motion.div>
            );
          })}
        </div>

        {/* Logout */}
        <div className="flex flex-col mt-auto py-4 px-2 border-t border-gray-700">
          <button
            onClick={
            //   setConfirmationModal({
            //     text1: "Are you sure?",
            //     text2: "You will be logged out of your account.",
            //     btn1Text: "Logout",
            //     btn1Handler: () => dispatch(logout(navigate)),
            //     btn2Text: "Cancel",
            //     btn2Handler: () => setConfirmationModal(null),
            //   });
            // }
            // dispatch(logout(navigate))
            Adminlogout
            }
            className="flex items-center px-4 py-2 text-sm font-medium text-red-400 hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer"
          >
            <VscSignOut className="text-lg mr-2" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </motion.div>
  );
};

export default Sidebar;
