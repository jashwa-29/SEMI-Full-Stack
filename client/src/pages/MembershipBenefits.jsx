import React from 'react';
import PageHeader from '../Components/PageHeader';
import { Link } from 'react-router-dom';

const MembershipBenefits = () => {
  const points = [
    {
      id: 1,
      title: "Establish Your Professional Identity in Emergency Medicine",
      description: "SEMI membership formally recognizes you as part of India’s national Emergency Medicine community. It strengthens your professional standing and reflects your commitment to evidence-based care, ethics, and continuous learning—attributes increasingly valued by hospitals, academic institutions, and accreditation bodies.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Accelerate Career Growth and Leadership Opportunities",
      description: "SEMI offers platforms that extend far beyond clinical shifts. Members gain access to academic roles, teaching, and faculty development; leadership positions within SEMI chapters and committees; and opportunities to contribute to guidelines, consensus statements, and research.",
      list: [
        "Academic roles and faculty development",
        "Leadership positions within chapters",
        "Contributing to guidelines and research",
        "Speaking roles at national conferences"
      ],
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Stay Updated in a Fast-Moving Specialty",
      description: "Emergency Medicine demands constant upskilling. SEMI keeps its members current through national conferences, specialty-focused training, and updates on protocols, patient safety, and quality standards.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Build a Strong National Network",
      description: "SEMI connects Emergency Medicine specialists across India—residents, consultants, department heads, and academicians. This network enables mentorship, career mobility, and collaboration in research.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Be Part of the Collective Voice of Emergency Medicine",
      description: "SEMI represents Emergency Medicine at national forums and regulatory discussions. As a member, you contribute to strengthening EM training standards and advocating for patient safety.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      id: 6,
      title: "From Individual Practice to Shared Outcome Ownership",
      description: "SEMI membership reflects outcome ownership—not just delivering care, but building better emergency systems for the country. It is about growing together and raising the bar for Emergency Medicine in India.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Membership Regulations"
        description="Shaping the standards, careers, and the future of Emergency Care in India."
        breadcrumbs={[
          { label: "Membership", link: "/membership/join" },
          { label: "Regulations" }
        ]}
      />

      {/* Intro Section */}
      <div className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            Emergency Medicine in India is evolving rapidly
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            From a service specialty to a defined academic and leadership discipline. In this journey, SEMI (Society for Emergency Medicine India) plays a critical role in shaping standards, careers, and the future of Emergency Care. Becoming a SEMI member is not just about affiliation—it is about professional growth, credibility, and collective impact.
          </p>
        </div>
      </div>

      {/* Main Points */}
      <div className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {points.map((point) => (
            <div key={point.id} className="relative group">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {point.id}. {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {point.description}
                  </p>
                  {point.list && (
                    <ul className="grid grid-cols-1 gap-2">
                      {point.list.map((item, i) => (
                        <li key={i} className="flex items-center text-sm font-medium text-gray-500">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join SEMI. Shape Your Career. Strengthen the Specialty.
          </h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            Whether you are a resident, early-career Emergency Physician, or a senior leader, SEMI membership is essential for professional credibility, career advancement, and meaningful impact. Enroll with SEMI today—and be part of India’s Emergency Medicine future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link 
              to="/membership/join" 
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 text-center uppercase tracking-widest text-sm"
            >
              Enroll with SEMI Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipBenefits;


