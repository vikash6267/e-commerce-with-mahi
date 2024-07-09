import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const reasonsList = [
  "I found a better price or product elsewhere",
  "I want to add or modify items in my cart",
  "I find pricing too high or unclear",
  "I am not sure about quality and return/exchange policy",
  "I am facing issues in applying coupons",
  "I am not sure about the delivery dates",
  "Others"
];

const PaymentQuit = ({ setShowDialog }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const navigate = useNavigate();

  const handleReasonChange = (reason) => {
    setSelectedReasons((prevSelected) =>
      prevSelected.includes(reason)
        ? prevSelected.filter((r) => r !== reason)
        : [...prevSelected, reason]
    );
  };

  const handleConfirm = () => {
      setShowDialog(false);
    if (selectedReasons.length > 0) {
      saveReasons(selectedReasons);
    }
    navigate("/"); // Navigate back
  };

  const handleCancel = () => {
    setShowDialog(false);
    window.history.pushState(null, '', window.location.href); // Reset state to stay on the same page
  };

  const saveReasons = (reasons) => {
    // You can replace this with a call to your backend service to save the reasons
    console.log('Selected reasons:', reasons);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-lg w-full">
        <p className="text-xl font-semibold text-center mb-4">Wait, are you sure?</p>
        <p className="text-center mb-4">Products in huge demand might run Out of Stock</p>
        <p className="text-center mb-4">Can you let us know the reason(s)?</p>
        <form className="text-left mb-4">
          {reasonsList.map((reason, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={reason}
                checked={selectedReasons.includes(reason)}
                onChange={() => handleReasonChange(reason)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="ml-2">{reason}</label>
            </div>
          ))}
        </form>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg text-white ${
              selectedReasons.length === 0 ? 'bg-gray-400 ' : 'bg-red-500 hover:bg-red-600'
            }`}
          
          >
            {selectedReasons.length === 0 ? 'Skip and Exit' : 'Submit and Exit'}
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentQuit;
