import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWish } from '../serivces/operations/product';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

function Wishlist() {
  const dispatch = useDispatch();
  const { wishlistProduct } = useSelector((state) => state.wishlist);
  const { token } = useSelector((state) => state.auth);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWish(productId, token, dispatch);
  };

  useEffect(() => {
    console.log(wishlistProduct);
  }, []);

  return (
    <div className='container mx-auto  px-4 min-h-[90vh] mt-[70px]'>
      <h1 className='text-3xl font-semibold mb-8 text-center'>Wishlist</h1>
      <div className='flex flex-wrap'>
       {


        wishlistProduct?.length === 0 ? (
          <div className=' h-[50vh] w-full flex items-center justify-center'>No Wishlist Product Found</div>
        ):(
          wishlistProduct.map((product) => (
          <div key={product._id} className='border p-4 rounded-md mb-4'>
            <div className='relative w-24 h-24 overflow-hidden rounded-full mb-4'>
              <img
                src={product.images[0]?.url}
                alt={product.title}
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div className='mt-4'>
              <h2 className='text-lg font-semibold'>{product.title}</h2>
              <p className='text-sm text-gray-600 mt-2'>{product.description}</p>
              <p className='text-lg font-semibold mt-2'>Price: Rs. {product.price}</p>
            </div>
            <div className='flex justify-between items-center mt-4'>
              <Link
                to={`/product/${product._id}`}
                className='text-blue-600 hover:underline cursor-pointer'
              >
                View Product
              </Link>
              <button
                onClick={() => handleRemoveFromWishlist(product._id)}
                className='flex items-center text-red-600 hover:text-red-800 focus:outline-none'
              >
                <FaTrash className='mr-2' />
                Remove
              </button>
            </div>
          </div>
        ))
        )
       }
      </div>
    </div>
  );
}

export default Wishlist;
