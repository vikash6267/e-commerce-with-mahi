import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

function ContactUs() {
  return (
    <div className="min-h-[90] mt-16 bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Get in Touch</h2>
        
        <div className="flex items-center mb-4">
          <FaInstagram className="text-pink-600 text-3xl mr-4" />
          <a 
            href="https://www.instagram.com/absence.fashion?igsh=MWZ6eGI2ZmZjZmVkbQ=="
            className="text-lg text-gray-700 hover:text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            @absence.fashion
          </a>
        </div>
        
        <div className="flex items-center mb-4">
          <FaWhatsapp className="text-green-600 text-3xl mr-4" />
          <div className="text-lg text-gray-700">
            <p>+91 88891 02080</p>
            <p>+91 78692 12078</p>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-gray-600">Feel free to reach out to us for any queries or collaborations. We are here to help you!</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
