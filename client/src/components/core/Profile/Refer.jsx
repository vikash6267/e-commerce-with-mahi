import React from 'react';
import { FaFacebook, FaWhatsapp, FaCopy } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function ShareComponent() {
const {user}=useSelector(state=> state.profile)
    const link = `https://absence-psrxgry9r-vikash-maheshwaris-projects.vercel.app/login?refer=${user.referralCode}`
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  };

  return (
<div className="flex flex-col justify-center items-center space-y-4 md:space-y-0 md:flex-row md:justify-center md:items-center mt-[70px] gap-11">
  <button onClick={shareOnFacebook} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center">
    <FaFacebook className="mr-2" /> Share on Facebook
  </button>
  <button onClick={shareOnWhatsApp} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center">
    <FaWhatsapp className="mr-2" /> Share on WhatsApp
  </button>
  <button onClick={copyToClipboard} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center">
    <FaCopy className="mr-2" /> Copy Link
  </button>
</div>

  );
}

export default ShareComponent;
