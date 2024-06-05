import React, { useEffect, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../serivces/operations/user';
import VerifyOtp from '../components/core/Login/VerifyOtp';
import { useLocation } from 'react-router-dom';
import { referCodeKnow } from '../serivces/operations/user';
import { setReferN } from '../slices/authSlice';
import { FaGoogle } from 'react-icons/fa';

function Login() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const refer = queryParams.get('refer');
  const [referName, setReferName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (refer) {
        const result = await referCodeKnow(refer);
        dispatch(setReferN(result?.name));
        setReferName(result?.name);
      }
    };

    fetchData();
  }, [refer]);

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();
    const res = await dispatch(sendOtp(email));
    setEmailSent(res);
  };

  return (<>
  {emailSent ? (
        <VerifyOtp sendOtp={sendOTP} email={email} />
      ) :
  (  <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <AiOutlineMail className="mx-auto h-12 w-auto text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Enter Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">A 6-digit OTP will be sent to this email address</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={sendOTP}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <HiOutlineArrowNarrowRight className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Send OTP
            </button>
          </div>
        </form>
      </div>
      {referName && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md" role="alert">
          <p className="font-semibold">You've been invited by {referName}</p>
        </div>
      )}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Or sign in with</p>
        <button className="flex items-center justify-center mt-4 px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-md shadow-sm hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <FaGoogle className="mr-2" />
          Google
        </button>
      </div>
    </div>)
  }
  </>
  );
}

export default Login;
