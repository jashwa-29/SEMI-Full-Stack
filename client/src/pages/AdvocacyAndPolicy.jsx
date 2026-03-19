import React from 'react';
import PageHeader from "../Components/PageHeader";
import advocacyImg1 from "../assets/advocacy-1.jpeg";
import advocacyImg2 from "../assets/advocacy-2.jpeg";
import advocacyImg3 from "../assets/advocacy-3.jpeg";
import advocacyImg4 from "../assets/advocacy-4.jpeg";
import advocacyImg5 from "../assets/advocacy-5.jpeg";
import ImageGallery from "../Components/ImageGallery";

const AdvocacyAndPolicy = () => {
  const advocacyImages = [advocacyImg1, advocacyImg2, advocacyImg3, advocacyImg4, advocacyImg5];

  const nationalPartners = [
    {
      name: "AHPI",
      full: "Association of Healthcare Providers India",
      focus: "Hospital quality and capacity building",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "bg-blue-100 text-blue-600"
    },
    {
      name: "CAHO",
      full: "Consortium of Accredited Healthcare Organisations",
      focus: "ED quality and safety standards",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-green-100 text-green-600"
    },
    {
      name: "ISRO",
      full: "Indian Space Research Organisation",
      focus: "Health-QUEST and geo-tagging initiatives",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 14.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      ),
      color: "bg-orange-100 text-orange-600"
    },
    {
      name: "HSSC",
      full: "Healthcare Sector Skill Council",
      focus: "National life support training for MBBS graduates",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const globalPartners = [
    {
      name: "IFEM",
      full: "International Federation for Emergency Medicine",
      focus: "Global representation and standards",
      color: "border-blue-600"
    },
    {
      name: "RCEM (UK)",
      full: "Royal College of Emergency Medicine",
      focus: "Academic linkages and curriculum",
      color: "border-red-500"
    },
    {
      name: "ACEP (USA)",
      full: "American College of Emergency Physicians",
      focus: "Education and research collaboration",
      color: "border-indigo-500"
    },
    {
      name: "Alfred Health / Monash",
      full: "Australia",
      focus: "Simulation, trauma workshops, PG modules",
      color: "border-teal-500"
    },
    {
      name: "WHO",
      full: "World Health Organization",
      focus: "Basic Emergency Care (BEC) programs across Asia",
      color: "border-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <PageHeader
        title="Advocacy & Policy"
        description="Giving Emergency Medicine a Voice. Advocacy has been the backbone of SEMI's mission since our founding in 1999."
        breadcrumbs={[
          { label: "Our Work", link: "/work/overview" },
          { label: "Advocacy & Policy" },
        ]}
      />

      {/* Introduction Section */}
      <div className="relative py-20 bg-white overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wider uppercase mb-6">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              From Recognition to Systemic Change
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed text-justify">
               <p className="mb-6">
                 We started with a fight—a fight to get Emergency Medicine recognized as a legitimate postgraduate specialty in a country where it barely existed as a concept. That early advocacy bore fruit in 2009 when Emergency Medicine was officially recognized as a specialty.
               </p>
               <p>
                 But we didn't stop there. Recognition was just the first step. Today, our policy efforts are broader, deeper, and ongoing because we know that true change requires constant engagement, persistent dialogue, and unwavering commitment.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Representation Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Representation & Policy Engagement</h2>
                <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We actively engage with the bodies that shape medical education and practice in India. Our work ensures that emergency medicine is not just an add-on, but a core component of the national health strategy.
                </p>
                <ul className="space-y-6">
                   {[
                     "National Medical Commission (Curriculum & Faculty Norms)",
                     "National Board of Examinations (Assessment & Training)",
                     "QAI and IFEM (Quality & Accreditation Frameworks)",
                     "Health Ministries (Infrastructure & Training Programs)",
                     "Royal College of Emergency Medicine (Training and Evaluation)",
                     "State governments / Universities ( EM Skill Training / Establishing EM Academic programs )"
                   ].map((item, i) => (
                     <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                           <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                           </svg>
                        </div>
                        <span className="text-gray-800 font-medium text-lg">{item}</span>
                     </li>
                   ))}
                </ul>
             </div>
             <div className="mt-12 lg:mt-0 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
                <div className="bg-white rounded-3xl p-10 shadow-xl relative z-10 border border-gray-100">
                   <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Strategic Impact</h3>
                   <div className="space-y-6">
                      <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                         <h4 className="font-bold text-blue-600">Curriculum Development</h4>
                         <p className="text-sm text-blue-600 mt-1">Providing critical input on standards and training pathways.</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-600">
                         <h4 className="font-bold text-purple-900">Quality Frameworks</h4>
                         <p className="text-sm text-purple-700 mt-1">Developing accreditation standards with QAI and IFEM.</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-600">
                         <h4 className="font-bold text-green-900">Infrastructure Support</h4>
                         <p className="text-sm text-green-700 mt-1">Partnering with State Health Authorities on implementation.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <ImageGallery 
        subtitle="On The Ground"
        title="Advocacy in Action"
        description="Snapshots from our nationwide campaigns, meetings with policymakers, and leadership summits driving the future of Emergency Medicine."
        images={advocacyImages}
      />

      {/* National Partnerships */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnership with National Organisations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
               SEMI collaborates with leading healthcare bodies to strengthen patient safety, training, and health systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nationalPartners.map((partner, index) => (
               <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center hover:-translate-y-2">
                  <div className={`w-16 h-16 mx-auto ${partner.color} rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                     {partner.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 h-8">{partner.full}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{partner.focus}</p>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Collaborations */}
      <div className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
           <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Global Collaborations & Representation</h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
               Ensuring India's emergency medicine standards align with global best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
             {globalPartners.map((partner, index) => (
                <div key={index} className={`bg-gray-800 rounded-2xl p-6 border-t-4 ${partner.color} hover:bg-gray-750 transition-colors shadow-lg`}>
                   <h3 className="font-bold text-lg mb-2">{partner.name}</h3>
                   {partner.full !== partner.name && <p className="text-xs text-gray-400 mb-3">{partner.full}</p>}
                   <p className="text-sm text-gray-300 leading-snug">{partner.focus}</p>
                </div>
             ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-4">
                   <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <div>
                   <h3 className="text-2xl font-bold mb-2">WHO Partnership Impact</h3>
                   <p className="text-blue-100 leading-relaxed text-lg">
                     The partnership with WHO has been particularly impactful. Under WHO's guidance, SEMI has supported Basic Emergency Care (BEC) programs across Asia, helping to build emergency care capacity throughout the region.
                   </p>
                </div>
             </div>
          </div>

          <div className="mt-16 border-t border-gray-800 pt-12 text-center">
            <p className="text-xl text-gray-300 leading-relaxed max-w-5xl mx-auto font-light">
              Through all these activities, SEMI contributes to national emergency care curriculum frameworks, accreditation and competency standards, emergency department quality benchmarks, public health advocacy, and clinical guidelines specifically tailored for India's unique context.
            </p>
          </div>
        </div>
      </div>

      {/* Conclusion / CTA Like Section */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-serif italic">
             "Advocacy isn't about navigating bureaucracy..."
           </h2>
           <p className="text-xl text-gray-600 leading-relaxed mb-10">
             It's about ensuring that Emergency Medicine is recognized as vital, emergency physicians are respected as professionals, and every citizen receives timely emergency care as a basic right, not a privilege.
           </p>
           <div className="h-1 w-32 bg-blue-600 mx-auto rounded-full"></div>
           
           <div className="mt-12 text-sm text-gray-500 font-medium uppercase tracking-widest">
              SEMI Policy Framework • National Impact • Global Standards
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdvocacyAndPolicy;



