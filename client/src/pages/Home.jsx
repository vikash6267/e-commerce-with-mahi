import React, { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import { IoShirtSharp } from "react-icons/io5";

import { FaGrinHearts } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import TestSlide from "../components/core/Home/TestSlide";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThreeScene from "./Test";
function Home() {

  const [products, setProduct] = useState([]);
  const { allProduct } = useSelector((state) => state.product);
  const [products2, setProduct2] = useState([]);
  
  let selectedProducts


  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const selectRandomProducts = (products) => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array");
      return [];
    }

    // Create a shallow copy of the products array
    const productsCopy = products.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = productsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [productsCopy[i], productsCopy[j]] = [productsCopy[j], productsCopy[i]];
    }

    // Select the first four products from the shuffled array
    return productsCopy.slice(0, 4);
  };



  useEffect(() => {
    // fetchSubLinks();
    setProduct(allProduct);
    selectedProducts = selectRandomProducts(allProduct);
    console.log(selectedProducts)
    setProduct2(selectedProducts)
  }, [allProduct]);


  // useEffect(() => {
  //   // fetchSubLinks();
  //   setProduct(allProduct);
  // }, [allProduct]);
  return (
    <div className="">
          <div className="  min-h-[80vh] " >
            <ThreeScene />
          </div>
      <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between  text-white">
        {/* <MetaData title="Absence" /> */}

        <div className=" min-w-screen max-w-screen   z-0 bg-white ">

        

          <div className=" text-black z-0  font-montserrat text-xl w-screen  ">
            {/* <h2
              style={{
                textAlign: "center",
                fontWeight: "800",
              }}
            >
              Featured Products
            </h2> */}
            {products && <TestSlide products={products} />}

            <Link
              to="/allProduct"
              className=" p-2 hover:bg-gray-100  flex gap-2 items-center w-full justify-center"
            >
              <div
                to="/allProduct"
                className=" text-[15px] border p-[1px] px-5 "
              >
                Discover More
              </div>

              {/* <IoShirtSharp className=" text-blue-600" /> */}
            </Link>
          </div>

          <div class="relative h-28 bg-gray-100 flex items-center justify-center">
            <div class="absolute top-1/2 left-0 w-full transform rotate-3">
              <marquee
                class="bg-green-500 text-white text-xl font-bold"
                direction="left"
                loop=""
              >
                10% off for today
              </marquee>
            </div>
            <div class="absolute top-1/2 left-0 w-full transform -rotate-3">
              <marquee
                class="bg-green-500 text-white text-xl font-bold"
                direction="right"
                loop=""
              >
                10% off for today
              </marquee>
            </div>
          </div>

          <div className=" text-black  ">
         

            <div className="  w-11/12 mx-auto  grid lg:grid-cols-4 gap-4 sm:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-2 text-black">
            {products &&
                products2?.map((product) => (
                  <ProductCard key={product?._id} products={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
