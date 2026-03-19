import React from 'react';
import { Link } from 'react-router-dom';
import yearBook2025 from '../assets/pdfs/NewsLetter/SEMI - Yearbook 2025 (1)-compressed.pdf';
import PageHeader from '../Components/PageHeader';
import imgSowjanya from '../assets/Dr. SOWJANYA SHREE PATIBANDLA.webp';
import imgSaravana from '../assets/Dr. Saravanakumar.S.webp';
import imgRajadurai from '../assets/Dr. Rajadurai.M.webp';
import imgSandeep from '../assets/Dr. Sandeep Gore.webp';
import imgSaiSurendar from '../assets/Dr. Sai Surendar.webp';
import imgSrinath from '../assets/Dr.Srinath Kumar.T.S.webp';
import imgImron from '../assets/Dr.Imron Subhan.webp';
import imgSanjay from '../assets/Dr. Sanjay Jaiwal.webp';
import imgRamyajit from '../assets/Dr. Ramyajith Lahiri.webp';
import imgAjay from '../assets/Dr. Ajay K Mishra.png';
import imgNaga from '../assets/Dr. Naga Nischal.png';
import imgShweta from '../assets/Dr. Shweta Tyagi.webp';

const NationalBoard = () => {
  // Updated board members for 2024-2026 term from Year Book 2025
  const boardMembers = [
    {
      role: "NATIONAL PRESIDENT",
      name: "Dr. Shree Sowjanya Patibandla",
      qualifications: "MBBS, MD (A&E)",
      position: "Consultant and Head, Department of Emergency Medicine",
      organization: "Continental Hospital, Hyderabad, Telangana, India",
      email: "president@semi.org.in",

      image: imgSowjanya
    },
    {
      role: "IMMEDIATE PAST PRESIDENT & EXECUTIVE CO-CHAIR",
      name: "Dr. Saravana Kumar", // Updated name to match text slightly better if needed, but keeping consistently
      qualifications: "MBBS, MD (A&E)",
      position: "Consultant and Head, Department of Emergency Medicine",
      organization: "Mehta's Multispecialty Hospitals, Chennai, India",
      email: "drsaravanakumar.ep@gmail.com",
      image: imgSaravana
    },
    {
      role: "NATIONAL SECRETARY",
      name: "Prof. Dr M Rajadurai",
      qualifications: "MBBS, MD (A&E)",
      position: "Professor & Head",
      organization: "Saveetha Institute of Medical & Technical Sciences (SIMATS), Chennai, India",
      email: "drmrajadurai@gmail.com",
      image: imgRajadurai
    },
    {
      role: "NATIONAL TREASURER",
      name: "Dr. M. Sai Surendar",
      qualifications: "MBBS, MD (A&E)",
      position: "Group Head of Emergency Medicine",
      organization: "Dr. Kamakshi Memorial Hospital, Chennai, India",
      email: "dr.saisurendar@rediffmail.com",
      image: imgSaiSurendar
    },
    {
      role: "NATIONAL JOINT SECRETARY",
      name: "Dr. Sandeep B. Gore",
      qualifications: "MBBS, MEM",
      position: "Consultant, Department of Emergency Medicine",
      organization: "Jupiter Hospital, Pune, India",
      email: "drsandeepbgore@gmail.com",
      image: imgSandeep
    },
    {
      role: "CHAIR - ACADEMICS",
      name: "Dr. T. S. Srinath Kumar",
      qualifications: "MBBS, MD (A&E), FRCEM (Hon)",
      position: "Head of Emergency Medicine",
      organization: "Sparsh Hospital, Bengaluru, India",
      email: "sriruturekha@yahoo.co.in",
      image: imgSrinath
    },
    {
      role: "CHAIR - GOVERNANCE",
      name: "Dr. Imron Subhan",
      qualifications: "MBBS, MD (A&E), MRCEM",
      position: "Head of Emergency Medicine",
      organization: "Apollo Hospitals, Chennai, India",
      email: "imronsubhan@gmail.com",
      image: imgImron
    },
    {
      role: "VICE PRESIDENT - NORTH",
      name: "Dr. Sanjay Jaiswal",
      qualifications: "MBBS, MD (A&E)",
      position: "Head of Emergency Medicine",
      organization: "Max Hospital, Delhi, India",
      email: "drsanjayjaiswal171@gmail.com",
      image: imgSanjay
    },
    {
      role: "VICE PRESIDENT - SOUTH",
      name: "Dr. Naga Nischal",
      qualifications: "MBBS, MD (A&E)",
      position: "Head of Emergency Medicine",
      organization: "Yashoda Hospitals, Hyderabad, India",
      email: "nischalsday@gmail.com",
      image: imgNaga
    },
    {
      role: "VICE PRESIDENT - CENTRAL",
      name: "Dr. Ajay Mishra",
      qualifications: "MBBS, MD (A&E)",
      position: "Head of Emergency Medicine",
      organization: "Medanta Hospital, Lucknow, India",
      email: "dr.ajaymishra@gmail.com",
      image: imgAjay
    },
    {
      role: "VICE PRESIDENT - EAST",
      name: "Dr. Ramyajit Lahiri",
      qualifications: "MBBS, MEM",
      position: "Head of Emergency Medicine",
      organization: "Apollo Excelcare Hospital, Guwahati, India",
      email: "drrlahiri03@gmail.com",
      image: imgRamyajit
    },
    {
      role: "VICE PRESIDENT - WEST",
      name: "Dr. Shweta Tyagi",
      qualifications: "MBBS, MD (A&E)",
      position: "Head of Emergency Medicine",
      organization: "Max Hospital, Nagpur, India",
      email: "shwrah@gmail.com",
      image: imgShweta
    }
  ];

  // Executive Chair & Past Presidents (from context)
  const executiveLeadership = [
    {
      role: "EXECUTIVE CHAIR",
      name: "Dr. Imron Subhan",
      qualifications: "MBBS, MD (A&E), MRCEM",
      position: "Head of Emergency Medicine",
      organization: "Apollo Hospitals, Chennai, India",
      email: "imronsubhan@gmail.com",
      image: imgImron
    },
    {
      role: "IMMEDIATE PAST PRESIDENT",
      name: "Dr. Saravana Kumar",
      qualifications: "MBBS, MD (A&E)",
      position: "Consultant and Head, Department of Emergency Medicine",
      organization: "Mehta's Multispecialty Hospitals, Chennai, India",
      email: "drsaravanakumar.ep@gmail.com",
      image: imgSaravana
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="National Board"
        description="Society for Emergency Medicine India | 2024 – 2026 Term"
        breadcrumbs={[
          { label: "About SEMI", link: "/about/semi" },
          { label: "National Board" }
        ]}
      />

      <div className="py-16 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            <div className="flex flex-col items-center text-center gap-6">
              {/* President Image */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100 shadow-xl">
                    <img 
                      src={imgSowjanya} 
                      alt="Dr. Shree Sowjanya Patibandla" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* President Badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                      NATIONAL PRESIDENT
                    </div>
                  </div>
                </div>
              </div>

              {/* President Details */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Dr. Shree Sowjanya Patibandla</h2>
                
                <div className="mt-4">
                  <a href="mailto:president@semi.org.in" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-4 py-2 rounded-full transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    president@semi.org.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Board Members Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SEMI National Board 2024-2026</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Leading the advancement of Emergency Medicine in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {boardMembers.filter(member => member.role !== "NATIONAL PRESIDENT").map((member, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-lg transition-all duration-300 group hover:border-blue-100 flex flex-col items-center">
                {/* Profile Image Container */}
                <div className="mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-blue-50 transition-colors duration-300">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Member Details */}
                <div className="space-y-3 w-full">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      member.role.includes('VICE PRESIDENT') 
                        ? 'bg-purple-100 text-purple-700'
                        : member.role.includes('CHAIR')
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {member.role}
                    </div>
                  </div>
                  
                  {member.email && (
                    <div className="pt-2">
                       <a href={`mailto:${member.email}`} className="inline-flex items-center text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {member.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Updates from Year Book 2025 */}
      <div className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Achievements & Updates</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Highlights from SEMI Year Book 2025 showcasing our national and global impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Global Recognition</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Dr. T.S. Srinathkumar - Ambassador for International EM at ACEP 2025
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Dr. Saravana Kumar - Individual Achievement Award at ACEP 2025
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  SEMI representation at ICEM 2025, Canada
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-9 5 9 5 9-5-9-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-9 5 9 5 9-5-9-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Key Collaborations</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  ISRO-SEMI Geo-Tagging Project
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  TN MGR Medical University Partnership
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  WHO Basic Emergency Course Implementation
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Major Initiatives</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  National EMT Conclave 2025
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  SEMI Plexus - National EM Protocols
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Rural Emergency Training Programs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Term Information */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            <div className="text-center">
              <div className="inline-block mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Leadership Term</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                  2024 – 2026
                </div>
                <div className="text-gray-500 mt-2">Society for Emergency Medicine India</div>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Under the leadership of Dr. Shree Sowjanya Patibandla, SEMI continues to drive forward with initiatives in education, 
                  training, research, and global collaboration to advance Emergency Medicine across India.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href={yearBook2025}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Year Book 2025
                  </a>
                  <Link 
                    to="/contact" 
                    className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Contact Head Office
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalBoard;



