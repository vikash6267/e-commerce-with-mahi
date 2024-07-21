// src/components/NotFoundPage.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa'; // Icon for 404
// import errorImage from '../assets/404-error.svg'; // Add your own 404 error image here
const NotFoundPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* <img src={errorImage} alt="404 Error" className="w-1/2 max-w-xs mx-auto mb-6" /> */}
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
