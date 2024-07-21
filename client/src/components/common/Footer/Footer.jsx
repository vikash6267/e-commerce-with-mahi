import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const links = [
  { to: "/allProduct", text: "Shop" },
  { to: "/about-us", text: "About Us" },
  { to: "/contact", text: "Contact Us" },
  { to: "/contact-us", text: "FAQ" },
  { to: "/shipping-policy", text: "Shipping Policy" },
  { to: "/return-refund-policy", text: "Return/Refund Policy" },
  { to: "/privacy-policy", text: "Privacy Policy" },
  { to: "/terms-conditions", text: "Terms & Conditions" },
  { to: "/help-center", text: "Help Center" },
];


const Footer = () => {
  return (

    <>
<div className=' min-h-[100px] bg-white z-0 '></div>
   
    <footer className=" bg-black  text-gray-300  text-center transition duration-300 z-0 ">
      <div className="container mx-auto px-4 mt-7">
        {/* <div className=" text-center">
          <h3 className="text-xl font-bold  text-white mb-4">Join Our Newsletter</h3>
          <form className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 border-gray-700 rounded-l-md focus:outline-none focus:border-indigo-500 focus:border-indigo-500"
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 transition duration-300">Subscribe</button>
          </form>
        </div> */}
        
        <div className="flex flex-wrap justify-between ">
          {/* Brand Information */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold  text-white mb-2">A B S E N C E</h3>
            <p className='text-[13px]'>Discover the latest trends in fashion and stay ahead with our exclusive collection.</p>
          </div>
          {/* Customer Service Links */}

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
    <ul className="flex gap-6 flex-col uppercase text-[13px]">
      {links.map((link, index) => (
        <li key={index}>
          <Link to={link.to} className="text-gray-300 hover:text-white transition duration-300">
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>

          {/* Social Media Icons */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            {/* <h3 className="text-xl font-bold  text-white mb-2">Follow Us</h3> */}
            <div className="flex space-x-4 justify-center">
              <a href="https://facebook.com" className="text-gray-300  hover: hover:text-white transition duration-300">
                <FaFacebook size={18} />
              </a>
              <a href="https://twitter.com" className="text-gray-300  hover: hover:text-white transition duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="https://www.instagram.com/absence.fashion" target='_blank' className="text-gray-300  hover: hover:text-white transition duration-300">
                <FaInstagram size={18} />
              </a>
             
            </div>
          </div>
        </div>
        {/* Newsletter Signup */}
      </div>
      <div className=" bg-black py-4 transition duration-300 text-center">
        <div className="w-11/12 mx-auto text-center">
          <div className="flex justify-between items-center flex-wrap gap-2 text-[12px] ">
            <p className="mb-0  text-gray-300 flex items-center gap-2 ">
              Made with <span className="text-red-500"><FaHeart /></span>  
              <a 
                href="https://mahitechnocrafts.in/" 
                target='_blank' 
                rel="noopener noreferrer" 
                className=" text-blue-300 underline"
              >
              Mahi Technocrafts
              </a>
            </p>
            <p className="mb-0  text-gray-300">©Absence 2024 All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>

    </>
  );
};

export default Footer;
