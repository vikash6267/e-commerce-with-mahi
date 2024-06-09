import React, { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import { IoShirtSharp } from "react-icons/io5";

import { FaGrinHearts } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import TestSlide from "../components/core/Home/TestSlide";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThreeScene from "./Test";
function Home() {
  const [products, setProduct] = useState([]);
  const { allProduct } = useSelector((state) => state.product);

   // const dispatch = useDispatch()
  // const fetchSubLinks = async () => {
  //   (async () => {
  //     const res = await (getAllProduct());
  //     if (res) {
  //       setProduct(res);
  //       console.log(products);
  //     }
  //   })();
  // };

  useEffect(() => {
    // fetchSubLinks();
    setProduct(allProduct);
  }, [allProduct]);
  return (
    <div className="">
      <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* <MetaData title="Absence" /> */}

        <div className=" w-screen mt-[64px] lg:h-[calc(100vh - 60px)] z-0">

        <div >
      <ThreeScene />
   
    </div>

          {/* <div className="   flex text-center w-[80%] mx-auto  gap-3 font-montserrat  text-2xl text-black justify-center">
           <Link to={"/allProduct/Male"} className=" p-[10px] bg-gray-700 text-white rounded-3xl  ">Men </Link>
           <Link to={"/allProduct/Female"} className=" p-[10px] bg-gray-700 text-white rounded-3xl"> Women </Link>
           <Link to={"/allProduct/Unisex"} className=" p-[10px] bg-gray-700 text-white rounded-3xl"> Unisex</Link>
          </div> */}

          <div className=" text-black z-0  font-montserrat text-xl mt-24 ">
            {/* <h2
              style={{
                textAlign: "center",
                fontWeight: "800",
              }}
            >
              Featured Products
            </h2> */}
            {products && <TestSlide products={products} />}

            <Link to="/allProduct" className=" p-2 hover:bg-gray-100  flex gap-2 items-center w-full justify-center">
              <div to="/allProduct" className=" text-[15px] border p-[1px] px-5 ">
               Discover More
              </div>

              {/* <IoShirtSharp className=" text-blue-600" /> */}
            </Link>
          </div>

          <div className=" text-black z-0 mt-3 font-montserrat text-xl mb-24 ">
            <h2
              style={{
                textAlign: "center",
                fontWeight: "800",
              }}
            >
             
            </h2>

            <div className="  w-11/12 mx-auto  grid lg:grid-cols-4 gap-4 sm:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-2">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} products={product}  />
                ))}
            </div>
          </div>


     
        </div>
      </div>
    </div>
  );
}

export default Home;
