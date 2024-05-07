import React from 'react';
import { displayMoney } from "../../../helper/utills";

function TestSlide({ products }) {
  return (
    <div className='w-full overflow-x-auto py-6 mt-6'>
      <div className='flex flex-nowrap justify-start px-6'>
        {products.map((product) => (
          <div key={product._id} className='w-64 mx-2 flex flex-col gap-3'>
            <div className='h-full w-60 overflow-hidden relative'>
              <img src={product.images[0].url} alt='' className='object-cover h-full w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110' />
              <img src={product.images[1].url} alt='' className='object-cover h-full w-full absolute top-0 left-0 opacity-0 transition duration-500 ease-in-out transform hover:opacity-100 hover:scale-105' />
            </div>
            <div>
              <p className='font-montserrat text-lg text-gray-600'>{product.title}</p>
              <p className='font-montserrat text-sm text-gray-600'>Rs. {displayMoney(product.price)}</p>
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
        ))}
      </div>
    </div>
  );
}

export default TestSlide;
