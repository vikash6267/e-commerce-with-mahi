import React from 'react';
import image from "../../../assests/snakeabsence.jpg";
import logo from "../../../assests/logo/logo.png";


function MiddlePage() {
  return (
    <div className='lg:hidden md:hidden max-w-[100vw] overflo-hidden'>
      <div className='relative'>
        <img src={image} alt="Background" className='lg:h-[100vh] mx-auto object-fill' />
        <div className='absolute bottom-[20%] right-[50px] flex justify-center items-center'>
          <div className="relative">
            <img src={logo} alt="Logo" className='h-10 invert' />
            <div className="rotating-text-container">
              <div className="rotating-text">
                <span className="circle-text">A</span>
                <span className="circle-text">B</span>
                <span className="circle-text">S</span>
                <span className="circle-text">E</span>
                <span className="circle-text">N</span>
                <span className="circle-text">C</span>
                <span className="circle-text">E</span>
      
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddlePage;
