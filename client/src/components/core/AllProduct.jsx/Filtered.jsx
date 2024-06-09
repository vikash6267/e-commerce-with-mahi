import React, { useState, useRef } from "react";
import { IoShirtSharp, IoMaleSharp, IoFemaleSharp, IoTransgenderSharp } from "react-icons/io5";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Backdrop from "../Cart/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { handleIsFilterOpen } from "../../../slices/product";

function Filtered({  sizes, genders, handleSizeSelect, handleGenderSelect, selectedSizes, selectedGender, handleSubmit }) {
  const ref = useRef(null);
  const dispatch = useDispatch()
  const { isFilterOpen } = useSelector(
      (state) => state.product
    );
    
    useOnClickOutside(ref, () => dispatch(handleIsFilterOpen(false)));
    return (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          <Backdrop onClick={() => dispatch(handleIsFilterOpen(false))} />
          <motion.div
            id="cart"
            ref={ref}
            className="fixed top-0 right-0 bottom-0 lg:w-[350px] w-[240px] bg-white p-4 z-50 max-h-screen "
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >

          <div className=" w-11/12 mx-auto mt-[30px] ">
          <h2 className=" w-full text-center mb-[20px] font-bold  ">Filter </h2>

            <form onSubmit={handleSubmit} className=" flex  flex-col   ">
            
         

            <div className=" ">
            <div className="mb-4">
                <details open>
                  <summary className="font-bold flex items-center justify-between cursor-pointer">
                    <span>Size</span>
                    
                  </summary>
                  {sizes.map((size, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={size}
                        value={size}
                        onChange={() => handleSizeSelect(size)}
                        checked={selectedSizes.includes(size)}
                        className="hidden"
                      />
                      <label htmlFor={size} className={`cursor-pointer flex items-center ${selectedSizes.includes(size) ? 'text-blue-500 font-bold' : ''}`}>
                        {selectedSizes.includes(size) ? (
                          <IoCheckmarkCircleSharp className="text-blue-500 mr-2" size={18} />
                        ) : (
                      <IoCheckmarkCircleSharp className="text-gray-500 mr-2" size={18} />

                        )}
                        {size}
                      </label>
                    </div>
                  ))}
                </details>
              </div>
              <div className="mb-4">
                <details open>
                  <summary className="font-bold flex items-center justify-between cursor-pointer">
                    <span>Gender</span>
                  
                  </summary>
                  <select
                    onChange={(e) => handleGenderSelect(e.target.value)}
                    value={selectedGender}
                    className="w-full mt-2 py-1 px-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All</option>
                    {genders.map((gender, index) => (
                      <option key={index} value={gender}>
                      
                      
                      {gender} </option>
                    ))}
                  </select>
                </details>
              </div>

            </div>
            
                          <button
                type="submit"
                onClick={()=>dispatch(handleIsFilterOpen(false))}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Apply Filter
              </button>
            </form>
          </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Filtered;
