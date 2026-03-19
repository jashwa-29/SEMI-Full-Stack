import React, { useState, useEffect } from "react";
import logo from "../assets/semi logo.png";

const navItems = [
  { name: "Home", link: "/" },
  {
    name: "About",
    submenu: [
      { name: "About SEMI", link: "/about/semi" },
      { name: "Our Mission & Vision", link: "/about/mission-vision" },
      { name: "Executive Members", link: "/about/executive-members" },
      { name: "National Board", link: "/about/national-board" },
      { name: "Past Presidents", link: "/about/past-presidents" },
      { name: "State Chapters", link: "/about/state-chapters" },
      { name: "Constitution", link: "/about/constitution" },
    ],
  },
  {
    name: "Our Work",
    submenu: [
      { name: "Overview", link: "/work/overview" },
      { name: "Advocacy & Policy", link: "/work/advocacy" },
      { name: "Training & Capacity Building", link: "/work/training" },
      { name: "Conferences & Annual Events", link: "/work/events" },
      { name: "Community & Public Outreach", link: "/work/outreach" },
    ],
  },
  {
    name: "Resources",
    submenu: [
      { name: "Clinical Guidelines", link: "/resources/guidelines" },
      { name: "Publications", link: "/resources/publications" },
      { name: "Reports & White Papers", link: "/resources/reports" },
    ],
  },
  {
    name: "Journal",
    link: "https://www.njem.org.in/journalDetails/NJEM",
    external: true,
  },
  {
    name: "Education",
    submenu: [
      { name: "Workshops & Training", link: "/education/workshops" },
      { name: "CCT EM", link: "/education/cct-em" }
    ],
  },
  {
    name: "EMCON",
    link: "https://emcon.in",
    external: true,
  },
  {
    name: "News",
    submenu: [{ name: "Newsletter", link: "/news/newsletter" }],
  },
  {
    name: "Membership",
    submenu: [
      { name: "Membership Benefits", link: "/membership/benefits" },
      { name: "Become a Member", link: "/membership/join" },
    ],
  },
  { name: "Contact", link: "/contact" },
];

const Header = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Top Announcement Bar - Non-sticky */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-600">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-28">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4 sm:space-x-8 text-sm sm:text-base text-blue-100">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                </svg>
                <span className="text-xs sm:text-[15px] font-medium">Hyderabad, India</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-[15px] font-medium">Est. 1999</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 sm:space-x-8 text-sm sm:text-base text-blue-100">
              <a href="tel:+917732020000" className="flex items-center space-x-2 sm:space-x-3 hover:text-white transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline text-xs sm:text-[15px] font-medium">+91 7732020000</span>
              </a>
              
              <a href="mailto:enquiries@semi.com" className="flex items-center space-x-2 sm:space-x-3 hover:text-white transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline text-xs sm:text-[15px] font-medium">headoffice@semi.org.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Sticky */}
      <header className={`w-full bg-white sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-xl border-b border-blue-100' : 'shadow-lg'
      }`}>
        <div className="bg-white">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-28">
            <div className="flex items-center justify-between py-4 sm:py-5">
              {/* Logo */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div 
                  className="flex items-center cursor-pointer group"
                  onClick={() => (window.location.href = "/")}
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={logo}
                      alt="Society for Emergency Medicine India"
                      className="h-16 sm:h-20 w-auto transition-transform group-hover:scale-105"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>
                  <div className="ml-3 sm:ml-5">
                    <div className="text-[12px] sm:text-lg font-bold text-gray-900 uppercase tracking-wide leading-tight">
                      Society for Emergency Medicine India
                    </div>
                    <div className="hidden sm:block text-[10px] sm:text-sm text-gray-600 mt-1 font-medium italic">
                      Full Member of International Federation for Emergency Medicine
                    </div>
                    <div className="hidden md:block text-[11px] sm:text-sm text-gray-600 mt-1 font-medium">
                      Leading Emergency Care Excellence Since 1999 (Regd. No. 3602/2000)
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[14px] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-600 hover:to-blue-600 transform hover:-translate-y-0.5"
                  onClick={() => window.location.href = "/membership/join"}
                >
                  Join Membership
                </button>
                {/* <button 
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[14px] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-600 hover:to-blue-600 transform hover:-translate-y-0.5"
                  onClick={() => window.location.href = "/membership/login"}
                >
                  Member Login
                </button> */}
                
              
                
             
              </div>

              {/* Mobile Actions */}
              <div className="flex lg:hidden items-center space-x-3 sm:space-x-4">

                
                <button
                  className="p-2.5 sm:p-3.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-gray-200"
                  onClick={() => setOpenMobile((prev) => !prev)}
                >
                  {openMobile ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation - Also sticky */}
        <nav className="hidden lg:block bg-white border-t border-gray-100">
          <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
            <div className="flex items-center justify-center space-x-2">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.link || "#"}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : ""}
                    className={`flex items-center space-x-2 px-4 py-4 text-[15px] font-semibold transition-all duration-200 ${
                      activeDropdown === item.name 
                        ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={(e) => {
                      if (item.submenu) e.preventDefault();
                    }}
                  >
                    <span>{item.name}</span>
                    {item.submenu && (
                      <svg 
                        className={`w-5 h-5 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>

                  {/* Desktop Dropdown */}
                  {item.submenu && activeDropdown === item.name && (
                    <div className="absolute left-0 top-full w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-3">
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.link}
                            className="flex items-center space-x-4 px-5 py-3.5 text-[15px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 group"
                          >
                            <div className="w-2 h-2 bg-blue-200 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                            <span className="font-medium">{subItem.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      {/* Mobile Navigation */}
      {openMobile && (
        <div className="absolute top-full left-0 w-full lg:hidden bg-white border-t border-gray-200 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-5">
            {/* Mobile Action Buttons */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button 
                className="col-span-1 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm sm:text-[15px] font-semibold rounded-xl shadow-lg"
                onClick={() => {
                  window.location.href = "/membership/join";
                  setOpenMobile(false);
                }}
              >
                Join Membership
              </button>
              {/* <button 
                className="col-span-1 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm sm:text-[15px] font-semibold rounded-xl shadow-lg"
                onClick={() => {
                  window.location.href = "/membership/login";
                  setOpenMobile(false);
                }}
              >
                Member Login
              </button> */}
            </div>

            {/* Mobile Navigation Items */}
            <nav className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-gray-100">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                  <div
                    className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                    onClick={() => {
                      if (item.submenu) {
                        handleDropdownToggle(item.name);
                      } else {
                        if (item.external) {
                          window.open(item.link, "_blank");
                        } else {
                          window.location.href = item.link;
                        }
                        setOpenMobile(false);
                      }
                    }}
                  >
                    <span className="font-semibold text-sm sm:text-[15px]">{item.name}</span>
                    {item.submenu && (
                      <svg 
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && activeDropdown === item.name && (
                    <div className="pl-6 sm:pl-8 space-y-1 sm:space-y-2 py-2 sm:py-3 border-l-2 border-blue-200 ml-3 sm:ml-4">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.link}
                          className="block py-2.5 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-[15px] text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                          onClick={() => setOpenMobile(false)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Contact Info in Mobile */}
            <div className="pt-4 sm:pt-6 border-t border-gray-100 space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3 text-sm sm:text-[15px] text-gray-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                </svg>
                <span className="font-medium">Hyderabad, India</span>
              </div>
              <div className="flex items-center space-x-3 text-sm sm:text-[15px] text-gray-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Established 1999</span>
              </div>
            </div>
          </div>
        </div>
      )}
      </header>
    </>
  );
};

export default Header;
