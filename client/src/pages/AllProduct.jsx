import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayMoney } from "../helper/utills";
import { Link } from 'react-router-dom';
import { IoGridSharp, IoListSharp } from "react-icons/io5";
import { IoShirtSharp } from "react-icons/io5";
import { IoMaleSharp, IoFemaleSharp, IoTransgenderSharp } from "react-icons/io5";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Filtered from '../components/core/AllProduct.jsx/Filtered';

import { handleIsFilterOpen } from '../slices/product';
// Exporting available sizes and genders
export const sizes = ["S", "M", "L", "XL", "XXL"];
export const genders = ["Male", "Female", "Unisex"];

function AllProduct({ products }) {
  const { allProduct } = useSelector(state => state.product);
  const [numOfColumns, setNumOfColumns] = useState(4); // Default value
  const [selectedSizes, setSelectedSizes] = useState([]); // Initialize selected sizes as empty array
  const [selectedGender, setSelectedGender] = useState(''); // Initialize selected gender as empty string
  const [filteredProducts, setFilteredProducts] = useState(products || allProduct); // Initialize filtered products with all products
  const dispatch = useDispatch()
//mobile 
const[isFilter,setIsFilter] = useState(false)

const handleFilter =()=>{
  console.log(isFilter)

  setIsFilter(!isFilter)
}

  // Function to handle size selection
  const handleSizeSelect = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Function to handle gender selection
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  // Function to filter products based on selected sizes and gender
// Function to filter products based on selected sizes and gender
const filterProducts = () => {
  const filtered = (products || allProduct).filter(product => {
    // Check if product's size matches with selected sizes
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    // Check if product's gender matches with selected gender
    const genderMatch = !selectedGender || product.gender?.some(g => selectedGender.includes(g));
    return sizeMatch && genderMatch;
  });
  setFilteredProducts(filtered);
};


  // Function to handle submit button click
  const handleSubmit = (e) => {
    e.preventDefault();
    filterProducts();
  };

  return (
    <div className="min-h-screen  mt-[64px] min-w-[100vw] mx-auto ">
      <div className='min-h-full '>
        <div className="flex ">
        <div className='w-1/5 mt-10 pl-5 mobile'>
  {/* Size and Gender filter */}

    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
    <div className="mb-4">
      <details open>
        <summary className="font-bold flex items-center justify-between cursor-pointer">
          <span>Size</span>
          <IoShirtSharp className="text-blue-500" size={20} />
        </summary>
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={size}
              value={size}
              onChange={() => handleSizeSelect(size)}
              checked={selectedSizes.includes(size)}
              className="hidden" // Hide the default checkbox
            />
            <label htmlFor={size} className={`cursor-pointer flex items-center ${selectedSizes.includes(size) ? 'text-blue-500 font-bold' : ''}`}>
              {selectedSizes.includes(size) && (
                <IoCheckmarkCircleSharp className="text-blue-500 mr-2" size={18} />
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
          <IoMaleSharp className="text-blue-500" size={20} />
          <IoFemaleSharp className="text-pink-500" size={20} />
          <IoTransgenderSharp className="text-purple-500" size={20} />
        </summary>
        <select
          onChange={(e) => handleGenderSelect(e.target.value)}
          value={selectedGender}
          className="w-full mt-2 py-1 px-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          {genders.map((gender, index) => (
            <option key={index} value={gender}>{gender}</option>
          ))}
        </select>
      </details>
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
    >
      Apply Filter
    </button>
  </form>
</div>
          {/* Product Listing */}
          <div className="lg:w-[78%] w-full bg-white p-4 min-h-screen">
            {/* Product view options */}
            <div className="flex justify-end mb-4">

            <div className="flex justify-center relative  lg:hidden sm:hidden md:hidden ">
  <button
    onClick={()=>dispatch(handleIsFilterOpen())}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
  >
    Filter
  </button>


  <Filtered
  setIsFilter={setIsFilter}
  isFilter={isFilter}
  sizes={sizes}
  genders={genders}
  selectedSizes={selectedSizes}
  selectedGender={selectedGender}
  handleSizeSelect={handleSizeSelect}
  handleGenderSelect={handleGenderSelect}
  handleSubmit={handleSubmit}
/>



</div>


           <div className='flex mobile'>   <IoGridSharp
                className={`cursor-pointer ${numOfColumns === 4 ? 'text-blue-500' : 'text-gray-400'}`}
                size={24}
                onClick={() => setNumOfColumns(4)}
              />
              <IoListSharp
                className={`cursor-pointer ${numOfColumns === 1 ? 'text-blue-500' : 'text-gray-400'}`}
                size={24}
                onClick={() => setNumOfColumns(1)}
              /></div>
            </div>

           

            {/* Product listing */}
          {
            filteredProducts.length === 0 ? <>
              Not product are found 
            </>: 

            <div className={`grid lg:grid-cols-${numOfColumns} lg:px-6 gap-2 sm:grid-cols-2 md:grid-cols-3 grid-cols-2`}>
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                >
                  <div className='flex flex-col gap-3 mt-6'>
                    <div className='h-full min-w-[10rem] overflow-hidden relative'>
                      <img src={product.images[0].url} alt='' className='object-cover h-full w transition duration-500 ease-in-out transform hover:-translate-y-1' />
                      <img src={product.images[1].url} alt='' className='object-cover h-full w absolute top-0 left-0 opacity-0 transition duration-500 ease-in-out transform hover:opacity-100' />
                    </div>
                    <div>
                      <p className='font-montserrat lg:text-lg text-gray-600'>{product.title}</p>
                      <p className='font-montserrat lg:text-sm text-gray-600'> {displayMoney(product.price)}</p>
                      <div className='flex gap-2 text-sm text-red-500'>
                        {product.sizes?.map((size, index) => (
                          <div key={index} className='relative '>
                            {size}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
