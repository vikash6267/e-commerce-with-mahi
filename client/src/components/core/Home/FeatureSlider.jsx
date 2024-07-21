import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, A11y, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import { displayMoney } from "../../../helper/utills";
import "./FeatureSlider.css"
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import "swiper/scss/effect-coverflow";

const FeaturedSlider = ({ products }) => {
  return (
   <div className=" border-gray-400 border-2 mt-5 h-[500px]">
     <Swiper
      // modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
      loop={true}
      // speed={400}
      spaceBetween={20} // Adjust as needed
      // slidesPerView={"auto"}
      // pagination={{ clickable: true }}
      // effect={"coverflow"}
      // centeredSlides={false}
      // coverflowEffect={{
      //           rotate: 0,
      //           stretch: 0,
      //           depth: 70,
      //           modifier: 3,
      //           slideShadows: false,
      //       }}
            // autoplay={{
            //     delay: 3500,
            //     disableOnInteraction: false,
            // }}
            breakpoints={{
                768: {
                    slidesPerView: 3,
                    // spaceBetween: 200
                },
                992: {
                    slidesPerView: 4,
                    // spaceBetween: 250
                },
            }}
      className=" flex items-center justify-center z-0 flex-nowrap"
    >
      {products.map((product) => {
        const { _id, slug,images, title, price,highPrice } = product;
        let newPrice = displayMoney(price);
        const oldPrice = displayMoney(highPrice);

        return (
          <SwiperSlide key={_id} className="featured_slides font-montserrat shadow-2xl ">
            <Link to={`/${slug}`} className="">
              <div className=" p-4 rounded-md ">
                <figure className="">
                  <img src={images[0]?.url} alt={title} className=" " />
                </figure>

                <div className="featured_title text-lg font-semibold text-center">{title}</div>

                <h2 className="products_price text-lg font-semibold">
                  <span className="final_price">{newPrice}</span> &nbsp;
                  <small className="text-gray-500"> 
                    <del className="old_price"> {oldPrice}</del> 
                  </small>
                </h2>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}


 
    </Swiper>
   </div>
  );
};

export default FeaturedSlider;
