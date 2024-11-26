import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const ComingSoon = () => {
  const launchDate = new Date('2024-12-05T00:00:00'); // Set a placeholder date for countdown
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://demo.mahitechnocrafts.in/api/v1/product/comming', { email });
      setMessage('Thank you for signing up! You are now part of our exciting giveaway.');
      setEmail('');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 min-w-[100vw] text-center mt-[50px]">
        <h1 className="text-4xl font-extrabold mb-4 text-center">🎉 Launching Our Exciting Giveaway! 🎉</h1>
        <p className="text-lg mb-8 text-center">
          Be ready for something exciting! We are launching soon with exclusive rewards for participants.
        </p>
        <p className="text-2xl mb-8">Countdown to Launch:</p>

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

        <p className="text-lg mb-8 text-center">
          Enter your email to be a part of our <b>exciting giveaway</b>. Don’t miss out on amazing rewards!
        </p>

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
              {loading ? 'Submitting...' : 'Join Giveaway'}
            </button>
          </div>
        </form>

        {message && <p className="mt-6 text-green-400 text-center">{message}</p>}
      </div>
    );
  };

  return <Countdown date={launchDate} renderer={renderer} />;
};

export default ComingSoon;
