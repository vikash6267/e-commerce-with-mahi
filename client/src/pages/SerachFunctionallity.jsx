import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { displayMoney } from '../helper/utills';
import ProductCard from '../components/common/ProductCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameter from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query') || '';
    setQuery(searchTerm);
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [location.search]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/product/search?query=${searchQuery}`);
      setResults(response.data.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Error fetching search results');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
    handleSearch(query);
  };

  return (
    <div className="w-full  mx-auto p-6 bg-white shadow-lg rounded-lg mt-[120px] min-h-[100vh]">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {loading && 
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
      }
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      {results.length > 0 ? (
       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-[20px] "
        >
                   {/* <div className="grid lg:grid-cols-4 grid-cols-2 flex-wrap justify-start px-6 text-wrap">
          {results.map((product) => (
            <motion.div
              key={product._id}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
     
          <Link
            to={`/product/${product?.slug}`}
            className="w-64 mx-2 flex flex-col"
          >
            <div className="relative w-36 lg:w-60 md:w-60 h-full overflow-hidden">
              <div>
                <img
                  src={product?.images[1]?.url}
                  alt=""
                  className="object-cover h-full w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                />
                <img
                  src={product?.images[0]?.url}
                  alt=""
                  className="object-cover h-full w-full absolute top-0 left-0 opacity-0 transition duration-500 ease-in-out transform hover:opacity-100 hover:scale-105"
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="font-montserrat text-[13px] text-gray-600 text-wrap leading-tight">
                {product.title}
              </p>
              <p className="font-montserrat text-[12px] text-gray-600 -mt-1">
                {displayMoney(product.price)}
              </p>
            </div>
          </Link>
        
            </motion.div>
          ))}
      </div> */}
 
 
      <div className="  w-11/12 mx-auto  grid lg:grid-cols-4 gap-4 sm:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-2 text-black">
            {results &&
                results?.map((product) => (
                  <ProductCard key={product?._id} products={product} />
                ))}
            </div>
        </motion.div>
      ):(
       <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Products Found</h2>
        <p className="text-gray-500 mb-6">We couldn't find any products matching your search. Please try different keywords or explore our latest collections.</p>
        <Link to="/allProduct" className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
          View Latest Collections
        </Link>
      </div>
    </div>
      )}
    </div>
  );
};

export default Search;
