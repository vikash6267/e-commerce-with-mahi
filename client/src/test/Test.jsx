import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RedirectPrompt from '../components/core/Cart/RedirectPromt'; // Adjust path if necessary

const Checkout = () => {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const navigate = useNavigate();
  const [nextPath, setNextPath] = useState('');

  // Function to handle input change and mark form as dirty
  const handleInputChange = () => {
    setIsFormDirty(true);
  };

  // Function to handle navigation with prompt if form is dirty
  const handleNavigate = (path) => {
    if (isFormDirty) {
      setNextPath(path);
      setIsPromptOpen(true);
    } else {
      navigate(path);
    }
  };

  // Function to handle prompt close
  const handlePromptClose = () => {
    setIsPromptOpen(false);
  };

  // Function to handle prompt confirmation
  const handlePromptConfirm = (reason) => {
    console.log('Reason for not completing the payment:', reason);
    setIsFormDirty(false); // Reset form dirty state
    navigate(nextPath); // Navigate to the next path after confirmation
    setIsPromptOpen(false); // Close the prompt after navigation
  };

  // Use useEffect to add event listener for hashchange
  useEffect(() => {
    const handleHashChange = () => {
      if (isFormDirty) {
        const confirmLeave = window.confirm('Are you sure you want to leave this page? Your changes may not be saved.');
        if (!confirmLeave) {
          // Revert hash change if user cancels
          window.history.pushState(null, '', window.location.href.split('#')[0]);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isFormDirty]);

  return (
    <div className="mt-48">
      <h1>Checkout Page</h1>
      <input type="text" onChange={handleInputChange} placeholder="Enter details..." />
      <button onClick={() => handleNavigate('/')}>Go to Home</button>
      {isPromptOpen && <RedirectPrompt isOpen={isPromptOpen} onClose={handlePromptClose} onConfirm={handlePromptConfirm} />}
    </div>
  );
};

export default Checkout;
