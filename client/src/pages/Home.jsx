import React, { useEffect, useState } from "react";
// import MetaData from "../components/core/MetaData"
import { getAllProduct } from "../serivces/operations/product";
import HeroSlider from "../components/core/Home/HeroSlider";
import FeaturedSlider from "../components/core/Home/FeatureSlider";
import ProductCard from "../components/common/ProductCard";
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
    <div>
      <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* <MetaData title="Absence" /> */}

        <div className=" w-screen mt-[64px] lg:h-[calc(100vh - 60px)] z-0">
          <div className="w-screen">
            <HeroSlider />;
          </div>

          <div className=" text-black z-0 lg:-mt-20 font-montserrat text-xl ">
            <h2
              style={{
                textAlign: "center",
                fontWeight: "800",
              }}
            >
              Featured Products
            </h2>
            {products && <FeaturedSlider products={products} />}
          </div>

          <div className=" text-black z-0 mt-6 font-montserrat text-xl ">
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
