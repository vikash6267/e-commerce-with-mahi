import React, { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TestSlide from "../components/core/Home/TestSlide";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThreeScene from "./Test";
import MiddlePage from "../components/core/Home/MiddlePage";
import ComingSoon from "./ComminSoon";

function  Home() {



  const [products, setProduct] = useState([]);
  const { allProduct } = useSelector((state) => state.product);
  const [products2, setProduct2] = useState([]);
  
  let selectedProducts


  // useEffect(() => {
  //   window.scrollTo(0, 0); 
  // }, []);

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
  const schemaMarkup = {
    "@context": "https://schema.org/",
    "@type": "Website",
    "name": "Wear Absence ",
    "url": "https://wearabsence.com/",
    "description": "Wear Absence Fashion offers the latest in fashion trends with a wide range of clothing and accessories. Explore our collection to find your perfect style.",
    "publisher": {
      "@type": "Organization",
      "name": "Absence",
      "url": "https://wearabsence.com/"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://wearabsence.com/search?query={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  
  return (
    <HelmetProvider>
    

<Helmet>
    <title>Wear Absence - Discover the Latest Trends</title>
    <meta name="description" content="Explore the latest fashion trends and find your perfect style at Absence Fashion. Discover new arrivals and popular items." />
    <meta property="og:title" content="Wear Absence - Discover the Latest Trends" />
    <meta property="og:description" content="Explore the latest fashion trends and find your perfect style at Absence Fashion. Discover new arrivals and popular items." />
    <meta property="og:url" content="https://wearabsence.com/" />
    <meta property="og:type" content="website" />
    <meta name="keywords" content="fashion, clothing, trends, Absence Fashion" />
    <meta property="og:image" content="https://wearabsence.com/logo.png" />
    <script type="application/ld+json">
      {JSON.stringify(schemaMarkup)}
    </script>
  </Helmet>

  <ComingSoon />


  { false &&
    <>
    <div className="  min-h-[80vh] " >
            <ThreeScene />
          </div>
      <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between  text-white">
        {/* <MetaData title="Absence" /> */}

        <div className=" min-w-screen max-w-screen   z-0 bg-white pt-4 ">

        

          <div className=" text-black z-0  font-montserrat text-xl w-screen   ">
          <h2
              style={{
                textAlign: "center",
                fontWeight: "500",
              }}
              className=" border-b ml-3 text-lg"
            >
             Absence Features Products
            </h2>
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
            <div class="absolute top-1/2 left-0 w-full transform rotate-6">
              <marquee
                class="bg-yellow-500 text-white text-xl font-bold"
                direction="left"
                loop=""
              >
                10% off for today
              </marquee>
            </div>
            <div class="absolute top-1/2 left-0 w-full transform -rotate-6">
              <marquee
                class="bg-yellow-500 text-white text-xl font-bold"
                direction="right"
                loop=""
              >
                10% off for today
              </marquee>
            </div>
          </div>


<MiddlePage />
          <div className=" text-black  ">
         
          <h2
              style={{
                textAlign: "center",
                fontWeight: "500",
              }}
              className=" border-b ml-3 mb-5"
            >
              New Drops Absence
            </h2>
            <div className="  w-11/12 mx-auto  grid lg:grid-cols-4 gap-4 sm:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-2 text-black">
           
            {products &&
                products2?.map((product) => (
                  <ProductCard key={product?._id} products={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  }
      

    </HelmetProvider>
  );
}

export default Home;
