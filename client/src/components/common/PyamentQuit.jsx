import React, { useEffect, useState } from 'react';
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

const PaymentQuit = ({ setShowDialog,isOpen=true }) => {
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




  useEffect(() => {
    if ( isOpen) {
      const scrollY =
        document.documentElement.style.getPropertyValue("--scroll-y");
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
    };
  }, [ isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-2 md:p-6 rounded-lg shadow-lg max-w-lg w-[55vw] mx-auto">
        <p className="text-xl font-semibold text-start mb-4 text-[16px]">Wait, are you sure?</p>
       <div className=' text-[14px] mb-5'>
       <p className="text-start ">Products in huge demand might run <span className=' text-orange-500'>Out of Stock</span></p>
       <p className="text-start ">Can you let us know the reason(s)?</p>
       </div>
        <form className="text-left mb-4 max-h-[210px] overflow-y-scroll">
          {reasonsList.map((reason, index) => (
            <div key={index} className="flex items-start mb-2 p-2 border-b-2  text-[14px]">
              <input
                type="checkbox"
                value={reason}
                checked={selectedReasons.includes(reason)}
                onChange={() => handleReasonChange(reason)}
                className="form- h-5 w-5 text-blue-600 "
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
