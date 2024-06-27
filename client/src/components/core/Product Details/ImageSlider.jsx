import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function ImageSlider({ slides }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = slides.map((slide) => slide.url);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handleCarouselClick = (index) => {
    setSelectedIndex(index); // Update selected index
    openLightbox(index);
  };

  return (
    <div className="lg:h-[60%] w-full flex gap-10">
      {/* Thumbnails */}
      <div className="flex flex-col w-24 overflow-y-auto">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`thumbnail-item p-2 border ${
              index === selectedIndex ? "active" : ""
            }`}
            onClick={() => handleCarouselClick(index)}
          >
            <img
              src={slide.url}
              alt={"thumbnail"}
              className="w-full h-16 mb-2 cursor-pointer object-cover"
            />
          </div>
        ))}
      </div>
      {/* Main Carousel */}
      <div className="flex-1 relative">
        <Carousel
          selectedItem={selectedIndex}
          onChange={setSelectedIndex}
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={!lightboxOpen}
          interval={2000}
          transitionTime={500}
          swipeable={true}
          emulateTouch={true}
          centerMode={true}
          centerSlidePercentage={75}
          onClickItem={handleCarouselClick}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative">
              <img
                src={slide.url}
                alt={"slide"}
                className="mx-auto object-cover cursor-pointer"
              />
            </div>
          ))}
        </Carousel>
      </div>
      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          mainSrc={images[lightboxIndex]}
          nextSrc={images[(lightboxIndex + 1) % images.length]}
          prevSrc={images[(lightboxIndex + images.length - 1) % images.length]}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setLightboxIndex(
              (prevIndex) => (prevIndex + images.length - 1) % images.length
            )
          }
          onMoveNextRequest={() =>
            setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
}
