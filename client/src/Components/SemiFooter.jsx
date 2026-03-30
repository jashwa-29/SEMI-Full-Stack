import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/semi logo.png";
import apiClient from "../api/apiClient";

const SemiFooter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, success: false, message: "" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ loading: true, success: false, message: "" });

    try {
      const response = await apiClient.post("/newsletter/subscribe", { email });

      setStatus({ 
        loading: false, 
        success: true, 
        message: response.data.message 
      });
      setEmail("");
      // Clear success message after 5 seconds
      setTimeout(() => setStatus(prev => ({ ...prev, success: false, message: "" })), 5000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus({ 
        loading: false, 
        success: false, 
        message: error.parsedMessage || "An error occurred. Please try again later." 
      });
    }
  };

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Stay Updated with SEMI
              </h3>
              <p className="text-gray-600 max-w-2xl">
                Subscribe to our newsletter for the latest updates in emergency medicine, 
                training programs, and professional development opportunities.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 lg:w-80">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                    required
                  />
                  {status.message && (
                    <p className={`absolute -bottom-6 left-0 text-xs font-medium ${status.success ? 'text-green-600' : 'text-red-600'}`}>
                      {status.message}
                    </p>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={status.loading}
                  className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-600 transform hover:-translate-y-0.5 flex items-center justify-center min-w-[140px] ${status.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status.loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : status.success ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Subscribed!</span>
                    </div>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

         {/* Main Footer Content */}
      <div className="bg-black">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-start">
                <div className="mb-6">
                  <img
                    src={logo}
                    alt="Society for Emergency Medicine India"
                    className="h-16 w-auto"
                    loading="lazy"
                    decoding="async"
                    width="200"
                    height="80"
                  />
                </div>
                <p className="text-gray-300 text-justify text-sm leading-relaxed text-center md:text-left mb-6">
                  Leading the advancement of emergency medical care across India through excellence, education, and innovation since 1999.
                </p>
                <div className="flex  items-center space-x-2 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                  <span>Hyderabad, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-white text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "About SEMI", link: "/about/semi" },
                  { name: "Executive Members", link: "/about/executive-members" },
                  { name: "Our Work", link: "/work/overview" },
                  { name: "Conferences", link: "/work/events" },
                  { name: "Membership", link: "/membership/join" },
                  { name: "Contact Us", link: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-white text-lg mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-gray-300 text-sm">+91 7732020000</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-gray-300 text-sm">headoffice@semi.org.in</p>
                  </div>
                </div>
                <Link to="/contact">
                  <button className="w-full px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm mt-4">
                    Get In Touch
                  </button>
                </Link>
              </div>
            </div>

            {/* Follow Us */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-white text-lg mb-6">Follow Us</h4>
              <p className="text-gray-300 text-sm mb-6">
                Stay connected with SEMI for updates and community engagement.
              </p>
              <div className="flex space-x-3">
                {[
                  {
                    name: "Facebook",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    ),
                    color: "hover:bg-blue-600",
                    link: "https://www.facebook.com/Societyforemergencymedicineindia/"
                  },
                  {
                    name: "YouTube",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    ),
                    color: "hover:bg-red-600",
                    link: "https://www.youtube.com/@societyforemergencymedicin9894"
                  }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-10 h-10 bg-gray-800 text-gray-300 rounded-lg transition-all duration-200 ${social.color} hover:text-white hover:shadow-md`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Society for Emergency Medicine India. All rights reserved.
            </p>
               <p className="text-sm text-gray-400 text-center ">
              Design & Developed by <a href="https://www.swiflare.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Swiflare Ai Innovations</a>
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
          
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SemiFooter;
