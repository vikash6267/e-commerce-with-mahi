import React, { useState } from 'react';

const MyFormComponent = () => {
  // Define state variables to manage form inputs
  const [sizes, setSizes] = useState([
    { size: 'S', isChecked: false },
    { size: 'M', isChecked: false },
    { size: 'L', isChecked: false },
    { size: 'XL', isChecked: false }
  ]);

  // Function to handle input change for size
  const handleSizeChange = (index) => {
    const newSizes = [...sizes];
    newSizes[index].isChecked = !newSizes[index].isChecked;
    setSizes(newSizes);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the sizes data, such as sending it to a server
    const selectedSizes = sizes.filter(size => size.isChecked).map(size => size.size);
    console.log(selectedSizes);
  };

  return (
    <form onSubmit={handleSubmit}>
      {sizes.map((size, index) => (
        <div key={index}>
          <label>
            {size.size}:
            <input
              type="checkbox"
              checked={size.isChecked}
              onChange={() => handleSizeChange(index)}
            />
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyFormComponent;
