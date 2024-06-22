import React, { useState } from 'react';

const MultiSelectDropdown = ({ title, options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (value) => {
    let newSelectedOptions;
    if (selectedOptions.includes(value)) {
      newSelectedOptions = selectedOptions.filter(option => option !== value);
    } else {
      newSelectedOptions = [...selectedOptions, value];
    }
    setSelectedOptions(newSelectedOptions);
  };

  const toggleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options.map(option => option.value));
    }
  };

  const isAllSelected = selectedOptions.length === options.length;

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown button */}
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title} ({selectedOptions.length}) <span className="ml-2">&#x25BE;</span>
        </button>
      </div>

      {/* Dropdown items */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {/* Select all checkbox */}
          <div className="px-4 py-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={isAllSelected}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">Select All</span>
            </label>
          </div>

          {/* Options list */}
          <div className="py-1">
            {options.map(option => (
              <div key={option.value} className="px-4 py-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
