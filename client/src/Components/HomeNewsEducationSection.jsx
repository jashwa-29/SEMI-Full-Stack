import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const quickLinks = [
  {
    label: "Join Membership",
    href: "/membership/join",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />
      </svg>
    ),
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    label: "Academic Workshops",
    href: "/education/workshops",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168 0.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332 0.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332 0.477-4.5 1.253"
        />
      </svg>
    ),
    gradient: "from-indigo-600 to-purple-700",
  },
  {
    label: "Clinical Resources",
    href: "/resources/guidelines",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    gradient: "from-blue-700 to-cyan-700",
  },
];

import youtubeQr from "../assets/youtube-qr.jpg";

const courses = [
  {
    id: 1,
    title: "ANGELS 2025",
    description:
      "Advanced National Geriatric Life Support. A specialized program focused on managing geriatric emergencies effectively, covering airway, trauma, and neuro disorders in the elderly.",
    link: "/education/workshops#angels2025",
  },
  {
    id: 2,
    title: "PREM",
    description:
      "Pediatric Resuscitation Emergency Medicine. Designed to equip healthcare professionals with the knowledge and confidence needed to respond effectively to pediatric emergencies.",
    link: "/education/workshops#prem",
  },
  {
    id: 3,
    title: "NCLS",
    description:
      "National Cardiac Life Support. Improve skills in basic and advanced Cardiac life support with training designed for relevant scenarios in the Indian context.",
    link: "/education/workshops#ncls",
  },
  {
    id: 4,
    title: "LEADER: ED Leadership",
    description:
      "A breakthrough thought leadership program designed by successful leaders in EM to help you grow professionally and personally and transform your practice.",
    link: "/education/workshops#leader",
  },
];

import PropTypes from 'prop-types';

// Custom Arrows
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden lg:flex items-center justify-center absolute -right-4 xl:-right-6 top-1/2 -translate-y-1/2 h-8 w-8 xl:h-10 xl:w-10 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 z-30 transition-colors"
      aria-label="Next courses"
    >
      <span className="text-xl pb-1">›</span>
    </button>
  );
}

NextArrow.propTypes = {
  onClick: PropTypes.func,
};

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden lg:flex items-center justify-center absolute -left-4 xl:-left-6 top-1/2 -translate-y-1/2 h-8 w-8 xl:h-10 xl:w-10 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 z-30 transition-colors"
      aria-label="Previous courses"
    >
      <span className="text-xl pb-1">‹</span>
    </button>
  );
}

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};

const HomeNewsEducationSection = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      }
    ],
    appendDots: dots => (
      <div style={{ bottom: "-35px" }}>
        <ul className="m-0 p-0 flex justify-center gap-2 custom-dots"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-2 h-2 rounded-full bg-blue-600/30 hover:bg-blue-600 transition-colors cursor-pointer dot-item"></div>
    )
  };

  return (
    <section className="w-full bg-white">
      {/* ---------- QUICK LINKS ---------- */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28 py-8 sm:py-10 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Quick Links
        </h2>
        <div className="mt-2 h-[3px] w-24 bg-blue-600 mx-auto" />

        {/* Grid layout for quick links */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {quickLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`group flex items-center justify-center gap-4 rounded-2xl px-6 py-5 sm:py-6 text-white font-bold text-sm sm:text-base shadow-xl bg-gradient-to-br ${item.gradient} transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98] border border-white/10`}
            >
              <span className="flex items-center justify-center rounded-xl bg-white/20 p-2 sm:p-2.5 transition-colors group-hover:bg-white/30 backdrop-blur-sm">
                {item.icon}
              </span>
              <span className="text-base sm:text-lg tracking-wide">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ---------- NEWS + EDUCATION SECTION ---------- */}
      <div className="bg-blue-50 py-8 sm:py-10">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          {/* Main grid container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* YOUTUBE CHANNEL SECTION - Left Column */}
            <div className="w-full flex flex-col items-center lg:items-start">
              <div className="flex items-center w-full mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600 whitespace-nowrap">
                  YouTube Channel
                </h3>
                <div className="ml-3 flex-1 h-[2px] bg-blue-600" />
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full border border-blue-100 transition-all hover:shadow-2xl">
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center leading-tight">
                  Subscribe to our YouTube channel For learning videos
                </h4>

                <div className="relative group">
                  <a
                    href="https://youtube.com/@societyforemergencymedicin9894?si=og5Gls1QW-v9Tf57"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative p-2 bg-white rounded-xl shadow-inner border border-gray-100">
                      <img
                        src={youtubeQr}
                        alt="Scan to subscribe to SEMI YouTube Channel"
                        className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </a>
                </div>

                <div className="mt-8 flex flex-col items-center w-full">
                  <div className="flex items-center gap-2 mb-4 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    <span className="font-bold text-base tracking-wide">
                      Official SEMI Channel
                    </span>
                  </div>
                  <a
                    href="https://youtube.com/@societyforemergencymedicin9894?si=og5Gls1QW-v9Tf57"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200 transform hover:-translate-y-0.5 mt-2"
                  >
                    <span>Subscribe Now</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* EDUCATION & COURSES - Right Column */}
            <div className="w-full">
              <div className="flex items-center justify-between lg:justify-center">
                <div className="flex-1 lg:hidden" />
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600 text-left lg:text-center whitespace-nowrap">
                  Education &amp; Courses
                </h3>
                <div className="flex-1 lg:hidden" />
              </div>

              <div className="mt-6 sm:mt-8 relative px-2">
                <Slider {...settings} className="course-slider -mx-2 pb-10">
                  {courses.map((course) => (
                    <div key={course.id} className="px-2 outline-none h-full">
                      <div className="w-full bg-blue-600 text-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl px-4 sm:px-6 py-4 sm:py-6 relative min-h-[200px] sm:min-h-[240px] flex flex-col h-full">
                        <div className="relative h-full flex flex-col flex-grow">
                          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
                            {course.title}
                          </h4>
                          <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 flex-grow line-clamp-4">
                            {course.description}
                          </p>
                          <Link 
                            to={course.link} 
                            className="text-xs sm:text-sm font-semibold underline underline-offset-2 hover:no-underline self-start mt-auto inline-block text-white"
                            aria-label={`Read More about ${course.title}`}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .course-slider .slick-track {
          display: flex;
        }
        .course-slider .slick-slide {
          height: auto;
        }
        .course-slider .slick-slide > div {
          height: 100%;
        }
        .custom-dots .slick-active .dot-item {
          background-color: #0049b0;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default HomeNewsEducationSection;
