import React from 'react';
import PageHeader from '../Components/PageHeader';
import trainingReport from '../assets/pdfs/reports/TNMGRMU - Training report - 2025 (1).pdf';

const TrainingAndCapacityBuilding = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <PageHeader 
        title="Training & Capacity Building"
        description="Empowering the Emergency Workforce"
        breadcrumbs={[
          { label: "Our Work", link: "/work/overview" },
          { label: "Training & Capacity" }
        ]}
      />

      {/* Intro Section */}
      <div className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply opacity-70 blur-3xl filter -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply opacity-70 blur-3xl filter translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
               <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Empowering the Workforce</span>
               <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
                 Building Strength Through Training
               </h2>
               <div className="text-lg text-gray-600 leading-relaxed space-y-6 text-justify">
                 <p>
                   If advocacy secured the specialty, training builds its strength. Recognition meant nothing if we didn't have skilled professionals ready to deliver the care that patients desperately needed.
                 </p>
                 <p>
                   SEMI runs one of India's most extensive emergency training ecosystems, designed to create a workforce capable of handling any emergency, anywhere in the country.
                 </p>
               </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 opacity-10"></div>
               <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 font-display">Training Ecosystem</h3>
                  <div className="space-y-4">
                     <div className="flex items-center p-3 bg-blue-50 rounded-xl">
                        <span className="w-8 h-8 flex items-center justify-center mr-4 text-blue-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </span>
                        <span className="font-semibold text-gray-800">District Hospitals</span>
                     </div>
                     <div className="flex items-center p-3 bg-green-50 rounded-xl">
                        <span className="w-8 h-8 flex items-center justify-center mr-4 text-green-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span className="font-semibold text-gray-800">Ambulance Services</span>
                     </div>
                     <div className="flex items-center p-3 bg-purple-50 rounded-xl">
                        <span className="w-8 h-8 flex items-center justify-center mr-4 text-purple-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                          </svg>
                        </span>
                        <span className="font-semibold text-gray-800">Medical Universities</span>
                     </div>
                     <div className="flex items-center p-3 bg-orange-50 rounded-xl">
                        <span className="w-8 h-8 flex items-center justify-center mr-4 text-orange-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span className="font-semibold text-gray-800">Rural Health Systems</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* National Life Support Courses */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">National Life Support Courses</h2>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
               <p className="text-gray-600 text-lg leading-relaxed mb-8">
                 We've developed comprehensive life support courses for multidisciplinary teams—doctors, nurses, paramedics, and anyone who might be first on the scene of an emergency.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {["NBLS (National Basic Life Support)", "NCLS (National Cardiac Life Support)", "NTLS (National Trauma Life Support)", "NDLS (National Disaster Life Support)", "NULS (National Ultrasound Life Support)"].map((course, i) => (
                     <div key={i} className="flex items-center p-4 bg-red-50 rounded-xl border border-red-100 text-red-700 font-medium hover:bg-red-100 transition-colors">
                        <span className="mr-3">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                           </svg>
                        </span> {course}
                     </div>
                  ))}
               </div>
               <p className="text-gray-600 text-lg leading-relaxed mt-8 border-t border-gray-100 pt-6">
                 We also offer specialized courses in Mechanical Ventilation, ECG interpretation, Toxicology, Regional Nerve blocks, and Airway management in emergency departments.
               </p>
            </div>
          </div>

          {/* HSSC Collaboration */}
          <div className="mb-16">
             <div className="bg-blue-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-xl">
                <div className="relative z-10 lg:flex items-start gap-12">
                   <div className="lg:w-1/3 mb-8 lg:mb-0">
                       <div className="inline-block p-3 bg-white/20 rounded-2xl mb-4">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                       </div>
                      <h3 className="text-2xl font-bold">HSSC Collaboration</h3>
                   </div>
                   <div className="lg:w-2/3">
                      <p className="text-blue-100 text-lg leading-relaxed">
                        Through our partnership with the Healthcare Sector Skill Council, SEMI rolled out Adult Emergency Life Support (AELS) and Pediatric Emergency Life Support (PELS) programs for MBBS graduates nationwide, ensuring that every new doctor enters practice with fundamental emergency care skills.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* University & Fellowships */}
      <div className="py-20 bg-gray-900 text-white relative overflow-hidden">
         {/* Abstract BG */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* University Section */}
            <div className="mb-20">
               <h2 className="text-3xl font-bold mb-8">University Collaborations</h2>
               <div className="lg:flex items-center gap-12 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-sm">
                  <div className="lg:w-2/3 mb-8 lg:mb-0">
                     <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                        Our collaboration with <span className="text-white font-bold">Tamil Nadu Dr. MGR Medical University</span> brought structured BLS and ALS training to postgraduate and super-specialty students through seven nodal centers.
                     </p>
                     <p className="text-gray-300 leading-relaxed text-lg">
                        <span className="text-white font-bold">West Bengal</span> adopted this model, training doctors in district hospitals, primary health centers, and emergency units under DMHO supervision—taking quality emergency training beyond metropolitan centers into the communities that need it most.
                     </p>
                  </div>
                  <div className="lg:w-1/3">
                     <a 
                       href={trainingReport}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="block bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                     >
                        <div className="text-4xl font-bold mb-2 text-white group-hover:scale-110 transition-transform">Impact</div>
                        <div className="text-sm opacity-90 text-blue-100 mb-2">Training Beyond Metros</div>
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-white bg-white/20 px-3 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                          View Report 
                          <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </span>
                     </a>
                  </div>
               </div>
            </div>

            {/* Fellowships */}
            <div>
               <h2 className="text-3xl font-bold mb-4">Fellowships & Subspecialty Development</h2>
               <p className="text-gray-400 max-w-3xl mb-10 text-lg">
                  SEMI is investing heavily in subspecialty growth because we believe emergency medicine should continue evolving.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "ECMO Fellowship", partner: "ELSO Society", desc: "Specifically for emergency physicians." },
                    { title: "Geriatric EM", partner: "IFEM", desc: "Fellowship in Geriatric Emergency Medicine." },
                    { title: "POCUS Fellowship", partner: "SEMI", desc: "For advanced bedside ultrasound." },
                    { title: "Infectious Diseases", partner: "Specialty", desc: "Training in Infectious Diseases in Emergency settings." }
                  ].map((fellow, index) => (
                     <div key={index} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors border-t-4 border-blue-600 shadow-xl">
                        <h3 className="text-xl font-bold mb-2">{fellow.title}</h3>
                        <p className="text-xs text-blue-300 uppercase tracking-widest mb-4">{fellow.partner}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{fellow.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Workshops & Simulation */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Workshops & Simulation Programs</h2>
              <div className="prose prose-lg text-gray-600 max-w-none mb-10">
                <p className="mb-6">
                  We run high-yield clinical skill programs covering airway management, mechanical ventilation, resuscitation and ECMO support, regional nerve blocks, emergency ultrasound, trauma care and ATLS principles, Artificial Intelligence in Emergency Medicine, leadership and medico-legal training (through our LEADER and LAWER programs), and our flagship Gender Equity & Equality workshops—the first of their kind globally.
                </p>
                <p>
                  These programs are delivered through simulation labs, cadaver labs, hands-on skills stations, and online-hybrid formats to maximize accessibility.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                 {[
                   "Airway Management", "Mechanical Ventilation", "Resuscitation & ECMO", 
                   "Regional Nerve Blocks", "Emergency Ultrasound", "Trauma & ATLS",
                   "AI in Emergency Medicine", "LEADER Program", "LAWER Program",
                   "Gender Equity & Equality"
                 ].map((workshop, i) => (
                    <span key={i} className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm cursor-default">
                       {workshop}
                    </span>
                 ))}
              </div>
           </div>

           {/* Closing Statement */}
           <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
               <div className="relative z-10 max-w-4xl mx-auto">
                 <p className="text-blue-100 text-lg md:text-xl font-light leading-relaxed">
                   Collectively these efforts ensure that emergency care skill reaches all emergency departments of all public and private hospitals in India -because quality emergency care should be  accessible to everyone
                 </p>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingAndCapacityBuilding;


