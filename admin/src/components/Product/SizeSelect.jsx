import React, { useState } from 'react';

const SizeSelect = ({selectedSizes,setSelectedSizes}) => {
  // const [selectedSizes, setSelectedSizes] = useState([]);
  const [availableSizes, setAvailableSizes] = useState(['S', 'M', 'L', 'XL', 'XXL']);
  const [sizeInput, setSizeInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddSize = () => {
    if (sizeInput && quantityInput) {
      const newSize = { size: sizeInput, quantity: Number(quantityInput) };

      if (editIndex !== null) {
        // Update size if in edit mode
        const updatedSizes = selectedSizes.map((size, index) =>
          index === editIndex ? newSize : size
        );
        setSelectedSizes(updatedSizes);
        setEditIndex(null);
      } else if (!selectedSizes.some(size => size.size === sizeInput)) {
        // Add new size if not in edit mode
        setSelectedSizes([...selectedSizes, newSize]);
      }

      setSizeInput('');
      setQuantityInput('');
    }
  };

  const handleEditSize = (index) => {
    const sizeToEdit = selectedSizes[index];
    setSizeInput(sizeToEdit.size);
    setQuantityInput(sizeToEdit.quantity);
    setEditIndex(index);
  };

  const handleDeleteSize = (index) => {
    setSelectedSizes(selectedSizes.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product Sizes</h2>
      <div className="mb-4">
        <label htmlFor="size" className="block text-gray-700 text-sm font-semibold mb-2">Size:</label>
        <select
          id="size"
          value={sizeInput}
          onChange={(e) => setSizeInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a size</option>
          {availableSizes
            .filter(size => !selectedSizes.some(selected => selected.size === size))
            .map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-gray-700 text-sm font-semibold mb-2">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantityInput}
          onChange={(e) => setQuantityInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p
        onClick={handleAddSize}
        className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {editIndex !== null ? 'Update Size' : 'Add Size'}
      </p>
      <ul className="mt-4 space-y-2">
        {selectedSizes.map((size, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded-md border border-gray-300 flex justify-between items-center">
            {size.size} - {size.quantity}
            <div className="ml-4">
              <button
                onClick={() => handleEditSize(index)}
                className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteSize(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SizeSelect;
