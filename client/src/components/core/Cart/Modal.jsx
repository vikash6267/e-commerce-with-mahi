// Modal.js
import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ show, handleClose, children }) => {
  const showHideClassName = show ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50" : "hidden";

  return (
    <div className={showHideClassName}>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 lg:w-[calc(100vw-10rem)] md:w-[calc(100vw-10rem)] w-[calc(100vw-10px)]"
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: "0" }}
        exit={{ opacity: 0, y: "-100vh" }}
        transition={{ duration: 0.5 }}
      >
        {children}
        <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded" onClick={handleClose}>Close</button>
      </motion.div>
    </div>
  );
};

export default Modal;
