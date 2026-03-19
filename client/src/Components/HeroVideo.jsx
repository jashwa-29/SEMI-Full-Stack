import React, { useState } from 'react';
import heroVid from '../assets/hero-vid.mp4';

const HeroVideo = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden bg-blue-900">
      {/* Fallback Background / Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video element with absolute positioning to cover the container */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`w-full h-full object-fill transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src={heroVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Overlay to make text readable if any is added later */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
    </div>
  );
};

export default HeroVideo;

