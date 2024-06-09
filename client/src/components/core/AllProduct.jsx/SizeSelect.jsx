import React from "react";

const SizeSelectionModal = ({ sizes, onSelectSize, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Size </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSelectSize(size)}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeSelectionModal;
