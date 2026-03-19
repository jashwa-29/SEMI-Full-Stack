import React from 'react';
import PageHeader from '../Components/PageHeader';
import communityImg1 from "../assets/community-1.jpeg";
import communityImg2 from "../assets/community-2.jpeg";
import communityImg3 from "../assets/community-3.jpeg";
import communityImg4 from "../assets/community-4.jpeg";

import ImageGallery from "../Components/ImageGallery";

const CommunityOutreach = () => {
  const communityImages = [communityImg1, communityImg2, communityImg3, communityImg4];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-600">
      <PageHeader 
        title="Community & Service"
        description="Extending Care Beyond Hospitals."
        breadcrumbs={[
          { label: "Our Work", link: "/work/overview" },
          { label: "Community & Service" }
        ]}
      />

      {/* Intro Section - Heroic Approach */}
      <div className="relative py-24 bg-white overflow-hidden">
         {/* Subtle pattern */}
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
         
         <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
               Extending Care <span className="text-blue-600">Beyond Hospitals</span>
            </h2>
            <div className="text-xl text-slate-600 leading-relaxed space-y-6">
              <p>
                Emergency care begins before a patient enters the hospital. It begins with a neighbor who knows CPR, a teacher who can recognize a stroke, a college student who doesn't panic in a crisis. SEMI's outreach ensures India is better prepared for emergencies at every level.
              </p>
            </div>
         </div>
      </div>

      {/* Core Initiatives - Asymmetric Grid for Visual Interest */}
      <div className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* 1. Mass CPR */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:bg-red-100"></div>
                  <div className="relative z-10">
                     <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">Mass CPR & First-Aid Training</h3>
                     <p className="text-slate-600 leading-relaxed mb-6">
                        We've conducted record-setting CPR training programs recognized by the World Book of Records in London and certified by Guinness World Records.
                     </p>
                     <p className="text-slate-600 leading-relaxed">
                        Our school and college CPR campaigns, bystander training initiatives, and Public First Responder programs are creating a culture where ordinary people can do extraordinary things in emergencies.
                     </p>
                  </div>
               </div>

               {/* 2. Disaster Response */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:bg-orange-100"></div>
                  <div className="relative z-10">
                     <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">Disaster & Humanitarian Response</h3>
                     <p className="text-slate-600 leading-relaxed mb-6">
                        When disasters strike, SEMI teams respond. We've provided service during the Bihar and Karnataka floods, Chennai floods, Nepal earthquake, and numerous cyclone and landslide events.
                     </p>
                     <p className="text-slate-600 leading-relaxed">
                        Our support has included medical camps, emergency care, food and supplies, community first-aid training, and trauma support—because emergency medicine professionals don't just work in hospitals, we serve communities.
                     </p>
                  </div>
               </div>

               {/* 3. Gender Equity - Full Width on Mobile, Span on Desktop if needed, or keeping grid balanced */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:bg-purple-100"></div>
                  <div className="relative z-10">
                     <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                        </svg>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">Gender Equity and Equality Workshop</h3>
                     <p className="text-slate-600 leading-relaxed mb-6">
                        SEMI is the first emergency medicine society globally to run structured Gender Equity & Equality Workshops, addressing unconscious bias, workplace harassment, pay and leadership gaps, inclusive emergency department design, and maternity and family-friendly policies.
                     </p>
                     <p className="text-slate-600 leading-relaxed">
                        We're committed to building a specialty that's not only clinically excellent but also just and equitable.
                     </p>
                  </div>
               </div>

               {/* 4. Rural Care */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:bg-green-100"></div>
                  <div className="relative z-10">
                     <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">Rural & Semi-Urban Emergency Care</h3>
                     <p className="text-slate-600 leading-relaxed mb-6">
                        Through partnerships with state health systems, SEMI supports PHC/CHC emergency training, Tele-EM pilots, skill development for non-specialists, and system design for ambulance and referral pathways.
                     </p>
                     <p className="text-slate-600 leading-relaxed">
                        We're working to ensure that quality emergency care isn't an urban privilege but a universal reality.
                     </p>
                  </div>
               </div>
            </div>

            {/* Community Gallery Section */}
      <ImageGallery 
        subtitle="On The Ground"
        title="Impact & Action"
        description="Snapshots from our nationwide campaigns, humanitarian response efforts, and community training sessions."
        images={communityImages}
      />

      {/* Bridge Section */}
            <div className="mt-20 text-center max-w-4xl mx-auto">
               <p className="text-2xl font-light text-slate-700 italic">
                  "These initiatives reinforce SEMI's belief that emergency care is a shared responsibility—from bystanders to prehospital teams to emergency departments. Everyone has a role to play in saving lives."
               </p>
            </div>
         </div>
      </div>

      {/* Manifesto / Closing Section - High Impact Design */}
      <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
         {/* Abstract shapes */}
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

         <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <span className="text-blue-400 tracking-widest uppercase font-bold text-sm">Our Work, One Purpose</span>
               <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-8 leading-tight">
                  To build an India where every emergency is met with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">preparedness, skill, and compassion.</span>
               </h2>
               <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Across all these efforts—policy, advocacy, training, research, collaboration, and service—SEMI's purpose remains constant.
               </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-16 border border-white/10 shadow-2xl">
               <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                     <h3 className="text-2xl font-bold mb-6 text-white">Ensuring Emergency Medicine is:</h3>
                     <ul className="space-y-4">
                        {[
                          "Recognized as a specialty",
                          "Respected as a profession",
                          "Accessible as a public service",
                          "Supported as a system"
                        ].map((item, i) => (
                           <li key={i} className="flex items-center text-lg text-slate-200">
                              <span className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mr-4">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                 </svg>
                              </span>
                              {item}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="text-lg text-slate-300 leading-relaxed italic border-l-4 border-blue-600 pl-8">
                     "This isn't just what we do. It's who we are. It's our promise to every person in India who will face an emergency—and to everyone who will be there to help them through it."
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CommunityOutreach;


