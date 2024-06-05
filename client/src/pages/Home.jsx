import React, { useEffect, useState } from "react";
// import MetaData from "../components/core/MetaData"
import HeroSlider from "../components/core/Home/HeroSlider";
import ProductCard from "../components/common/ProductCard";
import { IoShirtSharp } from "react-icons/io5";

import { FaGrinHearts } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import TestSlide from "../components/core/Home/TestSlide";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWish , removeFromWish,fetchWishlist} from "../serivces/operations/product";

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
          <div className="w-screen">
            <HeroSlider />;
          </div>

          <div className="   lg:-mt-20 mb-10 flex text-center w-[80%] mx-auto flex-col gap-3 font-montserrat font-bold text-2xl text-black">
            <div className=" w-full bg-blue-400 text-center p-4 rounded-3xl flex gap-2 justify-center   ">
              {" "}
              <FaGrinHearts className=" text-yellow-300 animate-spin" /> We Are
              Coming Soon{" "}
              <FaGrinHearts className=" text-yellow-300 animate-spin" />
            </div>
            <div className=" w-full bg-blue-600 text-center p-4 rounded-3xl  flex gap-4 justify-center animate-divv   ">
              {" "}
              <FaHeart className=" text-red-600 animate-pulse" /> Dil Tham Ke
              Bethiye <FaHeart className=" text-red-600 animate-pulse" />
            </div>
          </div>

          <div className=" text-black z-0  font-montserrat text-xl mt-24 ">
            <h2
              style={{
                textAlign: "center",
                fontWeight: "800",
              }}
            >
              Featured Products
            </h2>
            {products && <TestSlide products={products} />}

            <Link to="/allProduct" className="border-[1px] p-2 hover:bg-gray-100  flex gap-2 items-center w-full justify-center">
              <div to="/allProduct" className=" ">
                Show All
              </div>

              <IoShirtSharp className=" text-blue-600" />
            </Link>
          </div>

          <div className=" text-black z-0 mt-6 font-montserrat text-xl mb-24 ">
            <h2
              style={{
                textAlign: "center",
                fontWeight: "800",
              }}
            >
              Trending Products
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
