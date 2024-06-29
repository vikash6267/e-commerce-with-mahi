import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-8 text-center transition duration-300 z-0 ">
      <div className="container mx-auto px-4 mt-7">
        <div className=" text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Join Our Newsletter</h3>
          <form className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500"
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 transition duration-300">Subscribe</button>
          </form>
        </div>
        <div className="flex flex-wrap justify-between mt-8">
          {/* Brand Information */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">A B S E N C E</h3>
            <p>Discover the latest trends in fashion and stay ahead with our exclusive collection.</p>
          </div>
          {/* Customer Service Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Customer Service</h3>
            <ul className=' '>
              <li><a href="#help" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300">Help Center</a></li>
              <li><a href="#returns" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300">Returns</a></li>
              <li><a href="#shipping" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300">Shipping</a></li>
              <li><a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300">Contact Us</a></li>
            </ul>
          </div>
          {/* Social Media Icons */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Follow Us</h3>
            <div className="flex space-x-4 justify-center">
              <a href="https://facebook.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com/absence.fashion" target='_blank' className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300">
                <FaInstagram size={24} />
              </a>
             
            </div>
          </div>
        </div>
        {/* Newsletter Signup */}
      </div>
      <div className="bg-white dark:bg-gray-700 py-4 transition duration-300 text-center">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center flex-wrap gap-2">
            <p className="mb-0 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              Made with <span className="text-red-500"><FaHeart /></span> by 
              <a 
                href="https://mahitechnocrafts.in/" 
                target='_blank' 
                rel="noopener noreferrer" 
                className="text-blue-900 dark:text-blue-300 underline"
              >
                Mahi Technocrafts
              </a>
            </p>
            <p className="mb-0 text-gray-700 dark:text-gray-300">©Absence 2024 All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
