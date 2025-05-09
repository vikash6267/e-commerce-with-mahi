// CheckoutForm.js
import React, { useEffect, useRef, useState } from 'react';
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import { displayMoney , calculateTotal} from '../../../helper/utills';
import { FiShoppingCart } from "react-icons/fi";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { fetchCoupon } from '../../../serivces/operations/product';
import Address from './Address';
import Payment from './Payment';
import { Link, useNavigate } from 'react-router-dom';
import RedirectPrompt from './RedirectPromt';
import PaymentQuit from '../../common/PyamentQuit';
import { FaArrowLeft } from "react-icons/fa";

const CheckoutForm = ({handleClose}) => {
  const { cart, total, totalItems, isCartOpen } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(true);
  const [payable,setPayable] = useState(total)
  //Coupon
  const [showRedirectPrompt, setShowRedirectPrompt] = useState(false); // State to manage showing the redirect prompt
  const [couponName,setCouponName] = useState('')
  const [coupon,setCoupon] = useState(false)
  const [couponValue,setCouponValue] = useState(0)
  const [couponValid,setCouponValid] = useState(true)









  const [showDialog, setShowDialog] = useState(false);
  const handleBackButtonClick = useRef(null);




  
  // Set the current function to handle the back button click
  handleBackButtonClick.current = () => {
    setShowDialog(true);
  };

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      handleBackButtonClick.current();
    };

    window.history.pushState(null, '', window.location.href); // Push state to detect back button press

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);



 





  
  const displayTotalAmount = displayMoney(total);

  const totalHighPrice = cart.reduce((acc, curr) => acc + curr.product.highPrice, 0);
const totalDiscount = displayMoney(totalHighPrice)


// useEffect(()=>{

// },[])
  const toggleSummary = () => {
    setIsOpen(!isOpen);
  };

    const { step } = useSelector((state) => state.payment)

    const steps = [
      {
        id: 1,
        title: "Shipping Address",
      },
      {
        id: 2,
        title: "Payment",
      },
      
    ]

    const handleCoupon = async () => {
      try {
        const response = await fetchCoupon(couponName);
    
        if (response.success) {
          const discount = response?.data?.discount;
          const discountType = response?.data?.discountType;
          let finalDiscount = 0;
    
          // Calculate the final discount based on the discount type
          if (discountType === 'percentage') {
            finalDiscount = (total * discount) / 100;
          } else if (discountType === 'fixed') {
            finalDiscount = discount;
          }
    
          setCouponValue(finalDiscount);
          setCoupon(true);
          setCouponValid(true);
          setPayable(total - finalDiscount);
        } else {
          setCouponValid(false);
        }
      } catch (error) {
        console.log(error);
        setCouponValid(false);
      }
    };
    

    useEffect(() => {
      window.scrollTo(0, 0); 
    }, [step]);



  return (
   <div className=' w-screen flex flex-wrap-reverse  checkout font-montserrat  '>
{/* left */}



{showDialog && (
        <PaymentQuit
          message='Are you sure you want to leave this page? Your order details may not be saved.'
        
          setShowDialog={setShowDialog}
        />
      )}


<div className=' w-11/12 mx-auto flex flex-wrap-reverse'>
  <div className=' absolute top-2 hover:scale-110 cursor-pointer'>
  <FaArrowLeft onClick={()=>setShowDialog(true)} />

  </div>
<div className=' lg:w-[65%]  w-screen border-r-2 '>
   
    {/* Render specific component based on current step */}
    {step === 1 && <Address />}
    {step === 2 && <Payment payable={payable} coupon={couponName} />}
  </div>





{/* right */}
    <div className='   lg:w-[35%]  w-full '>



    <div>

    <div className="w-full lg:p-4  rounded-xl text-black ">
      <button
        type="button"
        onClick={toggleSummary}
        className="w-full  p-2 rounded-xl font-bold text-left flex justify-between items-center "
      >
        <div className='flex items-center gap-5'>  <FiShoppingCart /> Order Summary Details</div>
        <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      {isOpen && (
        <div className=" p-3 max-h-[110px] overflow-x-hidden overflow-y-auto scrollbar-w-[0.35vw]     ">
         

         <ul className=' flex flex-col gap-3 '>
         {
          cart.map((item,ind)=>(
            <li key={ind} className=' border p-2'>
              <div className=' flex gap-2'>
                <div className='w-[25%] border-r-2 pr-3'>
            <div to={`/${item.product.slug}`} onClick={handleClose} >
       

                
              <img src={item.product.images[0]?.url} alt="product-img " className=' '   />
          
            </div>

                </div>



                <div>
                <p className=' text-[15px] font-semibold'>{item.product.title}</p>
<p className=' text-[12px] lg:text-[14px]  '>{"Price-"}{"  "}{displayMoney(item?.product?.price)}</p>

<p className=' text-[12px] lg:text-[14px] '>{"Size-"}{item.size}</p>
<p className=' text-[12px] lg:text-[14px]'>{"Quantity-"}{item.quantity}</p>


                </div>
              </div>
            </li>
          ))
         }
         </ul>
        </div>
      )}





    <div>

    <div className='mt-[20px] font-montserrat' >

<div className=' flex w-full justify-between px-6 text-[13px]'>Subtotal <span> {displayTotalAmount}</span></div>
<div className=' flex w-full justify-between px-6 text-[13px]'>Discounts <span className=' text-red-700'> {totalDiscount}</span></div>
{
  coupon && (
<div className=' flex w-full justify-between px-6 text-[13px]'>Coupon Applied  <span className=' text-red-700'> - {displayMoney(couponValue)}</span></div>

  )
}
<div className=' flex w-full justify-between px-6 text-[13px]'>Shipping <span> {"To be calculated"}</span></div>

</div>



<div className='min-h-[1px] max-w-[90%] bg-black mt-[20px] mx-auto'></div>

<div className=' flex w-full justify-between px-6 font-bold text-[12px] mt-3'>Payable  <span> {displayMoney(payable)}</span></div>


<div className='mt-3 px-6 flex flex-col gap-2'>
  {/* <label htmlFor="coupon">Apply Coupon</label> */}
  <div className='flex gap-5 relative '>
    <div className="input-container ">
    <input 
  type="text" 
  id="coupon" 
  disabled={!!coupon} // Disable the input if 'coupon' is truthy
  className="p-1" 
  placeholder="Coupon Code" 
  value={couponName.toUpperCase()} // Convert text to uppercase
  onChange={(e) => {
    setCouponName(e.target.value.toUpperCase()); // Convert input value to uppercase
    setCouponValid(true); 
  }} 
/>

    </div>
    {!couponValid && ( // Conditionally render error message if coupon is not valid
          <div className='text-red-500 absolute -top-2 left-0 text-[10px]'>
            {couponName} is not valid Coupon.
          </div>
        )}
        {
          coupon && <div className='text-green-500 absolute -top-3 left-0 text-[15px] font-semibold'>Coupon Applied</div>
        }
    <button type='submit' className='button' onClick={handleCoupon}>Apply</button>
  </div>
</div>

    </div>



    </div>


    </div>

    </div>
</div>






   </div>
  );
};

export default CheckoutForm;
