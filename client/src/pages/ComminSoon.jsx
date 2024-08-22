import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { FaClock, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const ComingSoon = () => {
  const launchDate = new Date('2024-09-01T00:00:00');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading,setLoading] = useState(false)
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      // await axios.post('https://e-commerce-with-mahi-vt9j.onrender.com/api/v1/product/comming', { email });
      await axios.post('https://demo.mahitechnocrafts.in/api/v1/product/comming', { email });
      // await axios.post('http://localhost:4000/api/v1/product/comming', { email });
      setMessage('Thank you! We will notify you when our site is live.');
      setEmail('');
    } catch (error) {
      setMessage('Sorry, something went wrong. Please try again later.');
    }
    setLoading(false)

  };

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">

        <h2 className="text-2xl font-semibold mb-12">Coming Soon</h2>
        <p className="text-2xl mb-12">We are launching in:</p>
        <div className="flex space-x-8 text-center mb-12">
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold">{days}</span>
            <span>Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold">{hours}</span>
            <span>Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold">{minutes}</span>
            <span>Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold">{seconds}</span>
            <span>Seconds</span>
          </div>
        </div>

        <form onSubmit={handleEmailSubmit} className="w-full max-w-lg">
          <div className="flex items-center border-b border-white py-2">
            <FaEnvelope className="text-xl text-white mr-3" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
             
             {
              loading ? <>Lodingg...</> : "Notify Me"
             } 
            </button>
          </div>
        </form>
        {message && <p className="mt-6 text-green-400">{message}</p>}
      </div>
    );
  };

  return <Countdown date={launchDate} renderer={renderer} />;
};

export default ComingSoon;
