import React, { useState } from 'react';
import { login } from '../serivces/operations/user';
import { useDispatch } from 'react-redux';
import VerifyOTP from '../components/common/OtpVerify';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validate,setValidate] = useState(false)
    const dispatch = useDispatch()
    
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    const response  = await dispatch(login(email,password))
    console.log(response)
    setValidate(response)
  };

  return (
    <>
    {validate ? (
      <VerifyOTP email={email} password={password} />
    ) : (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg border border-gray-300">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col ">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-lg font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )}
  </>
   
  );
}

export default Login;
