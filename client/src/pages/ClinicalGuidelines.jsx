import React from 'react';
import PageHeader from '../Components/PageHeader';
import healthQuestPdf from '../assets/pdfs/clinicalguidelines/HEALTH QUEST.pdf';

const ClinicalGuidelines = () => {
  const editorialTeam = [
    { name: "Dr S Saravanakumar", role: "Editor in Chief", details: "Group Unit Head, Dr Mehta Hospitals. National President - SEMI" },
    { name: "Dr T S Srinath Kumar", role: "Editor", details: "Group Head, Yashoda Hospitals. Academic Chair - SEMI" },
    { name: "Dr Imron Subhan", role: "Editor", details: "Head, Apollo hospital. Chair Governance - SEMI" },
    { name: "Dr Tamorish Kole", role: "Editor", details: "Head, Max Hospital. Past President - SEMI" },
  ];

  const contributors = [
    "Dr A N Venkatesh", "Dr Naredra Jena", "Dr Shabbar Joad", "Dr Dina shah", 
    "Dr Kushrao bajan", "Dr Fabith Moideen", "Dr Anindya Dasgupta", "Dr Syed Nabi", 
    "Dr Shree Sowjanya", "Dr Syed Ahmed Adil", "Mr Gaurav Loria", "Mr R Manickavasagam"
  ];

  const healthQuestContent = {
    title: "HEALTH QUEST (Quality Upgradation Enabled by Space Technology)",
    subtitle: "Quality best practice learnings from ISRO applicable to Emergency Departments",
    tag: "Quality & Safety",
    color: "from-blue-600 to-blue-600",
    description: "An integrated framework for achieving zero-error patient care in Emergency Departments. Developed in collaboration with ISRO, this document focuses on clinical precision, operational quality, and risk mitigation.",
    chapters: [
      "Background of Emergency Department (Trauma & Medical)",
      "Quality in Emergency Care (Design, Conformance, Performance)",
      "An Overview of the Proposal",
      "Emergency Department Design & Space Requirements",
      "Patient Flow & Triage Guidelines",
      "IA Medical & Trauma Emergency Protocols",
      "Stroke / Thrombolysis Protocols",
      "ER Patient Satisfaction Score (Satisfaction Score)",
    ],
    highlights: [
      "Zero-error program adaptation",
      "ISRO-Standard best practices",
      "Collaborative project (SEMI, AHPI, CAHO, NABH)",
      "Updated Version - 2023"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Clinical Guidelines"
        description="SEMI establishes and promotes standardized clinical guidelines to ensure the highest quality of emergency care across India. Our guidelines are developed by experts and reviewed regularly."
        breadcrumbs={[
          { label: "Resources", link: "/resources" },
          { label: "Clinical Guidelines" }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-20">
          <div className="relative group">
            {/* Standard Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
              {/* Theme Color Corner */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${healthQuestContent.color} opacity-10 rounded-bl-full -mr-8 -mt-8`}></div>
              
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${healthQuestContent.color} text-white`}>
                      {healthQuestContent.tag}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">| Updated 2023 Edition</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{healthQuestContent.title}</h2>
                  <p className="text-xl text-blue-600 font-semibold mb-6">{healthQuestContent.subtitle}</p>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {healthQuestContent.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </span>
                        Key Chapters
                      </h4>
                      <ul className="space-y-3">
                        {healthQuestContent.chapters.map((chapter, i) => (
                          <li key={i} className="text-gray-600 text-sm flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {chapter}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        Project Highlights
                      </h4>
                      <ul className="space-y-3">
                        {healthQuestContent.highlights.map((item, i) => (
                          <li key={i} className="text-gray-600 text-sm flex items-start">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Messages Section */}
                  <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Leadership Messages</h4>
                    <div className="space-y-6">
                      <div className="italic text-gray-600 text-sm border-l-4 border-blue-600 pl-4 py-1">
                        "For medical advancements to be effective, human and equipment error has to be at a near zero level, particularly at Emergency and Intensive Care setups. Adoption of ISRO best practices into healthcare is the primary goal of this project."
                        <p className="mt-2 font-bold text-gray-900 non-italic">— Dr. Alexander Thomas (President AHPI, Board Member NABH)</p>
                      </div>
                      <div className="italic text-gray-600 text-sm border-l-4 border-blue-600 pl-4 py-1">
                        "Quality is not a destination but a journey. We worked with ISRO to learn about their secrets of unparalleled success in space science to translate them into healthcare especially emergency medicine."
                        <p className="mt-2 font-bold text-gray-900 non-italic">— Dr. Saravanakumar & Dr T S Srinath Kumar (SEMI Leadership)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3 bg-gray-50 rounded-2xl p-6 border border-gray-100 h-fit">
                  {/* Editorial Team */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Editorial Team</h4>
                    <div className="space-y-4">
                      {editorialTeam.map((member, i) => (
                        <div key={i} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                          <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                          <p className="text-xs text-blue-600 font-semibold">{member.role}</p>
                          <p className="text-[10px] text-gray-500 mt-1 leading-tight">{member.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contributors */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Contributors</h4>
                    <div className="flex flex-wrap gap-2">
                      {contributors.map((name, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-full">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-8 border-t border-gray-100 pt-8">
                    <a
                      href={healthQuestPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${healthQuestContent.color} text-white font-bold transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group/btn`}
                    >
                      <svg className="w-5 h-5 transition-transform group-hover/btn:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1.01.707.293l5.414 5.414a1 1.01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Guidelines (PDF)
                    </a>
                    <p className="mt-4 text-center text-[10px] text-gray-400 font-medium">
                      Institutional members can request printed versions from the National Office.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate/Institutional Section - Standard Footer */}
      <div className="bg-gray-900 py-20 mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Contribute to Excellence</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            The Health QUEST team is continuously working to update these guidelines. If your institution has successfully implemented these best practices, we would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:headoffice@semi.org.in" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg">
              Submit Implementation Report
            </a>
            <a href="/contact" className="px-8 py-4 border border-gray-700 text-white font-bold rounded-xl hover:bg-gray-800 transition-all">
              Contact Editorial Office
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalGuidelines;


