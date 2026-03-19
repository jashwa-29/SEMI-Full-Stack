import React from 'react';
import PageHeader from '../Components/PageHeader';
import trainingReportPdf from '../assets/pdfs/reports/TNMGRMU - Training report - 2025 (1).pdf';
import editorialPdf from '../assets/pdfs/njem-11015-0037.pdf';

const ReportsAndWhitePapers = () => {
  const nationalBoard = [
    { name: "Dr. Shree Sowjanya. P", role: "National President" },
    { name: "Dr. Saravanakumar. S", role: "Immediate Past President & Executive Co Chair" },
    { name: "Dr. Rajadurai. M", role: "National Secretary" },
    { name: "Dr. Sandeep Gore", role: "Joint Secretary" },
    { name: "Dr. Sai Surendar", role: "National Treasurer" },
    { name: "Dr. Sanjay Jaiswal", role: "VP - North" },
    { name: "Dr. Ramyajit Lahiri", role: "VP - East" },
    { name: "Dr. Naga Nischal", role: "VP - South" },
    { name: "Dr. Ajay K Mishra", role: "VP - Central" },
    { name: "Dr. Sweta Tyagi", role: "VP - West" },
    { name: "Dr. T.S. Srinathkumar", role: "Chair - Academics" },
    { name: "Dr. Imron Subhan", role: "Chair & Governance" },
  ];

  const resultsData = [
    { category: "Score ≤ 10", pre: 6.11, post: 0, color: "bg-slate-200" },
    { category: "Score 11-15", pre: 40.47, post: 1.46, color: "bg-slate-300" },
    { category: "Score 16-19", pre: 53.42, post: 58.22, color: "bg-blue-200" },
    { category: "Maximum (20)", pre: 0, post: 40.32, color: "bg-blue-600" },
  ];

  const reportContent = {
    title: "2025 Program Report: Institutional Academic Partnership",
    partner: "The Tamil Nadu Dr. M.G.R. Medical University",
    technicalPartner: "Society for Emergency Medicine India (SEMI)",
    tag: "Institutional Report",
    color: "from-slate-700 to-slate-900",
    description: "A comprehensive evaluation of the Life Support training integration into postgraduate medical curricula. This report details the impact of standardized emergency medicine training across medical, nursing, and pharmacy specialties.",
    vision: [
      { title: "Standardization", desc: "Implementing uniform NBLS/NCLS algorithms nationwide." },
      { title: "Research Integrity", desc: "Integration of GCP and GLP standards into clinical practice." },
      { title: "Capacity Building", desc: "Extending life-saving skills to allied health sciences." }
    ],
    modules: [
      "National Basic Life Support (NBLS)",
      "National Cardiac Life Support (NCLS)",
      "Good Clinical Practices (GCP)",
      "Good Laboratory Practices (GLP)"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Reports & White Papers"
        description="Access formal documentation, program reports, and strategic white papers from SEMI. We provide transparent reporting on our academic partnerships and clinical impact."
        breadcrumbs={[
          { label: "Resources", link: "/resources" },
          { label: "Reports" }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-20">
          
          {/* Wellness Position Statement */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-10 rounded-bl-full -mr-8 -mt-8"></div>
              
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-600 text-white">
                      Position Statement
                    </span>
                    <span className="text-gray-400 text-sm font-medium">| NJEM Editorial 2024</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                    Beyond the Crisis: How Emergency Medicine Specialist Wellness can Transform Emergency Care in India
                  </h2>
                  <p className="text-xl text-blue-600 font-semibold mb-6">A Position Statement from the Society for Emergency Medicine India</p>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Emergency medicine (EM) is the frontline of any healthcare system. The demanding nature of mortality management, high-stress environments, and persistent shift work creates a unique set of challenges for EM specialists. This positional statement addresses the critical need for physician wellness as a cornerstone of healthcare transformation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        Key Objectives
                      </h4>
                      <ul className="space-y-4">
                        {[
                          { title: "Standardized Wellness", desc: "Establishing burnout prevention as a core department KPI." },
                          { title: "Infrastructure Support", desc: "Mandating restorative environments for EM specialists." },
                          { title: "Policy Advocacy", desc: "Integration of wellness standards into institutional policy." }
                        ].map((item, i) => (
                          <li key={i} className="text-sm">
                            <p className="font-bold text-gray-900">{item.title}</p>
                            <p className="text-gray-500 leading-tight">{item.desc}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Core Recommendations
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Structured shift-work schedules",
                          "Mental health support accessibility",
                          "Leadership training in physician wellness",
                          "Regulatory mandates for EM wellness",
                          "Research-driven wellness interventions"
                        ].map((m, i) => (
                          <li key={i} className="text-gray-600 text-sm flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Quote Section to match the style */}
                  <div className="mt-8 p-8 bg-blue-900 rounded-2xl">
                    <p className="text-blue-100 text-xl font-serif italic mb-4">
                      "Investing in Emergency Medicine Specialist wellness is not just a moral obligation; it is a strategic necessity for the health and well-being of the entire nation."
                    </p>
                    <p className="text-blue-400 font-bold text-sm uppercase tracking-widest">— Official Position Statement Summary</p>
                  </div>
                </div>

                <div className="lg:w-1/3 bg-gray-50 rounded-2xl p-6 border border-gray-100 h-fit">
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Publication Info</h4>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-2xl font-bold text-blue-600">NJEM</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Journal</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center text-xs">
                            <p className="text-xl font-bold text-blue-600">Vol 2, Issue 1</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Edition</p>
                        </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Official Document</h4>
                    <a
                      href={editorialPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-900 text-white font-bold transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group/btn"
                    >
                      <svg className="w-5 h-5 transition-transform group-hover/btn:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Full Paper
                    </a>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Lead Authors</h4>
                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                          <p className="font-bold text-gray-900 text-sm">Dr. Shree Sowjanya Patibandla</p>
                          <p className="text-[10px] text-gray-500">National President, SEMI</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                          <p className="font-bold text-gray-900 text-sm">Dr. T. S. Srinathkumar</p>
                          <p className="text-[10px] text-gray-500">Academic Chair, SEMI</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${reportContent.color} opacity-10 rounded-bl-full -mr-8 -mt-8`}></div>
              
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${reportContent.color} text-white`}>
                      {reportContent.tag}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">| FY 2024-25 Analysis</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{reportContent.title}</h2>
                  <p className="text-xl text-blue-600 font-semibold mb-6">Partnership with {reportContent.partner}</p>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {reportContent.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </span>
                        Strategic Vision
                      </h4>
                      <ul className="space-y-4">
                        {reportContent.vision.map((item, i) => (
                          <li key={i} className="text-sm">
                            <p className="font-bold text-gray-900">{item.title}</p>
                            <p className="text-gray-500 leading-tight">{item.desc}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        Training Curriculum
                      </h4>
                      <ul className="space-y-3">
                        {reportContent.modules.map((m, i) => (
                          <li key={i} className="text-gray-600 text-sm flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Impact Visuals */}
                  <div className="mt-12 p-8 bg-gray-900 rounded-2xl">
                    <h4 className="text-white font-bold mb-8">Training Outcome Metrics (Pre vs Post Test Scores)</h4>
                    <div className="space-y-8">
                        {resultsData.map((res) => (
                            <div key={res.category} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-gray-400">
                                    <span>{res.category}</span>
                                    <span className="text-blue-400">Post: {res.post}% <span className="text-gray-600 font-normal mx-2">|</span> <span className="text-gray-500">Pre: {res.pre}%</span></span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden flex relative">
                                    <div 
                                        className="h-full bg-white/10 absolute left-0 top-0 transition-all duration-1000"
                                        style={{ width: `${res.pre}%` }}
                                    ></div>
                                    <div 
                                        className={`h-full ${res.color} relative z-10 transition-all duration-1000 delay-300`}
                                        style={{ width: `${res.post}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3 bg-gray-50 rounded-2xl p-6 border border-gray-100 h-fit">
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Key Performance Indicators</h4>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-3xl font-bold text-blue-600">4,603</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Candidates Trained</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-3xl font-bold text-blue-600">08</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nodal Centers</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-3xl font-bold text-blue-600">40.3%</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mastery jump (Score 20)</p>
                        </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Official Documentation</h4>
                    <a
                      href={trainingReportPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${reportContent.color} text-white font-bold transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group/btn`}
                    >
                      <svg className="w-5 h-5 transition-transform group-hover/btn:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Full Report
                    </a>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Program Contacts</h4>
                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                          <p className="font-bold text-gray-900 text-sm">Dr. T. S. Srinathkumar</p>
                          <p className="text-[10px] text-gray-500 mb-2">Academic Chair, SEMI</p>
                          <a href="tel:+919538100238" className="text-blue-600 text-[10px] font-bold">+91 95381 00238</a>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                          <p className="font-bold text-gray-900 text-sm">Mr. R. Manickavasagam</p>
                          <p className="text-[10px] text-gray-500 mb-2">Coordinator</p>
                          <a href="tel:+919486668575" className="text-blue-600 text-[10px] font-bold">+91 94866 68575</a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* National Board Grid */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center uppercase tracking-widest opacity-40">Governance Board</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {nationalBoard.map((member, i) => (
                      <div key={i} className="text-center md:text-left">
                          <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{member.role}</p>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ReportsAndWhitePapers;


