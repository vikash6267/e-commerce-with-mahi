import React from 'react';
import { useSelector } from 'react-redux';

function AllProduct() {
  const { allProduct } = useSelector(state => state.product);

  return (
    <div className="min-h-screen bg-gray-100 mt-[64px] min-w-[95vw] mx-auto ">

    <div className=' lg:hidden sm:hidden md:hidden'>
        Mobile category
    </div>
      <div className="min-h-full  ">
        <div className="flex ">
          {/* Categories Sidebar */}
          <div className="w-[25%]  bg-gray-200 p-4 mobile min-h-screen">
            {/* Add your category sidebar content here */}
            Category Sidebar
          </div>

          {/* Product Listing */}
          <div className="lg:w-[75%] w-full  bg-white p-4 min-h-screen">
            {/* Add your product listing content here */}
            Product Listing
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
