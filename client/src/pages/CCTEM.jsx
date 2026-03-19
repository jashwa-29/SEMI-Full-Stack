import React from 'react';
import PageHeader from '../Components/PageHeader';
import imgSrinath from '../assets/Dr.Srinath Kumar.T.S.webp';
import imgSowjanya from '../assets/Dr. SOWJANYA SHREE PATIBANDLA.webp';
import cctImg1 from '../assets/cctem-1.png';
import cctImg2 from '../assets/cctem-2.png';
import ImageGallery from "../Components/ImageGallery";

const CCTEM = () => {
  const cctImages = [cctImg1, cctImg2];
  const coordinators = [
    {
      name: "Dr Srinath Kumar",
      role: "Chair, academics",
      image: imgSrinath,
      email: "sriruturekha@yahoo.co.in"
    },
    {
      name: "Dr.Shree Sowjanya P",
      role: "Controller of Examinations",
      image: imgSowjanya,
      email: "exams@semi.org.in"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="CCT EM"
        description="Certificate of Completion of Training in Emergency Medicine"
        breadcrumbs={[
          { label: "Education", link: "/education/workshops" },
          { label: "CCT EM" }
        ]}
      />

      <ImageGallery 
        subtitle="Program Gallery"
        title="Training in Action"
        description="Visuals from our CCT EM training sessions and certification ceremonies."
        images={cctImages}
      />

      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The CCT EM program is overseen by senior leadership to ensure excellence in Emergency Medicine training and evaluation across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {coordinators.map((dr, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-50 shadow-md group-hover:border-blue-100 transition-colors">
                    <img 
                      src={dr.image} 
                      alt={dr.name} 
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                      CCT EM COORDINATOR
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{dr.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-4">{dr.role}</p>
                
                <a href={`mailto:${dr.email}`} className="inline-flex items-center text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {dr.email}
                </a>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-20 bg-blue-900 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 opacity-50 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Contact for CCT EM</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                For queries regarding center accreditation, trainee enrollment, or examination schedules for the CCT EM program, please contact our head office.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a href="mailto:headoffice@semi.org.in" className="flex items-center gap-3 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  headoffice@semi.org.in
                </a>
                <a href="tel:+917732020000" className="flex items-center gap-3 border border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91-7732020000
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CCTEM;
