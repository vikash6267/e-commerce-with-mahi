import React from "react";

import { Navigation, Pagination, Scrollbar, Autoplay  } from 'swiper/modules';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';


const slides = [
  {
    image: require("../../../assests/hero/1.jpg"),
    quote:
      "Unleash Your Passion for Cricket and Embrace the Thrill of the Game",
    saleText:
      "Get in the game with up to 50% off on a wide range of cricket gear's",
    productText: "Shop Now",
  },
  {
    image: require("../../../assests/hero/2.jpg"),
    quote:
      "Experience the Unparalleled Excitement and Achieve Victory with Our Premium Cricket Equipment",
    saleText:
      "Limited Time Offer: Don't miss out on the opportunity to upgrade your game",
    productText: "Buy Now",
  },
  {
    image: require("../../../assests/hero/3.jpg"),
    quote:
      "Gear up with the Latest Innovations and Dominate the Field like Never Before",
    saleText: "Discover New Arrivals and stay ahead of the competition",
    productText: "Explore",
  }
];

export default function HeroSlider() {
 
  return (
  <div className="lg:h-screen ">
      <Swiper   
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, Autoplay  ,Virtual]}
      spaceBetween={50}
     
      navigation
      
      pagination={{ clickable: true }}
    //   scrollbar={{ draggable: true }}
    //   onSwiper={(swiper) => console.log(swiper)}
    //   onSlideChange={() => console.log('slide change')}
      loop = {true}
      autoplay={{ delay: 2000  , pauseOnMouseEnter : false , disableOnInteraction : true}}
     className=' lg:h-[80%] '


      breakpoints={{
        // when window width is >= 768px (laptop, PC, tablet, iPad)
        768: {
            slidesPerView: 2,
        },
        // when window width is < 768px (mobile device)
        0: {
            slidesPerView: 1,
        },
    }}
    
    >
     
    
     <div className="  w-screen  ">
          {slides.map((project,ind) => (
            <SwiperSlide
              className="    w-screen   "
              key={ind}
            >
              <div className=" imagep">
                  <img
                    className="  w-screen h[60%] imagep  "
                    src={project.image}
                    alt={"hello"}
                   
                  />
                </div>
              {/* <a href={project.link} title={project.name}>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-amber-950">
                  {project.name}
                </div>
                <p className="text-gray-700 text-base">{project.desc}</p>
              </div>
              </a> */}

             
            </SwiperSlide>
          ))}
        </div>
    
    
    
    </Swiper>
  </div>
  );
}
