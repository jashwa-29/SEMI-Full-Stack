import React from 'react';
import PageHeader from '../Components/PageHeader';

const OurMission = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Mission & Impact"
        description="A nationwide movement for emergency care excellence. From a spark in 1999 to a national force today, we are defined by our impact on saving lives."
        breadcrumbs={[
          { label: "About", link: "/about" },
          { label: "Mission & Impact" }
        ]}
      />

      {/* Intro: 25 Years Later */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-28 text-center">
          <div className="uppercase tracking-widest text-blue-600 font-bold text-sm mb-4">Twenty-Five Years Later</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            A Spark That Became a Movement
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            That spark from 1999 has grown into a nationwide movement—a family of doctors, nurses, paramedics, students, educators, researchers, and volunteers who share one mission: To make sure no one in India is left without help when seconds matter.
          </p>
        </div>
      </div>

      {/* What We Stand For */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">What We Stand For</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                At SEMI, we hold one truth close to our heart: <strong>Emergency care is not a privilege. It is a right.</strong>
              </p>
              <p className="text-blue-100 leading-relaxed mb-6">
                It shouldn’t matter where you live—a crowded metro, a small town, or a remote village. It shouldn’t matter what the emergency is—a heart attack, a road accident, a burn, a collapse, a disaster.
              </p>
              <p className="text-blue-100 leading-relaxed font-semibold">
                Everyone deserves trained hands, the right equipment, and a system that responds when it is needed the most.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Core Belief</h3>
              <blockquote className="text-xl italic text-white text-center leading-relaxed">
                "SEMI continues to work toward an India where every emergency is met with preparedness, competence, and compassion."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* What We've Done */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Have Done</h2>
            <p className="text-lg text-gray-600">Our journey hasn’t been easy, but it has been extraordinary.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                 </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Recognition</h3>
              <p className="text-gray-600 text-sm">Fought for and achieved official recognition of Emergency Medicine as a specialty in 2009.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                 </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Training Network</h3>
              <p className="text-gray-600 text-sm">Built the country’s largest emergency training network, teaching life-saving skills to thousands annually.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Global & Local</h3>
              <p className="text-gray-600 text-sm">Worked with Govt, WHO, ISRO, and global partners. Published NJEM and national guidelines.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                 </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Trained communities—setting a Guinness World Record for teaching CPR to 28,000 people in one day.</p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do Today */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Do Today</h2>
              <p className="text-xl text-gray-600 mb-8">
                Emergency Medicine is not a single job. It is many roles woven together.
              </p>
              <ul className="space-y-4">
                {[
                  "We train—from basic life support to advanced fellowships.",
                  "We advocate—so emergency care gets recognition and funding.",
                  "We research—because systems must be guided by evidence.",
                  "We teach communities—because the first responder is a bystander.",
                  "We improve systems—from hospital quality to geo-mapping.",
                  "We connect globally—as full members of IFEM."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 h-48 rounded-2xl flex items-center justify-center text-blue-600">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </div>
              <div className="bg-blue-50 h-48 rounded-2xl flex items-center justify-center text-blue-600">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
              </div>
              <div className="bg-blue-50 h-48 rounded-2xl flex items-center justify-center text-blue-600">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
              </div>
              <div className="bg-gray-100 h-48 rounded-2xl flex items-center justify-center text-blue-600">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <div className="py-20 bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            SEMI isn’t just an organization. It’s people.
            Senior consultants and young residents. Frontline responders and academic thinkers. Physicians in bustling metros and lone doctors in rural clinics. Teachers, researchers, advocates, dreamers.
          </p>
          <div className="inline-block border-t border-gray-700 pt-8 mt-4">
            <p className="text-2xl font-serif italic text-white">
              "We don’t always agree. We debate, argue, and challenge each other. But we move forward—together—because we know what’s at stake."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;

