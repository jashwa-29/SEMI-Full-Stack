import React from 'react';
import PageHeader from '../Components/PageHeader';

import imgSaravana from '../assets/Dr. Saravanakumar.S.webp';
import imgSrinath from '../assets/Dr.Srinath Kumar.T.S.webp';
import imgImron from '../assets/Dr.Imron Subhan.webp';
import imgVenkatesh from '../assets/Dr. A.N. Venkatesh.jpeg';
import imgKailasam from '../assets/Dr. Sateesh Kumar Kailasam.jpeg';
import imgKole from '../assets/Dr. Tamorish Kole.jpeg';
import imgChandrasekaran from '../assets/vp_chandrasekaran.jpg';
import imgSasikumar from '../assets/Dr. S. Sasikumar.jpeg';
import imgRamakrishnan from '../assets/Dr. T. V. Ramakrishnan.jpeg';
import imgRajhans from '../assets/Dr. Prasad Rajhans.jpeg';
import imgVasnaik from '../assets/Dr. Mabel Vasnaik.jpeg';
import imgRao from '../assets/Dr. Manimala Rao.jpeg';

const PastPresidents = () => {
  const presidents = [
    {
      term: "2022 – 2024",
      role: "IMMEDIATE PAST PRESIDENT",
      name: "Dr. S. Saravana Kumar",
      position: "Consultant and Head, Department of Emergency Medicine",
      organization: "Mehta's Multispecialty Hospitals, Chennai, India",
      hasMessage: true,
      image: imgSaravana
    },
    {
      term: "2020 – 2022",
      role: "PAST PRESIDENT",
      name: "Dr. A.N. Venkatesh",
      position: "Consultant and Head, Department of Emergency Medicine",
      organization: "Apollo Hospitals, Bangalore, India",
      hasMessage: true,
      image: imgVenkatesh
    },
    {
      term: "2018 – 2020",
      role: "PAST PRESIDENT",
      name: "Dr. Sateesh Kumar Kailasam",
      position: "Consultant and Head, Department of Emergency Medicine",
      organization: "Maxcure Hospitals, Hyderabad, India",
      hasMessage: true,
      image: imgKailasam
    },
    {
      term: "2016 – 2018",
      role: "PAST PRESIDENT",
      name: "Dr. Imron Subhan",
      position: "Head of Emergency Medicine",
      organization: "Apollo Hospitals, Chennai, India",
      hasMessage: true,
      image: imgImron
    },
    {
      term: "2014 – 2016",
      role: "PAST PRESIDENT",
      name: "Dr. T. S. Srinath Kumar",
      position: "Head of Emergency Medicine",
      organization: "Sparsh Hospital, Bengaluru, India",
      hasMessage: false,
      image: imgSrinath
    },
    {
      term: "2012 – 2014",
      role: "PAST PRESIDENT",
      name: "Dr. Tamorish Kole",
      position: "Consultant and Head, Department of Emergency Medicine",
      organization: "Max Hospitals-Saket, New Delhi, India",
      hasMessage: false,
      image: imgKole
    },
    {
      term: "2010 – 2012",
      role: "PAST PRESIDENT",
      name: "Dr. V. P. Chandrasekaran",
      position: "Consultant and Head, Department of Emergency Medicine",
      organization: "Vinayaka Mission University, Salem, India",
      hasMessage: false,
      image: imgChandrasekaran
    },
    {
      term: "2008 – 2010",
      role: "PAST PRESIDENT",
      name: "Dr. S. Sasikumar",
      position: "Consultant and Head, Department of Emergency Medicine",
      organization: "Saveeta Medical College, Chennai, India",
      hasMessage: false,
      image: imgSasikumar
    },
    {
      term: "2006 – 2008",
      role: "PAST PRESIDENT",
      name: "Dr. T. V. Ramakrishnan",
      position: "Professor and Head, Department of Emergency Medicine",
      organization: "Sri Ramachandra Medical College and Research Institute (SRIHER), Chennai, India",
      hasMessage: false,
      image: imgRamakrishnan
    },
    {
      term: "2004 – 2006",
      role: "PAST PRESIDENT",
      name: "Dr. Prasad Rajhans",
      position: "Consultant and Head, Department of Critical Care & Emergency Medicine",
      organization: "Deenanath Mageshkar Hospital, Pune, India",
      hasMessage: false,
      image: imgRajhans
    },
    {
      term: "2002 – 2004",
      role: "PAST PRESIDENT",
      name: "Dr. Mabel Vasnaik",
      position: "Professor and Head, Department of Accident & Emergency Medicine",
      organization: "St. Johns Medical College Hospital, Bangalore, India",
      hasMessage: false,
      image: imgVasnaik
    },
    {
      term: "2000 – 2002",
      role: "PAST PRESIDENT",
      name: "Dr. Manimala Rao",
      position: "Professor and Head, Department of Accident & Emergency Medicine",
      organization: "Nizams Institute of Medical Sciences, Hyderabad, India",
      hasMessage: false,
      image: imgRao
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Past Presidents"
        description="Past Presidents Advisory Board | Society for Emergency Medicine India (2000 – 2024)"
        breadcrumbs={[
          { label: "About", link: "/about" },
          { label: "Past Presidents" }
        ]}
      />

      {/* Presidents Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {presidents.map((president, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:shadow-lg transition-all duration-300 group hover:border-blue-100 flex flex-col items-center">
                {/* Term Badge */}
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6">
                  {president.term}
                </div>

                {/* Profile Image */}
                <div className="mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-blue-50 transition-colors duration-300">
                      {president.image ? (
                        <img 
                          src={president.image} 
                          alt={president.name} 
                          className="w-full h-full object-contain"
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-2xl font-bold">
                            {president.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{president.name}</h3>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{president.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Information */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">SEMI Historical Foundation</h2>
            <p className="text-gray-700 leading-relaxed text-center mb-6">
              The first meeting of the Society for Emergency Medicine India was held on 8th May 1999, 
              during the First National Conference in Emergency Medicine (EMCON-1999), at Marriot Hotel, Hyderabad. 
              SEMI was officially registered on 20th April 2000 vide registration number 3602/2000. 
              SEMI Head Office was started on 24th April 2000.
            </p>
            <div className="flex justify-center space-x-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1999</div>
                <div className="text-sm text-gray-600">First Meeting</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2000</div>
                <div className="text-sm text-gray-600">Official Registration</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Links */}
      {/* <div className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">National Board</h3>
              <p className="text-gray-600 mb-6">
                View the current National Board leadership team.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View National Board
              </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact SEMI</h3>
              <p className="text-gray-600 mb-6">
                Get in touch with SEMI Head Office.
              </p>
              <button className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Contact Head Office
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PastPresidents;


