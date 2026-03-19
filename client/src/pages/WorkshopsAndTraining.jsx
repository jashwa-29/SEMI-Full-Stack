import React from 'react';
import PageHeader from '../Components/PageHeader';
import wkImg1 from "../assets/workshop-1.jpeg";
import wkImg2 from "../assets/workshop-2.jpeg";
import wkImg3 from "../assets/workshop-3.jpeg";
import wkImg4 from "../assets/workshop-4.jpeg";
import wkImg5 from "../assets/workshop-5.jpeg";
import ImageGallery from "../Components/ImageGallery";

// Import PDF assets
import premPdf from '../assets/pdfs/Workshops/PREM- Workshop.pdf';
import disasterPdf from '../assets/pdfs/Workshops/NDLS.pdf';
import traumaPdf from '../assets/pdfs/Workshops/NTLS brochure.pdf';
import edqcPdf from '../assets/pdfs/Workshops/Quality workshop - Brochure.pdf';
import nclsPdf from '../assets/pdfs/Workshops/NCLS.pdf';
import lawerPdf from '../assets/pdfs/Workshops/LAWer Brochure.pdf';
import angels2025Pdf from '../assets/ANGELS 2025 ADVANCED NATIONAL GERIATRIC LIFE SUPPORT.pdf';
import leaderBrochure from '../assets/leader-brochure.png';

const WorkshopsAndTraining = () => {
  const wkImages = [wkImg1, wkImg2, wkImg3, wkImg4, wkImg5];
  const workshops = [
    {
      id: "angels2025",
      title: "ANGELS 2025: ADVANCED NATIONAL GERIATRIC LIFE SUPPORT",
      subtitle: "One Day Training Program",
      tag: "Geriatric Care",
      color: "from-blue-700 to-indigo-900",
      description: "A specialized one-day program focused on Advanced National Geriatric Life Support, covering essential topics from registration and ER setup to specialized care and skill stations. Designed to equip healthcare professionals with the knowledge needed to manage geriatric emergencies effectively.",
      date: "August 25, 2025",
      venue: "Dr. Kamakshi Memorial Hospital, Pallikaranai, Chennai",
      topics: [
        "How to Setup a Geriatric Friendly ER & Triaging",
        "Commonest Complaints & Frailty in Elderly",
        "Airway & Ventilation in Elderly",
        "Physical & Physiological Changes in Elderly",
        "Trauma Management and Fractures in Elderly",
        "Diabetic & Nutritional Changes in Elderly",
        "Neuro Disorders in Elderly",
        "Failing Heart & Pacing in Elderly Heart",
        "Elder Abuse",
        "Airlifting a Elderly Patient",
        "Infection Control & Poly Pharmacy",
        "Dementia, Delirium & Psychiatry"
      ],
      skills: [
        "Scenario: Older Trauma Patient",
        "Scenario: Older Patient with Sepsis",
        "Delirium / Cognitive Impairment",
        "Pain Management"
      ],
      audience: ["Emergency Physicians", "EM Residents", "Geriatric Care Specialists", "Nursing Staff", "General Practitioners"],
      duration: "One Day (Offline/Online)",
      includes: ["Scientific Talks (08:00 AM - 01:00 PM)", "Skill Stations (02:00 PM - 04:00 PM)", "Course Material & Certification"],
      contacts: [
        { name: "Program Coordinator", phone: "8618195878" },
        { name: "Support", phone: "9894686088" }
      ],
      pdf: angels2025Pdf
    },
    {
      id: "prem",
      title: "PEDIATRIC RESUSCITATION EMERGENCY MEDICINE (PREM)",
      subtitle: "Workshop by SEMI Paediatric SIG",
      tag: "Paediatric Care",
      color: "from-blue-600 to-indigo-700",
      description: "Children are not \"small adults.\" Their physiology, response to illness, and the progression of emergencies can be subtle yet fast, demanding rapid assessment, precise interventions, and calm teamwork. This workshop is designed to equip healthcare professionals with the knowledge, skills, and confidence needed to respond effectively when minutes matter.",
      objectives: [
        "Learn to recognize the critically ill or deteriorating child early",
        "Practice high-quality resuscitative techniques specific to paediatric patients (airway, breathing, circulation)",
        "Work through simulated scenarios of paediatric cardiac and respiratory emergencies",
        "Enhance team communication, role clarity, leadership, and decision-making under pressure"
      ],
      highlights: ["Expert team of faculties", "Simulation and table top exercises"],
      audience: ["PG's Residents of Emergency Medicine", "Emergency Physicians", "Intensivists", "Pediatric postgraduates"],
      includes: ["Course material", "Certification"],
      duration: "One day",
      contacts: [
        { name: "Dr. T.S. Srinathkumar", role: "Academic Chair, SEMI", phone: "+91 9583100238" },
        { name: "Dr. Saravanakumar.S", role: "Immediate Past President & Executive Co Chair - SEMI", phone: "+91 9486668575" }
      ],
      pdf: premPdf
    },
    {
      id: "disaster",
      title: "INTERNAL DISASTER PREPAREDNESS",
      subtitle: "Basic Course for Health Care Professionals",
      tag: "Disaster Management",
      color: "from-red-600 to-orange-700",
      description: "Disasters don’t wait—neither should preparedness. In the complex and fast-moving landscape of healthcare and institutional operations, a well-prepared internal response capability is not optional but essential. This workshop is designed to equip staff, leadership, and support teams with the knowledge and skills to respond swiftly when the unexpected strikes.",
      topics: [
        "Hospital Incident Command System",
        "NDMA Framework For Preparedness",
        "Hospital Emergency Operation Planning",
        "Triage",
        "Mass Casualty Incidence Protocols",
        "Lessons from Past Disasters & Discussions",
        "Evacuation Exercise"
      ],
      audience: ["Emergency & Critical care Doctors", "Emergency Paramedics", "Nurses", "Safety Officers", "Quality Professionals", "Hospital Administrators", "Medical Directors", "Hospital Operation Heads"],
      duration: "One day workshop",
      includes: ["Course material", "Certification"],
      contacts: [
        { name: "Dr. T.S. Srinathkumar", role: "Academic Chair, SEMI", phone: "+91 9583100238" },
        { name: "Dr. Saravanakumar.S", role: "Immediate Past President & Executive Co Chair - SEMI", phone: "+91 9486668575" }
      ],
      pdf: disasterPdf
    },
    {
      id: "trauma",
      title: "TRAUMA MANAGEMENT COURSE",
      subtitle: "Comprehensive Trauma Care Training",
      tag: "Trauma Care",
      color: "from-orange-500 to-red-600",
      description: "A comprehensive course covering the entire spectrum of trauma care from initial assessment to specialized injury management and transport.",
      topics: [
        "Initial assessment & management",
        "Head, Facio maxillary, Thoracic, Abdominal trauma",
        "Pelvic, Spinal, Extremity trauma",
        "Shock, Paediatric trauma, Thermal Injury",
        "Trauma radiology, Trauma transport",
        "Biomechanics of injury",
        "Hemorrhage control & wound care"
      ],
      skills: [
        "Airway management",
        "Triage and logroll",
        "e-FAST",
        "Needle cricothyroidotomy & ICD insertion",
        "IO Access & Polytrauma assessment",
        "EMS audit",
        "Dislocations & Splinting"
      ],
      audience: ["Doctors", "Nurses", "Paramedics", "Emergency Physicians", "Surgeons"],
      duration: "2 days Training",
      includes: ["Course material", "Certification"],
      pdf: traumaPdf
    },
    {
      id: "edqc",
      title: "EMERGENCY DEPARTMENT QUALITY CHAMPION (EDQC)",
      subtitle: "Professional Certificate Course",
      tag: "Quality & Safety",
      color: "from-emerald-600 to-teal-700",
      description: "Official training program of SEMI to train Emergency Physicians on Quality Improvement & Patient Safety. A hybrid training program for effective quality implementation, quality assurance and creating impact in the workplace.",
      audience: ["Emergency Medicine Physicians", "Nurse Leaders"],
      topics: [
        "Quality assurance in ED (Structure, Process & Outcomes)",
        "Quality tools for ER (Root cause analysis and CAPA)",
        "Key Performance Indicator for Indian ED",
        "Accreditation standards (WHO, ISRO-SEMI guidelines)",
        "Effective Communication & Patient Safety management",
        "Clinical Governance (Leadership, Clinical Audit, Risk Management)"
      ],
      duration: "2 days",
      includes: ["On successful completion, EDQC certificate issued by SEMI"],
      contacts: [
        { name: "Dr. Srinathkumar T.S", role: "Academic Chair - SEMI", phone: "+91 9538100238" },
        { name: "Dr. Saravanakumar.S", role: "National Secretary - SEMI", phone: "+91 9486668575" }
      ],
      pdf: edqcPdf
    },
    {
      id: "ncls",
      title: "NATIONAL CARDIAC LIFE SUPPORT (NCLS)",
      subtitle: "Certification Course for Healthcare Professionals",
      tag: "Cardiac Care",
      color: "from-blue-600 to-blue-600",
      description: "Improve knowledge & skills in basic and advanced Cardiac life support with our low-cost training designed for relevant scenarios in the Indian context. Widely accepted by regulatory and accreditation bodies.",
      topics: [
        "Out of hospital cardiac arrest & AED",
        "Choking - Adult, Pediatric & Infant",
        "BLS - Pediatric & Infant",
        "ACLS & Reversable causes",
        "Immediate post cardiac arrest care",
        "Acute coronary syndrome & Stroke management",
        "Team dynamics"
      ],
      skills: [
        "Basic Life Support - Adult, Paediatric & Infant",
        "AED & Airway management",
        "Arrhythmia recognition and management",
        "Defibrillation & Cardioversion operations",
        "ACLS - Mega Code"
      ],
      audience: ["Doctors", "Nurses", "Paramedics", "Medical Students"],
      duration: "2 days",
      includes: ["Course manual", "Certificate (Valid for 2 years)"],
      contacts: [
        { name: "Dr. T.S. Srinathkumar", role: "Academic Chair - SEMI", phone: "+91 9583100238" },
        { name: "Dr. S. Saravanakumar", role: "National Secretary - SEMI", phone: "+91 9486668575" }
      ],
      pdf: nclsPdf
    },
    {
      id: "lawer",
      title: "LAW-ER: LAW AND EMERGENCY MEDICINE",
      subtitle: "Medico-Legal Education & Certification Program",
      tag: "Medico-Legal",
      color: "from-slate-700 to-slate-900",
      description: "As physicians we cannot be ignorant about law anymore. LAW-ER helps you understand the interface with healthcare to build a \"legally\" safe department, institution, career and practice. Welcome to LAW-ER.",
      objectives: [
        "Develop idea about Indian legal system interphase in healthcare",
        "Specific legal issues and case laws in emergency medicine",
        "Ensure your team is legally \"right\"",
        "Help take critical decisions in complex legal situations",
        "Avoid litigation risk and understand valid defenses"
      ],
      topics: [
        "Basics of Law, Tort and Criminal liability",
        "Negligence & Defences, Contract, Consent",
        "Advanced medical Directive, DNR, Euthanasia",
        "MCI Code of conduct and ethical regulations",
        "Consumer Protection Act & Supreme Court judgments",
        "Sexual assault victims, MTP Act, Mental Health act",
        "Court summons and hearing etiquette"
      ],
      audience: ["All Emergency Physicians", "EM Residents", "ED Nursing Heads"],
      contacts: [
        { name: "Dr S Saravana Kumar", phone: "9486668575" },
        { name: "Dr T S Srinath Kumar", phone: "9538100238" }
      ],
      pdf: lawerPdf
    },
    {
      id: "leader",
      title: "ED LEADERSHIP COURSE (LEADER)",
      subtitle: "Breakthrough Thought Leadership Program",
      tag: "Leadership",
      color: "from-purple-900 to-indigo-900",
      description: "Experience a breakthrough thought leadership program designed by successful leaders in EM to help you grow professionally and personally. Share, apply and explore ideas to help transform your practice, develop a mindset that will empower you to successfully navigate the challenges and drive change in your department and organization.",
      topics: [
        "Leadership - Systems thinking",
        "Leader Traits - What organisation looks for",
        "Understanding ED Finance",
        "Data driven decision and problem solving",
        "Result based leadership",
        "Effective Negotiation",
        "Leading in Volatility, Uncertainty, Complexity, Ambiguity (VUCA)",
        "Measuring Success & Balanced score card",
        "Quality driven leadership strategy",
        "Thriving through Change",
        "Technology transformation in Emergency Medicine",
        "Real ED growth Case studies from India"
      ],
      skills: [
        "Setting yourself for success",
        "\"Scale up\" checklist",
        "Developing Self awareness",
        "Creating a better workplace",
        "Women in leadership role",
        "Marketing your ED",
        "Managing ED violence",
        "Setting up an Emergency Department",
        "Bringing joy at work and home",
        "Designing customer experience",
        "Net Promoter score",
        "ER Process Value Stream mapping",
        "Personal growth plan",
        "KPI's for your ED"
      ],
      audience: [
        "New EM graduates",
        "Deputy Heads of ED",
        "Consultants who aspire to lead",
        "Emergency Department HODs",
        "New to EM leadership role",
        "Final year residents of EM"
      ],
      duration: "2 days Residential (20h) + Online pre-course (10h)",
      contacts: [
        { name: "Dr. Saravana Kumar", phone: "9486668575", role: "Contact Person" },
        { name: "Dr. Srinath Kumar", phone: "9538100238", role: "Contact Person" }
      ],
      pdf: leaderBrochure
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Workshops & Training Programs"
        description="SEMI delivers standardized national programs and specialized workshops that equip healthcare professionals with life-saving skills. Our courses are designed for the Indian context and recognized nationally."
        breadcrumbs={[
          { label: "Education", link: "/education" },
          { label: "Workshops" }
        ]}
      />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-20">
          {workshops.map((workshop, index) => (
            <div key={workshop.id} id={workshop.id} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${workshop.color} opacity-10 rounded-bl-full -mr-8 -mt-8`}></div>
                
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${workshop.color} text-white`}>
                        {workshop.tag}
                      </span>
                      <span className="text-gray-400 text-sm font-medium">| {workshop.duration}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{workshop.title}</h2>
                    <p className="text-xl text-blue-600 font-semibold mb-6">{workshop.subtitle}</p>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {workshop.description}
                    </p>

                    <div className={`grid grid-cols-1 ${workshop.objectives && (workshop.topics || workshop.highlights) ? 'md:grid-cols-2' : ''} gap-8`}>
                      {workshop.objectives && (
                        <div>
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            Program Objectives
                          </h4>
                          <ul className="space-y-3">
                            {workshop.objectives.map((obj, i) => (
                              <li key={i} className="text-gray-600 text-sm flex items-start">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                {obj}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {(workshop.topics || workshop.highlights) && (
                        <div>
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </span>
                            {workshop.topics ? "Key Topics" : "Course Highlights"}
                          </h4>
                          <ul className={workshop.objectives ? "space-y-3" : "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"}>
                            {(workshop.topics || workshop.highlights).map((item, i) => (
                              <li key={i} className="text-gray-600 text-sm flex items-start">
                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {workshop.skills && (
                      <div className="mt-8">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <span className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </span>
                          Skill Stations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {workshop.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-1/3 bg-gray-50 rounded-2xl p-6 border border-gray-100 h-fit">
                    {workshop.audience && (
                      <div className="mb-8">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Who Should Attend</h4>
                        <div className="flex flex-wrap gap-2">
                          {workshop.audience.map((item, i) => (
                            <span key={i} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {workshop.includes && (
                      <div className="mb-8">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Course Includes</h4>
                        <ul className="space-y-2">
                          {workshop.includes.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-700 font-medium">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {workshop.contacts && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Coordinators</h4>
                        <div className="space-y-4">
                          {workshop.contacts.map((contact, i) => (
                            <div key={i} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                              <p className="font-bold text-gray-900 text-sm">{contact.name}</p>
                              {contact.role && <p className="text-xs text-gray-500 mb-2">{contact.role}</p>}
                              <a href={`tel:${contact.phone}`} className="text-blue-600 text-xs font-bold hover:underline flex items-center">
                                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7.5V5z" />
                                </svg>
                                {contact.phone}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}



                    {workshop.pdf && (
                      <div className="mt-8 border-t border-gray-100 pt-8">
                        <a
                          href={workshop.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${workshop.color} text-white font-bold transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group/btn`}
                        >
                          <svg className="w-5 h-5 transition-transform group-hover/btn:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Brochure
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageGallery 
        subtitle="Training in Action"
        title="Workshop Highlights"
        description="Hands-on skill stations, simulation training, and expert-led sessions from our recent workshops."
        images={wkImages}
      />

      {/* Corporate/Institutional Section */}
      <div className="bg-gray-900 py-20 mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Bring SEMI Training to Your Institution</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Hospitals, medical colleges, and government institutions can partner with SEMI to host these certified emergency medicine training programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:headoffice@semi.org.in" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg">
              Partner with SEMI
            </a>
            <a href="tel:+919494414911" className="px-8 py-4 border border-gray-700 text-white font-bold rounded-xl hover:bg-gray-800 transition-all">
              Contact Training Division
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopsAndTraining;


