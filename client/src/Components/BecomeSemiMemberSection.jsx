import React from "react";
import members from "../assets/semi-members.jpg"

const BecomeSemiMemberSection = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT – Clean Image */}
          <div className="w-full">
            <img
              src={members}
              alt="SEMI Members"
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* RIGHT – Clean Content */}
          <div className="w-full">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Become a SEMI Member
                </h2>
                <div className="w-16 h-1 bg-blue-600"></div>
              </div>

              {/* Content */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The Society for Emergency Medicine India is the largest community of 
                  trained and qualified emergency physicians in India, with over 2,000 members.
                </p>
                
                <p>
                  Our membership includes postgraduate trainees, residents, registrars, consultants, 
                  professors, and academic leaders working across hospitals and medical colleges nationwide.
                </p>

                <p className="font-medium text-gray-900">
                  Join us in advancing emergency care and improving patient outcomes across India.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4">
                <a
                  href="/membership/join"
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <span className="mr-3">Join SEMI</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeSemiMemberSection;