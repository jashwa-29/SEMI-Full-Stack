import React from 'react';
import PageHeader from '../Components/PageHeader';
import confImg1 from "../assets/conf-1.jpeg";
import confImg2 from "../assets/conf-2.jpeg";
import confImg3 from "../assets/conf-3.jpeg";
import confImg4 from "../assets/conf-4.jpeg";
import ImageGallery from "../Components/ImageGallery";

const ConferencesAndEvents = () => {
  const conferenceImages = [confImg1, confImg2, confImg3, confImg4];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-600">
      <PageHeader 
        title="Conferences & Academic Events"
        description="Platforms for Growth. SEMI's academic calendar is one of the most vibrant in Indian medical education."
        breadcrumbs={[
          { label: "Our Work", link: "/work/overview" },
          { label: "Conferences & Events" }
        ]}
      />

      {/* Intro Section - cleaner and more professional */}
      <div className="relative py-24 bg-white overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -mr-20 -mt-20 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -ml-20 -mb-20 mix-blend-multiply"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
               Where Professionals <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Connect, Innovate, and Grow</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              SEMI's academic calendar is one of the most vibrant in Indian medical education, creating spaces where emergency medicine professionals can learn, connect, innovate, and grow together.
            </p>
        </div>
      </div>

      {/* Our Programs - Premium Cards */}
      <div className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Academic Calendar</span>
               <h2 className="text-3xl font-bold text-slate-900 mt-2">Our Programs</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { 
                   title: "EMCON", 
                   desc: "Our flagship national annual congress.", 
                   icon: (
                     <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0V5.625a2.625 2.625 0 11-5.25 0v2.625m5.25 0H9.497" />
                     </svg>
                   ),
                   gradient: "from-amber-500/20 to-orange-500/20",
                   border: "border-amber-200"
                 },
                 { 
                   title: "SEMICON", 
                   desc: "A rapid revision conference focused on postgraduate students.", 
                   icon: (
                     <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                     </svg>
                   ),
                   gradient: "from-emerald-500/20 to-teal-500/20",
                   border: "border-emerald-200"
                 },
                 { 
                   title: "Zonal Conferences", 
                   desc: "Regional gatherings like EZEECON.", 
                   icon: (
                     <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                     </svg>
                   ),
                   gradient: "from-blue-600/20 to-cyan-500/20",
                   border: "border-blue-200"
                 },
                 { 
                   title: "Theme-based Summits", 
                   desc: "Specialized topics such as Space Medicine, Disaster Medicine, and ECMO.", 
                   icon: (
                     <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                     </svg>
                   ),
                   gradient: "from-purple-500/20 to-pink-500/20",
                   border: "border-purple-200"
                 }
               ].map((item, index) => (
                  <div key={index} className={`relative bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border ${item.border} group overflow-hidden`}>
                     <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} blur-2xl rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-500`}></div>
                     <div className="relative z-10">
                        <div className="text-4xl mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <ImageGallery 
        subtitle="Event Highlights"
        title="Seminars & Gatherings"
        description="Moments of learning, networking, and collaboration from our recent national and regional events."
        images={conferenceImages}
      />

      {/* Continuous Learning - Dark Modern Tech feel */}
      <div className="py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="lg:flex items-center gap-20">
               <div className="lg:w-1/2 mb-12 lg:mb-0">
                  <div className="inline-block px-4 py-1.5 bg-blue-600/20 border border-blue-600/30 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Year-Round Learning</div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                     Continuous Learning <br/><span className="text-blue-400">Throughout the Year</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-10">
                     We conduct workshops and CMEs across India covering critical and emerging topics in emergency medicine.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                     {[
                       "Ultrasound", "Ventilation", "Nerve blocks", "ECMO", 
                       "Trauma", "Simulation", "AI in Emergency Medicine", 
                       "Gender Equity & Workplace Safety"
                     ].map((topic, i) => (
                        <span key={i} className="px-5 py-2.5 bg-white/5 rounded-xl text-sm font-medium border border-white/10 hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-default text-slate-300 hover:text-white">
                           {topic}
                        </span>
                     ))}
                  </div>
               </div>
               
               {/* Visual Element - Card Stack */}
               <div className="lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full"></div>
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                     <div className="space-y-4 pt-8">
                        <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                           <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                              </svg>
                           </div>
                           <div className="font-bold text-white">AI in EM</div>
                           <div className="text-xs text-slate-500 mt-1">Emerging Tech</div>
                        </div>
                        <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                           <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                              </svg>
                           </div>
                           <div className="font-bold text-white">Gender Equity</div>
                           <div className="text-xs text-slate-500 mt-1">Workplace Safety</div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                           <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                              </svg>
                           </div>
                           <div className="font-bold text-white">ECMO</div>
                           <div className="text-xs text-slate-500 mt-1">Critical Care</div>
                        </div>
                        <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                           <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                              </svg>
                           </div>
                           <div className="font-bold text-white">Trauma</div>
                           <div className="text-xs text-slate-500 mt-1">Life Support</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Impact Section - Clean and Professional */}
      <div className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">More Than Knowledge Exchange</h2>
               <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
                  These platforms support far more than training—they are catalysts for comprehensive professional development.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
               {[
                 { text: "Research Dissemination", icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                 ) },
                 { text: "Mentorship & Networking", icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                 ) },
                 { text: "Skills Training", icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                 ) },
                 { text: "Fellowship Pathways", icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.24 51.558 51.558 0 01-3.032.553M3.18 15.398A59.945 59.945 0 0112 20.904 59.943 59.943 0 0120.82 15.398" />
                    </svg>
                 ) },
                 { text: "Innovation Exposure", icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.854 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.462 1.508 1.333 1.508 2.316V18" />
                    </svg>
                 ) }
               ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center group">
                     <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/30">
                        {item.icon}
                     </div>
                     <div className="font-bold text-slate-800 text-center font-lg group-hover:text-blue-600 transition-colors">{item.text}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Conclusion - Elegant Card */}
      <div className="py-24 bg-slate-50">
         <div className="max-w-6xl mx-auto px-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
               <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-30"></div>
               <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
               
               <div className="relative z-10">
                  <span className="text-6xl text-blue-300 font-serif leading-none opacity-50 block mb-6">"</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-light italic leading-relaxed max-w-4xl mx-auto">
                    SEMI conferences aren't just academic events—they're community-building opportunities that shape the specialty's identity, create lasting professional relationships, and inspire the next generation of emergency medicine leaders.
                  </h2>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ConferencesAndEvents;


