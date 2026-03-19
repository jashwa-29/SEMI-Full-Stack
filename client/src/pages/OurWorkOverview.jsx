import PageHeader from '../Components/PageHeader';

const OurWorkOverview = () => {
  const features = [
    {
      title: "Training & Education",
      subtitle: "Building a Skilled Workforce",
      desc: "Comprehensive life support programs (NBLS/NCLS/NTLS) for healthcare professionals, specialized workshops in POCUS, trauma, pediatrics, and extreme medicine. Collaboration with Tamil Nadu Dr. MGR Medical University and HSSC.",
      icon: "🎓",
      color: "bg-blue-600",
      link: "/work/training",
      stats: "100,000+ Trained"
    },
    {
      title: "Conferences & Academic Events",
      subtitle: "Knowledge Sharing & Collaboration",
      desc: "EMCON national conferences, regional SEMICONs, zonal meetings, and international collaborations. World-class platforms for emergency medicine professionals to share innovations and best practices.",
      icon: "🤝",
      color: "bg-orange-500",
      link: "/work/events",
      stats: "8,000+ Delegates Annually"
    },
    {
      title: "Technology & Innovation",
      subtitle: "Transforming Emergency Care",
      desc: "ISRO Geo-Tagging Project, Health-QUEST quality initiatives, drone technology in healthcare, and AI-based emergency resuscitation programs. Collaborations with space agencies and tech partners.",
      icon: "🚀",
      color: "bg-purple-600",
      link: "/work/innovation",
      stats: "15+ Tech Initiatives"
    },
    {
      title: "Policy & Advocacy",
      subtitle: "Shaping India's Emergency Framework",
      desc: "Engagement with Union and State governments, development of national clinical protocols (SEMI Plexus), establishment of emergency medicine as a distinct specialty, and quality standard drafting.",
      icon: "⚖️",
      color: "bg-green-600",
      link: "/work/policy",
      stats: "20+ Policy Engagements"
    }
  ];

  const specialInitiatives = [
    {
      title: "Rural & Community Medicine",
      desc: "Focus on underserved regions including Mizoram, Assam, Purulia with tailored training programs for government doctors and nurses.",
      color: "bg-pink-500"
    },
    {
      title: "International Collaboration",
      desc: "Global partnerships with ESEM, ACEP, IFEM, Sri Lankan SEM, and participation in ICEM, ACEP, SAE conferences worldwide.",
      color: "bg-blue-600"
    },
    {
      title: "Specialized SIGs",
      desc: "Pediatric Emergency Medicine (PEM), Geriatrics, Quality, Pre-hospital care, and Women in EM special interest groups.",
      color: "bg-orange-500"
    },
    {
      title: "Public Awareness",
      desc: "Mass CPR training for students, police, transport personnel, and bystander training across multiple states.",
      color: "bg-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <PageHeader 
        title="Our Work"
        description="Emergency Medicine in India cannot be strengthened by clinical skill alone — it requires aligned systems, trained personnel, supportive policy, public awareness, and a community that believes in saving lives with dignity. The Society for Emergency Medicine India (SEMI) works across this entire spectrum to ensure that every emergency in India is met with preparedness, skill, and compassion."
        breadcrumbs={[
          { label: "Our Work", link: "/work/overview" },
          { label: "Overview" }
        ]}
      >
        <div className="flex flex-wrap gap-4 justify-center mt-8">
           <a 
            href="/join"
            className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-full transition-all transform hover:-translate-y-1 shadow-lg"
          >
            Join 15,000+ Emergency Professionals
          </a>
        </div>
      </PageHeader>

      {/* New Overview Section - Strengthening Emergency Care as a System */}
      <div className="relative overflow-hidden py-20 bg-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply opacity-70 blur-3xl filter -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply opacity-70 blur-3xl filter translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 mb-10 lg:mb-0 relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden transform transition-transform hover:scale-[1.02]">
                 <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                 <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                 
                 <h3 className="text-2xl font-bold mb-6 font-display">Developing a Structured Specialty</h3>
                 <p className="text-blue-100 mb-6 leading-relaxed">
                   Our systems-oriented approach ensures that emergency care in India doesn't grow in isolated pockets of excellence, but develops as a structured, evidence-based, and people-centered specialty accessible to everyone who needs it.
                 </p>
                 <div className="flex items-center space-x-4">
                   <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-2xl">🏥</span>
                   </div>
                   <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-2xl">🚑</span>
                   </div>
                   <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-2xl">👨‍⚕️</span>
                   </div>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-7">
               <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                  Overview
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  Strengthening Emergency Care as a System
               </h2>
               <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-justify">
                  <p>
                    Emergency medicine doesn't start when someone walks through hospital doors. It starts in the community—with a bystander recognizing a crisis, a family making the decision to call for help, an ambulance racing through traffic. It extends through prehospital care and culminates in a coordinated hospital response.
                  </p>
                  <p>
                    SEMI works across this entire continuum because we understand that emergency care isn't just about what happens in emergency departments—it's about building a system that works at every level.
                  </p>
                  <p>
                    Our mission is to build Emergency Medicine as a strong academic discipline while simultaneously strengthening emergency care delivery across all levels of India's health system. We support hospitals and universities in establishing robust Emergency Medicine programs and promote equitable access to emergency services whether you live in a metro city, a small town, or a rural village.
                  </p>
                  <p>
                    This comprehensive work happens through close collaboration with government and regulatory agencies, universities and teaching hospitals, professional boards, accreditation bodies, and both national and international emergency medicine societies.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-600 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Be Part of the Evaluation</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-xl leading-relaxed">
              Join thousands of emergency care professionals who are transforming healthcare delivery across India. 
              Whether you're a physician, nurse, paramedic, or student, SEMI has a place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/membership"
                className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-full transition-all transform hover:-translate-y-1 shadow-xl text-lg"
              >
                Become a Member
              </a>
     
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurWorkOverview;


