import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export default function ImageSlider({ slides }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="lg:h-[60%] w-full flex gap-10">
      {/* Thumbnails */}
      <div className="flex flex-col w-24 overflow-y-auto mobile">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`thumbnail-item p-2 border ${
              index === selectedIndex ? "active" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={slide.url}
              alt="thumbnail"
              className="w-full h-16 mb-2 cursor-pointer object-cover"
            />
          </div>
        ))}
      </div>
      {/* Main Carousel */}
      <div className="flex-1 relative">
        <Gallery>
          <Carousel
            selectedItem={selectedIndex}
            onChange={setSelectedIndex}
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={2000}
            transitionTime={500}
            swipeable={true}
            emulateTouch={true}
            centerMode={true}
            centerSlidePercentage={75}
          >
            {slides.map((slide, index) => (
              <Item
                key={index}
                original={slide.url}
                thumbnail={slide.url}
                width="1024"
                height="768"
              >
                {({ ref, open }) => (
                  <div className="relative">
                    <img
                      ref={ref}
                      onClick={open}
                      src={slide.url}
                      alt="slide"
                      className="mx-auto object-cover cursor-pointer"
                    />
                  </div>
                )}
              </Item>
            ))}
          </Carousel>
        </Gallery>
      </div>
    </div>
  );
}
