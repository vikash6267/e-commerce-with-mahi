import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const SummaryDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSummary = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full p-4 bg-gray-800 text-white rounded-xl mt-[200px]">
      <button
        type="button"
        onClick={toggleSummary}
        className="w-full bg-gray-900 hover:bg-gray-950 p-2 rounded-xl font-bold text-left flex justify-between items-center"
      >
        <span>Summary Details</span>
        <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      {isOpen && (
        <div className="mt-3 p-3 bg-gray-700 rounded-xl">
          {/* Replace the content below with actual summary details */}
          <p>This is where your summary details will be displayed.</p>
          <p>Detail 1: Value</p>
          <p>Detail 2: Value</p>
          <p>Detail 3: Value</p>
        </div>
      )}
    </div>
  );
};

export default SummaryDetails;
