import React from 'react';

import PageHeader from '../Components/PageHeader';

const StateChapters = () => {
  const stateChapters = [
    {
      state: "ANDHRA PRADESH",
      status: "active",
      president: "Dr. Raghunath Reddy G",
      vicePresident: "Dr. Srinivasan Bhogadi",
      secretary: "Dr. Shukur Chilakapati",
      jointSecretary: "to be updated",
      treasurer: "Dr. Dake Rajesh"
    },
    {
      state: "BIHAR",
      status: "active",
      president: "Dr. Divendu Bhushan",
      vicePresident: "to be updated",
      secretary: "Dr. Vishal Vaibhav",
      jointSecretary: "to be updated",
      treasurer: "Dr. Deepak Kumar"
    },
    {
      state: "CHHATTISGARH",
      status: "active",
      president: "Dr. Santosh Kr Singh",
      vicePresident: "Dr. Vinay Kumar Soni",
      secretary: "Dr. Jitendra Chandrakar",
      jointSecretary: "to be updated",
      treasurer: "Dr. Apurva Chowdhary"
    },
    {
      state: "DELHI",
      status: "active",
      president: "Dr. Ankur Verma",
      vicePresident: "Dr. Shaarang Sachdev",
      secretary: "Dr. Vivek Sharma",
      jointSecretary: "to be updated",
      treasurer: "Dr. Kamal Preet Palta"
    },
    {
      state: "GUJARAT",
      status: "active",
      president: "Dr. Sapna Gupta",
      vicePresident: "Dr. Harshil Mehta",
      secretary: "Dr. Vivek Nanda",
      jointSecretary: "Dr. Gitanjali Gupta",
      treasurer: "Dr. Ankur Masani"
    },
    {
      state: "KARNATAKA",
      status: "active",
      president: "Dr. Harshitha Sridhar",
      vicePresident: "Dr. Nilu Sunil",
      secretary: "Dr. V Viju Wilben",
      jointSecretary: "Dr. Surendra Sampath",
      treasurer: "Dr. Priyanka M K"
    },
    {
      state: "KERALA",
      status: "active",
      president: "Dr. Shiju Stanley",
      vicePresident: "Dr. Prem Kiran",
      secretary: "Dr. Shameem KU",
      jointSecretary: "Dr. Ashish Salim",
      treasurer: "Dr. Vyshakan MS"
    },
    {
      state: "MAHARASHTRA",
      status: "active",
      president: "Dr. Nitin Jagasia",
      vicePresident: "to be updated",
      secretary: "Dr. Sunil B Jain",
      jointSecretary: "to be updated",
      treasurer: "Dr. Bharat Patidar"
    },
    {
      state: "ODISHA",
      status: "active",
      president: "Dr. Susmeet Mishra",
      vicePresident: "Dr. Banaja Biswal",
      secretary: "Dr. Abinash Mohanty",
      jointSecretary: "Dr. Mohammed Afaque Arman",
      treasurer: "Dr. Anshuman Satpathy"
    },
    {
      state: "PONDICHERRY",
      status: "active",
      president: "Dr. Navin Puttum",
      vicePresident: "Dr. Nithyaraj R",
      secretary: "Dr. Yoheshwar P",
      jointSecretary: "to be updated",
      treasurer: "Dr. Dinesh Krishnaraj"
    },
    {
      state: "PUNJAB",
      status: "active",
      president: "Dr. Rameet Singh",
      vicePresident: "Dr. Kanika Bhardwaj",
      secretary: "Dr. Prabhpreet Singh",
      jointSecretary: "to be updated",
      treasurer: "Dr. Ayush Malhotra"
    },

    {
      state: "TAMIL NADU",
      status: "active",
      president: "Dr. KR Ram Mohan",
      vicePresident: "Dr. N Karthikeyan",
      secretary: "to be updated",
      jointSecretary: "to be updated",
      treasurer: "Dr. Shaik Manzoor Eilahi"
    },
    {
      state: "TELANGANA",
      status: "active",
      president: "Dr. Seema Sunil Pulla",
      vicePresident: "Dr. Siddharth Marda",
      secretary: "Dr. Praneeth Oladri",
      jointSecretary: "to be updated",
      treasurer: "Dr. K Kiran Kumar Varma"
    },
    {
      state: "UTTAR PRADESH",
      status: "active",
      president: "Dr. Sujit Singh",
      vicePresident: "Dr. Haider Abbas",
      secretary: "Dr. Mukesh Kumar",
      jointSecretary: "to be updated",
      treasurer: "Dr. Syed Hasan Raza"
    },
    {
      state: "UTTARAKHAND",
      status: "active",
      president: "Dr. Reena Singh",
      vicePresident: "to be updated",
      secretary: "Dr. Mayaskar Shandilya",
      jointSecretary: "to be updated",
      treasurer: "to be updated"
    },
    {
      state: "WEST BENGAL",
      status: "active",
      president: "Dr. Kumar Raj",
      vicePresident: "Dr. Bodhisatwa Choudhuri",
      secretary: "Dr. Nishant Agarwal",
      jointSecretary: "Dr. Purustyam Chakraborty",
      treasurer: "Dr. Sudip Banerjee"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="State Chapters"
        description="The Hands and Hearts Behind SEMI"
        breadcrumbs={[
          { label: "About SEMI", link: "/about/semi" },
          { label: "State Chapters" }
        ]}
      />

      {/* Intro Section */}
      <div className="py-16 bg-white">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28 text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Hands and Hearts Behind SEMI
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            Emergency Medicine in India does not grow through policies alone. It grows through people. It grows through emergency physicians standing in crowded resuscitation rooms, through teachers shaping young minds, through mentors training paramedics, and through leaders fighting—day after day—for better emergency systems in their own cities and towns.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            That is why the true strength of the Society for Emergency Medicine India (SEMI) lies not only at the national level, but within its State Chapters. State Chapters are where Emergency Medicine becomes real. They are the spaces where ideas are tested, where national vision turns into local action, and where committed teams work relentlessly to make emergency care stronger, safer, and more accessible to the people who need it most.
          </p>
        </div>
      </div>

      {/* Why State Chapters Matter */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why State Chapters Matter</h2>
              <div className="w-20 h-1 bg-blue-600 mb-8"></div>
              <p className="text-gray-700 leading-relaxed mb-6">
                India is vast and diverse. Every state has its own geography, challenges, resources, healthcare infrastructure, and patient needs. State Chapters understand these realities better than anyone. They know which districts need more emergency physicians, which hospitals need academic and skills-based support, where systems struggle, and where innovation is quietly taking root.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Because of this, State Chapters do not merely implement SEMI’s vision — they actively shape it. Their experiences, challenges, and insights guide the National Board and help build emergency care systems that are practical, responsive, and grounded in reality. They are the bridge between national leadership and frontline care.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
               <h3 className="text-2xl font-bold text-gray-900 mb-4">What State Chapters Do</h3>
               <p className="text-gray-600 mb-4">Across India, State Chapters take the mission of SEMI into their own hands. They:</p>
               <ul className="space-y-3">
                 {[
                   "Bring awareness of Emergency Medicine to cities, districts, and rural communities",
                   "Partner with hospitals and medical colleges to build stronger emergency departments",
                   "Support SEMI-accredited training programs and residency pathways",
                   "Advocate and Strengthen MCI/NMC and NBE-accredited EM departments",
                   "Host state-level conferences, CMEs, workshops, and simulation-based courses",
                   "Advocate with state health departments and public health leaders",
                   "Train and empower emergency physicians, nurses, and paramedics",
                   "Become the voice of their region"
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-start">
                     <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                     <span className="text-gray-700 text-sm">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Community & Governance */}
      <div className="py-16 bg-white">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 h-full">
               <h3 className="text-2xl font-bold text-gray-900 mb-4">A Structured Community</h3>
               <p className="text-gray-700 leading-relaxed mb-4">
                 State Chapters are not informal groups. They are structured, representative, and accountable bodies that function within SEMI’s constitutional framework.
               </p>
               <p className="text-gray-700 leading-relaxed mb-4">
                 When 25 or more SEMI members residing in a state or union territory come together with the shared intent to advance Emergency Medicine, they may apply to form a State Chapter with the approval of the SEMI Managing Committee. Each state or union territory is represented by one unified State Chapter, ensuring clarity, cohesion, and strength.
               </p>
               <p className="text-gray-700 leading-relaxed">
                 Upon formation, all SEMI members and associate members residing in that state automatically become members of the State Chapter, creating an inclusive and unified professional community.
               </p>
             </div>

             <div className="bg-blue-600 rounded-xl p-8 text-white h-full">
               <h3 className="text-2xl font-bold text-white mb-4">Leadership and Governance</h3>
               <p className="text-blue-100 leading-relaxed mb-4">
                 The affairs and activities of each State Chapter are entrusted to an elected State Board, chosen by the members of that State Chapter.
               </p>
               <div className="bg-blue-700/50 rounded-lg p-4 mb-4">
                 <h4 className="font-semibold text-white mb-2">The State Managing Committee:</h4>
                 <ul className="grid grid-cols-2 gap-2 text-sm text-blue-100">
                   <li>• State President</li>
                   <li>• Vice President</li>
                   <li>• General Secretary</li>
                   <li>• Treasurer</li>
                   <li className="col-span-2">• Immediate Past President (co-opted)</li>
                 </ul>
               </div>
               <p className="text-blue-100 leading-relaxed">
                 These office bearers report to the Zonal Vice-President and National Board of SEMI. Their functioning remains aligned with SEMI’s national guidelines. The State Board meets at least once every six months, ensuring regular review, accountability, and progress.
               </p>
             </div>
           </div>
        </div>
      </div>

      {/* State Chapters List */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Active State Chapters
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stateChapters.map((chapter, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{chapter.state}</h3>
                  {chapter.status === "to be updated" && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                      Updating
                    </span>
                  )}
                </div>
                
                <div className="space-y-3 text-sm">
                  {chapter.president && chapter.president !== "to be updated" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">President</span>
                      <span className="text-gray-900">{chapter.president}</span>
                    </div>
                  )}
                  
                  {chapter.vicePresident && chapter.vicePresident !== "to be updated" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Vice President</span>
                      <span className="text-gray-900">{chapter.vicePresident}</span>
                    </div>
                  )}
                  
                  {chapter.secretary && chapter.secretary !== "to be updated" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Secretary</span>
                      <span className="text-gray-900">{chapter.secretary}</span>
                    </div>
                  )}
                  
                  {chapter.jointSecretary && chapter.jointSecretary !== "to be updated" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Joint Secretary</span>
                      <span className="text-gray-900">{chapter.jointSecretary}</span>
                    </div>
                  )}
                  
                  {chapter.treasurer && chapter.treasurer !== "to be updated" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Treasurer</span>
                      <span className="text-gray-900">{chapter.treasurer}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateChapters;

