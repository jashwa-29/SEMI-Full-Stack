import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrows
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
      onClick={onClick}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </div>
  );
}

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
      onClick={onClick}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    </div>
  );
}

const ImageGallery = ({ subtitle, title, description, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    beforeChange: (current, next) => setCurrentSlide(next),
    appendDots: dots => (
      <div style={{ bottom: "-40px" }}>
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
          i === currentSlide ? "w-12 bg-blue-600" : "w-2 bg-gray-300 hover:bg-blue-300"
        }`}
      />
    )
  };

  return (
    <div className="py-20 bg-gray-50 relative group overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center relative z-10">
        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">{subtitle}</span>
        <h2 className="text-4xl font-bold text-gray-900 mt-2 font-display">{title}</h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-6 mb-6"></div>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
          {description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 relative z-10">
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <div key={index} className="outline-none">
              <div className="h-[600px] w-full">
                <img 
                  src={img} 
                  alt={`${title} Highlight ${index + 1}`} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style>{`
        .slick-track {
            padding-top: 20px;
            padding-bottom: 20px;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;
