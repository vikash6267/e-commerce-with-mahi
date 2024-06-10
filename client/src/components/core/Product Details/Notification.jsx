import React, { useState } from 'react';
import Swal from 'sweetalert2';
export default function NotificationModal({ closeModal, size }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send email to server)
    // console.log(`Email submitted for size ${size}: ${email}`);
    Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: `You will be notified when size ${size} is back in stock.`,
      });
    closeModal(); // Close the modal after form submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Notify Me</h2>
        <p className="mb-4">Size {size} is currently unavailable. Enter your email below to be notified when it's back in stock.</p>
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            className="border p-2 rounded w-full mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
