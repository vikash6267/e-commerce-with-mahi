import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { RxCountdownTimer } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { compareOtp } from '../../../serivces/operations/user';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';

function VerifyOtp({ sendOtp, email }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [userPresent, setUserPresent] = useState(true);

  const handleVerify = async (e) => {
    e.preventDefault();
    const res = await dispatch(compareOtp(otp, email, navigate));
    console.log(res)

    setUserPresent(res);
  };

  const renderInput = (props) => (
    <input
      {...props}
      placeholder="-"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        margin: '0 6px',
        border: '2px solid #C4C4C4',
        background: '#F3F4F6',
        color: '#1F2937',
        fontSize: '18px',
        fontWeight: '600',
        textAlign: 'center',
      }}
    />
  );

  return (
    <div>
      {userPresent ? (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center ">
          {loading ? (
            <div>
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="max-w-[500px]  p-4 lg:p-8">
              <h1 className="text-gray-900 font-semibold text-2xl lg:text-3xl">
                Verify Email
              </h1>
              <p className="text-gray-700 text-sm lg:text-base my-4">
                A verification code has been sent to you. Enter the code below
              </p>
              <form onSubmit={handleVerify}>
              <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  type='number'
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-gray-300 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
                <button
                  type="submit"
                  className="w-full bg-yellow-500 py-3 px-4 mt-6 rounded-md text-gray-900 font-semibold transition duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Verify Email
                </button>
              </form>
              <div className="mt-6 flex items-center justify-between">
                <button
                  className="flex items-center text-blue-900 gap-x-2"
                  onClick={sendOtp}
                >
                  <RxCountdownTimer />
                  Resend it
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Signup email={email} />
      )}
    </div>
  );
}

export default VerifyOtp;
