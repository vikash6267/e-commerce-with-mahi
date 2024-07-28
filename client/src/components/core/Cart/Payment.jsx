// import React, { useEffect, useState } from 'react';
// import { setStep } from '../../../slices/paymentSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { BuyProduct } from '../../../serivces/operations/order';
// import { useNavigate } from 'react-router-dom';

// function Payment({ payable, coupon }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { addressData } = useSelector(state => state.payment);
//   const { user } = useSelector(state => state.profile);
//   const { token } = useSelector(state => state.auth);
//   const { cart } = useSelector(state => state.cart);

//   const [coinUsage, setCoinUsage] = useState(0);
//   const [finalPayable, setFinalPayable] = useState(payable);
//   const maxCoinUsage = Math.floor(Math.min(payable * 0.2, user.totalCredit));

//   useEffect(() => {
//     setFinalPayable(payable - coinUsage);
//   }, [coinUsage, payable]);

//   const handleCoinUsageChange = (e) => {
//     const value = parseInt(e.target.value, 10);
//     if (!isNaN(value) && value >= 0 && value <= maxCoinUsage) {
//       setCoinUsage(value);
//     }
//   };

//   const paymentHandle = () => {
//     console.log(cart)
//     BuyProduct(token, cart, coupon, addressData, payable, user,coinUsage, navigate, dispatch);
//   };

//   useEffect(() => {
//     console.log(user);
//   }, []);

//   return (
//     <div className='flex flex-col h-full justify-between'>
//     <h2 className='text-center font-bold text-2xl lg:text-3xl mt-10 mb-6'>Payment Methods</h2>
//     <div className='text-center'>
//       <p className='mb-2'>Original Payable Amount: {payable}</p>
//       <p className='mb-2'>Coin Balance: {user.totalCredit}</p>
//       <p className='mb-2'>Maximum Coins You Can Use: {maxCoinUsage}</p>
//       <div className='flex items-center justify-center mt-4'>
//         <label htmlFor='coinUsage' className='mr-2'>Use Absence Coins:</label>
//         <input
//           type='number'
//           id='coinUsage'
//           className='p-1 border min-w-[90px] border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
//           value={coinUsage}
//           onChange={handleCoinUsageChange}
//           min={0}
//           max={maxCoinUsage}
//           aria-label='Coin Usage'
//         />
//       </div>
//     </div>
//     <div className='text-center mt-4'>
//       <p className='font-bold mb-2'>Payable Amount after Coin Usage: {finalPayable}</p>
//     </div>
//     <div className='flex justify-center mt-6'>
//       <button
//         onClick={paymentHandle}
//         className='bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300'
//       >
//         Pay
//       </button>
//     </div>
//     <div className='flex justify-center mt-4'>
//       <button
//         onClick={() => dispatch(setStep(1))}
//         className='bg-gray-300 text-black px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300'
//       >
//         Back
//       </button>
//     </div>
//   </div>
  
//   );
// }

// export default Payment;




import React, { useEffect, useState } from 'react';
import { setStep } from '../../../slices/paymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BuyProduct } from '../../../serivces/operations/order';
import { useNavigate } from 'react-router-dom';
import coin from "../../../assests/logo/coin.png";
import { displayMoney } from '../../../helper/utills';


function Payment({ payable, coupon }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addressData } = useSelector(state => state.payment);
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);

  const [coinUsage, setCoinUsage] = useState(0);
  const [finalPayable, setFinalPayable] = useState(payable);
  const maxCoinUsage = Math.floor(Math.min(payable * 0.2, user.totalCredit));

  useEffect(() => {
    setFinalPayable(payable - coinUsage);
  }, [coinUsage, payable]);

  const handleUseAbsenceCoins = () => {
    const fiftyPercentOfCoins = user.totalCredit * 0.5;
    const fifteenPercentOfPayable = payable * 0.15;
    const usage = Math.min(fiftyPercentOfCoins, fifteenPercentOfPayable);
    setCoinUsage(Math.floor(usage));
  };

  const handleRemoveAbsenceCoins = () => {
    setCoinUsage(0); // Reset coin usage
  };

  const paymentHandle = () => {
    BuyProduct(token, cart, coupon, addressData, payable, user, coinUsage, navigate, dispatch);
  };

  useEffect(() => {
    console.log(user);
  }, []);

  const remainingCoins = user.totalCredit - coinUsage;

  return (
    <div className='flex flex-col h-full justify-between'>
      <h2 className='text-center font-bold text-2xl lg:text-3xl mt-10 mb-6'>Payment Methods</h2>
      <div className='text-center'>
        <p className='mb-2 '>Total Payable Amount: {displayMoney(payable)}</p>
        <p className='mb-2'>Absence Coin Balance: {user.totalCredit} <img src={coin} className="rounded-full inline h-6" alt="Coin" /></p>
        <p className='mb-2'>Maximum Coins You Can Use: {maxCoinUsage} <img src={coin} className="rounded-full inline h-6" alt="Coin" /></p>
        <div className='flex items-center justify-center mt-4'>
          {coinUsage === 0 ? (
            <button
              onClick={handleUseAbsenceCoins}
              className='ml-4 bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-800 transition duration-300'
            >
              Use Absence Coins?
            </button>
          ) : (
            <button
              onClick={handleRemoveAbsenceCoins}
              className='ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400 transition duration-300'
            >
              Remove Absence Coins
            </button>
          )}
        </div>
        {/* Show coin usage and remaining coins only if some coins are used */}
        {coinUsage > 0 && (
          <div className='mt-4'>
            <p className='mb-2'>Coins Used: {coinUsage}</p>
            <p className='mb-2'>Remaining Absence Coins: {remainingCoins}</p>
          </div>
        )}
      </div>
      <div className='text-center mt-4'>
        <p className='font-bold mb-2'>Payable Amount after Coin Usage: {finalPayable} {"INR"}</p>
      </div>
      <div className='flex justify-center mt-6'>
        <button
          onClick={paymentHandle}
          className='bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300'
        >
          Pay
        </button>
      </div>
      <div className='flex justify-center mt-4'>
        <button
          onClick={() => dispatch(setStep(1))}
          className='bg-gray-300 text-black px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300'
        >
          Back To Address
        </button>
      </div>
    </div>
  );
}

export default Payment;
