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
      className="w-full overflow-x-auto mt-6"
      style={{
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="flex lg:justify-center flex-nowrap justify-start px-6">
        {displayedProducts.map((product) => (
          <Link
            to={`/product/${product?.slug}`}
            key={product._id}
            className="w-64 mx-2 flex flex-col"
          >
            <div className="relative w-36 lg:w-60 md:w-60 h-full overflow-hidden">
              <div>
                <img
                  src={product?.images[1]?.url}
                  alt=""
                  className="object-cover h-full w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                />
                <img
                  src={product?.images[0]?.url}
                  alt=""
                  className="object-cover h-full w-full absolute top-0 left-0 opacity-0 transition duration-500 ease-in-out transform hover:opacity-100 hover:scale-105"
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="font-montserrat text-[13px] text-gray-600 leading-tight">
                {product.title}
              </p>
              <p className="font-montserrat text-[12px] text-gray-600 -mt-1">
                {displayMoney(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="w-screen flex justify-center mt-6 items-center"></div>
    </div>
  );
}

export default TestSlide;
