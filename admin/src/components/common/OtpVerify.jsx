import React, { useState } from 'react';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { login, verify } from '../../serivces/operations/user'; // Assuming resendOtp is your resend function
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function VerifyOTP({ email,password }) {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await dispatch(verify(email, otp,navigate));
      console.log('OTP:', otp);
    } catch (error) {
      setMessage('Verification failed. Please try again.');
    }
  };

  const handleResendOtp = async () => {

    const response  = await dispatch(login(email,password));

    if(response){
        setResendMessage('A new OTP has been sent to your email.');
    }
   else setResendMessage('Failed to resend OTP. Please try again later.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <form onSubmit={handleVerify} className="flex flex-col">
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaEnvelope className="mr-3 text-gray-500" />
            <input
              type="email"
              value={email}
              readOnly
              className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaLock className="mr-3 text-gray-500" />
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Verify OTP
          </button>
          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        </form>
        <button
          onClick={handleResendOtp}
          className="w-full mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Resend OTP
        </button>
        {resendMessage && <p className="text-blue-500 text-sm mt-2">{resendMessage}</p>}
      </div>
    </div>
  );
}

export default VerifyOTP;
