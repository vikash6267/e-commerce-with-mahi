import React from 'react'
import CheckoutForm from '../components/core/Cart/CheckoutForm'
import { useEffect } from 'react';
function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=' mt-[60px] min-h-screen mb-[100px] '>


      <CheckoutForm></CheckoutForm>
    </div>
  )
}

export default Checkout