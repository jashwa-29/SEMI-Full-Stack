import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hero1 from '../assets/hero-1.png';

const slides = [
  // {
  //   id: 1,
  //   image: hero1,
  //   hideOnMobile: true,
  // },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2070",
    title: "Advancing Emergency Care",
    subtitle: "setting standards for Emergency care",
    cta: "Our Work"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&q=80&w=2070",
    title: "Professional Development", 
    subtitle: "Training the next generation of emergency physicians",
    cta: "Our Courses"
  }
];

import PropTypes from 'prop-types';

// Custom Previous Arrow Component
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all hover:scale-110 z-20 shadow-lg group"
      aria-label="Previous slide"
    >
      <svg className="w-5 h-5 text-gray-800 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
}

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};

// Custom Next Arrow Component
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all hover:scale-110 z-20 shadow-lg group"
      aria-label="Next slide"
    >
      <svg className="w-5 h-5 text-gray-800 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
}

NextArrow.propTypes = {
  onClick: PropTypes.func,
};

const HeroSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Get filtered slides for mobile
  const filteredSlides = isMobile 
    ? slides.filter(slide => !slide.hideOnMobile)
    : slides;

  // Slick slider settings
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: 'cubic-bezier(0.87, 0, 0.13, 1)',
    appendDots: dots => (
      <div className="absolute bottom-6 inset-x-0 flex justify-center z-20">
        <ul className="flex items-center space-x-3 m-0 custom-dots">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/60 transition-all duration-300 cursor-pointer backdrop-blur-sm"></div>
    ),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
      <Slider {...settings}>
        {filteredSlides.map((slide) => (
          <div key={slide.id} className="relative outline-none">
            {/* Image Container */}
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-50">
              <img
                src={slide.image}
                alt={slide.title || "SEMI"}
                loading={slide.id === 1 ? "eager" : "lazy"}
                fetchPriority={slide.id === 1 ? "high" : "low"}
                decoding="async"
                className={
                 'w-full h-full object-cover'
                }
              />
            </div>


            {/* Text Overlay - Only for slides with text */}
            {slide.title && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
                <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28 w-full">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 text-gray-100 max-w-lg drop-shadow-md">
                      {slide.subtitle}
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-600/30">
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>

      <style>{`
        .custom-dots li {
          margin: 0;
          width: auto;
          height: auto;
          display: flex;
        }
        .custom-dots li.slick-active div {
          background-color: white !important;
          transform: scale(1.25);
          opacity: 1;
        }
        .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;