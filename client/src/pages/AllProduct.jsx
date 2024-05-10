import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { displayMoney } from "../helper/utills";
import { Link } from 'react-router-dom';
import { IoShirtSharp } from "react-icons/io5";
import { IoGridSharp, IoListSharp } from "react-icons/io5";

function AllProduct() {
  const { allProduct } = useSelector(state => state.product);
  const [numOfColumns, setNumOfColumns] = useState(3); // Default value

  return (
    <div className="min-h-screen bg-gray-100 mt-[64px] min-w-[100vw] mx-auto ">
      <div className='lg:hidden sm:hidden md:hidden'>
          Mobile category
          <div>
            isme lagana hai view two three four icons from reacr icons
          </div>
      </div>
      <div className="min-h-full ">
        <div className="flex ">
          {/* Categories Sidebar */}
          <div className="w-[20%]  bg-gray-100 p-4 mobile min-h-screen">
            {/* Add your category sidebar content here */}
            <div className='w-full  pt-4 mt-6 pl-6'>
              Category Sidebar
            </div>
          </div>

          {/* Product Listing */}
          <div className="lg:w-[78%] w-full bg-white p-4 min-h-screen">
            {/* Product view options */}
            <div className="flex justify-end mb-4">
              <IoGridSharp
                className={`cursor-pointer ${numOfColumns === 4 ? 'text-blue-500' : 'text-gray-400'}`}
                size={24}
                onClick={() => setNumOfColumns(4)}
              />
              <IoListSharp
                className={`cursor-pointer ${numOfColumns === 1 ? 'text-blue-500' : 'text-gray-400'}`}
                size={24}
                onClick={() => setNumOfColumns(1)}
              />
            </div>

            {/* Add your product listing content here */}
            <div className='w-full pt-4 '>
              <div className={`grid lg:grid-cols-${numOfColumns} lg:px-6 gap-2 sm:grid-cols-2 md:grid-cols-3`}>
                {allProduct.map((product) => (
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
                              {/* <div className='absolute bottom-0 left-0 w-0 border-b-2 border-black hover:w-10 transition-all duration-300'></div> */}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
