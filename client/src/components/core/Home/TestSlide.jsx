import React, { useEffect } from "react";
import { displayMoney } from "../../../helper/utills";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function TestSlide({ products }) {
  useEffect(() => {
    AOS.init({ duraction: 100000, once: true });
  }, []);

  // const displayedProducts =  products.slice(0, 5);
  const displayedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 4);

  return (
    <div
      className="w-full overflow-x-auto  mt-6 "
      style={{
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        "msOverflowStyle": "none",
      }}
    >
      <div className="flex lg:justify-center flex-nowrap justify-start px-6 ">
        {displayedProducts.slice(0.4).map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="w-64 mx-2 flex flex-col "
          >
            <div
              className="h-full w-36 overflow-hidden relative lg:w-60 md:w-60"
              // data-aos="fade-right"
            >
              <div>
                <img
                  src={product.images[0]?.url}
                  alt=""
                  className="object-cover h-full w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                />
                <img
                  src={product.images[1].url}
                  alt=""
                  className="object-cover h-full w-full absolute top-0 left-0 opacity-0 transition duration-500 ease-in-out transform hover:opacity-100 hover:scale-105"
                />
              </div>

              <div></div>
            </div>
            <div className=" ">
              <p className="font-montserrat text-[13px] text-gray-600">
                {product.title}
              </p>
              <p className="font-montserrat text-[12px] text-gray-600 -mt-3">
                {" "}
                {displayMoney(product.price)}
              </p>
              {/* <div className='flex gap-2 text-sm text-black '>
              Sizes: -
                {product.sizes?.map((size, index) => (
                  <div key={index} className='relative font-bold '>
                 
                    {size}
                    <div className='absolute bottom-0 left-0 w-0 border-b-2 border-black hover:w-10 transition-all duration-300'></div>
                  </div>
                ))}
              </div> */}
            </div>
          </Link>
        ))}
      </div>

      <div className="w-screen flex justify-center mt-6 items-center"></div>
    </div>
  );
}

export default TestSlide;
