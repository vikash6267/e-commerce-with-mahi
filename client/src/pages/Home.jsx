import React, { useEffect, useState } from "react";
// import MetaData from "../components/core/MetaData"
import { getAllProduct } from "../serivces/operations/product";
import HeroSlider from "../components/core/Home/HeroSlider";
import FeaturedSlider from "../components/core/Home/FeatureSlider";
import ProductCard from "../components/common/ProductCard";


import { FaGrinHearts } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import TestSlide from "../components/core/Home/TestSlide";

function Home() {
  const [products, setProduct] = useState([]);

  const fetchSubLinks = async () => {
    (async () => {
      const res = await getAllProduct();
      if (res) {
        setProduct(res);
        console.log(products);
      }
    })();
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);
  return (
    <div className="">
      <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* <MetaData title="Absence" /> */}

        <div className=" w-screen mt-[64px] lg:h-[calc(100vh - 60px)] z-0">
          <div className="w-screen">
            <HeroSlider />;
          </div>

          <div className="   lg:-mt-20 mb-10 flex text-center w-[80%] mx-auto flex-col gap-3 font-montserrat font-bold text-2xl text-black">

    <div className=" w-full bg-blue-400 text-center p-4 rounded-3xl flex gap-2 justify-center   "> <FaGrinHearts className=" text-yellow-300 animate-spin" /> We Are Coming Soon <FaGrinHearts className=" text-yellow-300 animate-spin" /></div>
    <div className=" w-full bg-blue-600 text-center p-4 rounded-3xl  flex gap-4 justify-center animate-divv   "> <FaHeart className=" text-red-600 animate-pulse" /> Dil Tham Ke Bethiye <FaHeart className=" text-red-600 animate-pulse" /></div>


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

            <div className="  w-11/12 mx-auto  grid lg:grid-cols-4 gap-4 sm:grid-cols-3 md:grid-cols-3 xs:grid-cols-1">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} products={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
