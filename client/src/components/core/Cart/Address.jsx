import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStep, setAddressData } from '../../../slices/paymentSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

function Address() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
     billingCity: '',
    billingPincode: '',
    billingState: '',
    billingCountry: '',
    billingAddress: '',
    billingPhone: ''
  });
  const [isPincodeValid, setIsPincodeValid] = useState(false);


  const areAllFieldsFilled = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };
  

  useEffect(() => {
    if (formData.billingPincode.length === 6) {
      axios.get(`https://api.postalpincode.in/pincode/${formData.billingPincode}`)
        .then(response => {
          const data = response.data[0];
          if (data.Status === "Success") {
            const locationData = data.PostOffice[0];
            setFormData({
              ...formData,
              billingCity: locationData.Division,
              billingState: locationData.State,
              billingCountry: locationData.Country
            });
            setIsPincodeValid(true);
          } else {
            console.log('Invalid Pincode');
            setIsPincodeValid(false);
          }
        })
        .catch(error => {
          console.error('Error fetching location data:', error);
          setIsPincodeValid(false);
        });
    } else {
      setIsPincodeValid(false);
    }
  }, [formData.billingPincode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (!areAllFieldsFilled()) {
      toast.error('All fields are required');
      return;
    } 
    dispatch(setAddressData(formData));
    dispatch(setStep(2));
  };
  

  return (
    <div className="flex  bg-gray-100 flex-col items-start  ">
      <div className="bg-white shadow-md rounded-lg w-11/12 ">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Billing Address</h2>
        <div className="w-11/12 mx-auto lg:max-h-[calc(100vh-300px)] max-h-[30vh] overflow-y-auto overflow-x-hidden pl-3 ">
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Pincode</label>
            <input
              type="text"
              name="billingPincode"
              placeholder="Pincode"
              value={formData.billingPincode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 font-semibold placeholder:font-normal"
              required
            />
          </div>

          {true && (
            <>
              <div className="mb-4 ">
                <label className="block mb-1 text-gray-600">Address</label>
                <input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  placeholder="e.g. House Number, Colony, Landmark"
                  onChange={handleChange}
                  className="w-11/12 mx-auto border rounded px-3 py-2 font-semibold placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-600">City</label>
                <input
                  type="text"
                  name="billingCity"
                  value={formData.billingCity}
                  placeholder="Enter City"
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none font-semibold focus:ring-2 focus:ring-blue-500 placeholder-gray-400 placeholder:font-light"
                  // disabled
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-600">State</label>
                <input
                  type="text"
                  name="billingState"
                  value={formData.billingState}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="w-full border rounded px-3 py-2 outline-1 ring-1 focus:outline-none focus:ring-2 font-semibold focus:ring-blue-500 placeholder-gray-400"
                  // disabled
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-600">Country</label>
                <input
                  type="text"
                  name="billingCountry"
                  value={formData.billingCountry}
                  onChange={handleChange}
                  placeholder="Enter Country"
                  className="w-full border rounded px-3 py-2 outline-1 ring-1  focus:outline-none focus:ring-2 font-semibold focus:ring-blue-500 placeholder-gray-400"
                  // disabled
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-600 pr-10">Phone</label>
                <input
                  type="number"
                  name="billingPhone"
                  value={formData.billingPhone}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="min-w-[80%]  border rounded px-3 py-2 outline-1 ring-1 font-semibold placeholder:font-normal focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>

           
            </>
          )}
     
        </div>
      </div>
      <div className="flex justify-end mt-6">
  <button
    className="px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    onClick={handleSubmit}
    // disabled={!areAllFieldsFilled()}
  >
    Next
  </button>
</div>

    </div>
  );
}

export default Address;
