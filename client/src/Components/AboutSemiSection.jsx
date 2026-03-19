import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const announcements = [
  {
    id: 1,
    title: "SEMI Year Book 2025 Released",
    description:
      "The official SEMI Yearbook for 2025 is now available. Read about our latest achievements and vision for 2026.",
    link: "/news/newsletter",
  },
  {
    id: 2,
    title: "Upcoming Event: EMCON SEMI 2026",
    description:
      "Join us for the premier Emergency Medicine conference. Visit emcon.in for more details.",
    link: "https://emcon.in/",
  },
  {
    id: 3,
    title: "LAW-ER: March 7, 8",
    description:
      "LAW And Emergency Medicine: Medico-Legal Education & Certification Program.",
    link: "/education/workshops#lawer",
  },
];

const AboutSemiSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: false, // Disabled to prevent scroll blocking on mobile
    swipe: false, // Disable swipe entirely for vertical ticker to improve mobile UX
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    appendDots: dots => (
      <div style={{ bottom: "-25px" }}>
        <ul className="m-0 p-0 flex justify-center gap-2 custom-dots"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-colors cursor-pointer dot-item"></div>
    )
  };

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28 py-10">
        <div className="grid gap-8 lg:grid-cols-[52%,48%]">
          {/* ================= LEFT SIDE ================= */}
          <div>
            {/* About heading */}
            <div className="flex items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                About SEMI
              </h2>
              <div className="ml-4 flex-1 h-[2px] bg-blue-600" />
            </div>

            {/* subheading */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Who we are</h3>
              <div className="mt-2 h-[3px] w-24 bg-blue-600" />
            </div>

            {/* description paragraphs */}
            {/* description paragraphs */}
            <div className="mt-6 text-[15px] leading-relaxed text-gray-700">
              <p className="mb-5 text-justify font-medium text-lg leading-relaxed">
                We exist because emergencies do not wait. And because no life should be lost for want of timely, trained, and compassionate care.
              </p>
              <p className="mb-5 text-justify">
                The Society for Emergency Medicine India (SEMI) is the national voice of Emergency Medicine in the country. But more than an organization, SEMI is a community built on hope, conviction, and an unshakeable belief that every life matters.
              </p>
              <p className="text-justify border-l-4 border-blue-600 pl-4 bg-gray-100 py-3 pr-2 rounded-r-lg">
                <strong>Driven by Purpose: </strong>
                From its inception, SEMI has been founded on three inseparable pillars: <strong>Academics, Research, and Service</strong>. We are building the backbone of emergency care through structured training, advancing evidence-based practice, and standing where lives are most vulnerable.
              </p>
            </div>
          </div>

          {/* ================= RIGHT SIDE ANNOUNCEMENTS ================= */}
          <div className="bg-blue-700 rounded-none relative overflow-hidden text-white h-[450px] sm:h-[420px]">
            <div className="relative px-6 md:px-10 py-8 h-full flex flex-col">
              {/* Headings */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-white/90">
                  Updates you should know
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  Important Announcements
                </h3>
              </div>

              {/* Slider Box */}
              <div className="flex-1 relative">
                <Slider {...settings} className="h-full announcement-slider">
                  {announcements.map((item) => (
                    <div key={item.id} className="outline-none px-1 py-4">
                      {/* Card */}
                      <div className="relative w-full bg-white border-4 border-white rounded-3xl shadow-lg px-6 py-6 h-[240px] flex flex-col justify-between">
                        {/* NEW Badge */}
                        <div className="absolute -top-4 left-6">
                          <div className="bg-blue-600 text-white font-bold px-4 py-1 rounded-md shadow-md">
                            NEW
                          </div>
                        </div>

                        <div>
                          <h4 className="mt-4 text-lg font-semibold text-blue-600 line-clamp-2">
                            {item.title}
                          </h4>

                          <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Link */}
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-3 rounded-full bg-blue-50 px-4 py-2 text-xs text-blue-600 hover:bg-blue-100 transition w-fit"
                        >
                          <span className="flex items-center justify-center h-6 w-6 bg-white text-blue-600 rounded-full text-lg">
                            ↗
                          </span>
                          <span className="truncate max-w-[200px]">{item.link}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            
            <style>{`
              .announcement-slider .slick-list {
                height: 100%;
                padding-top: 10px;
              }
              .announcement-slider .slick-track {
                height: 100%;
              }
              .custom-dots .slick-active .dot-item {
                background-color: white;
                transform: scale(1.2);
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSemiSection;
