import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../serivces/operations/user';
import { useLocation, useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file for styling
import { useSelector } from 'react-redux';
function Signup({ email }) {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const refer = queryParams.get('refer');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const{userReferalBy} = useSelector(state=> state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: email,
    password: '',
    confirmPassword: '',
    contactNumber:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalFormData = { ...formData };
    
    if (refer) {
      console.log(refer)
      finalFormData.refer = refer;
    }

    dispatch(signUp(finalFormData, navigate));

  };

  return (
    <div className="flex justify-center items-center h-screen mt-[50px]">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md ">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-100 ring-2 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              readOnly
              className="w-full border-gray-300 ring-2 rounded-md py-2 px-3 bg-gray-100 cursor-not-allowed"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Number</label>
            <input
              type="number"
              name="contactNumber"
              value={formData.contactNumber}
              pattern="\d*"
              onChange={handleChange}
              className="min-w-full border-gray-300 ring-2 rounded-md py-2 px-3  "
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-gray-300 ring-2 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border-gray-300 ring-2 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
