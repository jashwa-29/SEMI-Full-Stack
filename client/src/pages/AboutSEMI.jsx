import PageHeader from '../Components/PageHeader';

const AboutSEMI = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Shaping Emergency Medicine. Saving Lives. Building Systems."
        description="The Society for Emergency Medicine India (SEMI) is the national voice of Emergency Medicine in the country. But more than an organization, SEMI is a community built on hope, conviction, and an unshakeable belief that every life matters."
        breadcrumbs={[
          { label: "About SEMI" }
        ]}
      />

      {/* Intro & Purpose */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-28 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">We exist because emergencies do not wait.</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            And because no life should be lost for want of timely, trained, and compassionate care.
          </p>
        </div>
      </div>

      {/* History Section: Before SEMI */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Before SEMI: Emergency Care Prior to 1999</h2>
              <div className="w-20 h-1 bg-blue-600 mb-8"></div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Before 1999, emergency care in India existed — but it was largely unstructured, unsupervised, unsupported and fragmented.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Emergency rooms were often referred to as “casualty rooms.” They were staffed predominantly by the youngest and least experienced doctors, frequently fresh graduates, working without formal training in emergency medicine, without standard protocols, and often without senior supervision.
              </p>
              <ul className="space-y-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">No structured emergency medicine training programs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">No defined career pathways</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">No nationally accepted protocols</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Limited recognition as a specialty requiring dedicated expertise</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Where It All Began</h3>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "SEMI did not begin in a boardroom or with a grand strategy document. It began in 1999 with something far simpler — and far more powerful: A refusal."
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">A refusal to accept that people should die because help did not arrive on time.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">A refusal to believe that India could not build a strong, modern emergency care system.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">A refusal to watch preventable tragedies go unanswered.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* The Pillars */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Built on Three Pillars</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              From its inception, SEMI was founded on three inseparable pillars that transformed Emergency Medicine in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Academics</h3>
              <p className="text-gray-600 leading-relaxed">
                Building the backbone of Emergency Medicine through structured training, curricula, short courses, fellowships, leadership programs, and national academic platforms.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                 </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Research</h3>
              <p className="text-gray-600 leading-relaxed">
                Advancing evidence-based practice, quality improvement, and innovation through publications, collaborations, and initiatives such as Health-QUEST with ISRO and AHPI, and the NJEM.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                 </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Standing where lives are most vulnerable—through disaster response, community CPR and first-aid training, rural outreach, and advocacy for equitable emergency care.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-white">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          {/* Phase 1 */}
          <div className="mb-20">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="lg:w-1/3">
                <div className="text-5xl font-bold text-gray-200">1999–2009</div>
                <h3 className="text-3xl font-bold text-blue-600 mt-2">Laying the Foundation</h3>
                <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold inline-block">
                  Mission: Recognition
                </div>
              </div>
              <div className="lg:w-2/3">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  In its formative years, SEMI emerged as the voice of a specialty still awaiting formal recognition. Members travelled extensively—teaching, advocating, and building awareness.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Global Collaboration</h4>
                    <p className="text-gray-600 text-sm">
                      Collaborated with Royal College (UK) and American universities to adapt best practices.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h4 className="font-bold text-blue-600 mb-2">Looking to the Future</h4>
                    <p className="text-blue-600 text-sm">
                      In 2009, Emergency Medicine was formally recognized as a postgraduate specialty in India—a defining milestone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="border-t border-gray-100 pt-20">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="lg:w-1/3">
                <div className="text-5xl font-bold text-gray-200">2010+</div>
                <h3 className="text-3xl font-bold text-blue-600 mt-2">Building Skills & Systems</h3>
                <div className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold inline-block">
                  Mission: Nation Building
                </div>
              </div>
              <div className="lg:w-2/3">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  With formal recognition achieved, SEMI shifted to standardization and large-scale capacity building. We worked with MCI and NBE to develop curricula and pioneered a national ecosystem of short courses.
                </p>
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h4 className="font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    SEMI Academic & Short Courses
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>• NBLS – National Basic Life Support</div>
                    <div>• NCLS – National Cardiac Life Support</div>
                    <div>• NTLS – National Trauma Life Support</div>
                    <div>• NDLS – National Disaster Life Support</div>
                    <div>• NULS – National Ultrasound Life Support</div>
                    <div>• National Airway Workshop</div>
                    <div>• National Toxicology Life Support</div>
                    <div>• Pediatric Emergency & Trauma Life Support</div>
                    <div>• Mechanical Ventilation in Emergency Care</div>
                    <div>• Emergency Nursing Skills Programs</div>
                    <div>• Basic ECG Courses</div>
                    <div>• LEADER & LAWER Training</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Where the Journey Stands Today</h2>
              <div className="prose prose-blue text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Two decades later, SEMI’s short course ecosystem is widely regarded as one of the most influential academic contributions to Emergency Medicine in India. Its impact extends far beyond tertiary hospitals — reaching ambulances, district hospitals, and even remote rural health systems.
                </p>
                <p>
                  What began as a small group of pioneers in 1999 has today become a national movement, shaping the skills, standards, and future of emergency care across the country.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">A Nationwide Movement</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">1</div>
                  <p className="text-gray-600 text-sm">Standardized emergency skills across hospitals, regions, and healthcare settings.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">2</div>
                  <p className="text-gray-600 text-sm">Strengthened postgraduate and residency training, creating confident physicians.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">3</div>
                  <p className="text-gray-600 text-sm">Supported government hospitals in scaling and upgrading emergency services.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">4</div>
                  <p className="text-gray-600 text-sm">Trained thousands of doctors, nurses, paramedics, and students across the country.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Video Section */}
      <div className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-28 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What we have done</h2>
          <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 aspect-video mx-auto transform hover:scale-[1.01] transition-transform duration-300">
             <iframe 
               className="absolute inset-0 w-full h-full"
               src="https://www.youtube.com/embed/P1mAsqnKMRM?rel=0" 
               title="Society for Emergency Medicine India"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSEMI;


