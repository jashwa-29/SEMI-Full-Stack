import React from 'react';
import PageHeader from '../Components/PageHeader';
import drHariprasadImg from '../assets/Dr. K Hari Prasad Photo.jpeg';
import drMaheshImg from '../assets/Dr. Mahesh Joshi Photo.jpeg';
import drImronImg from '../assets/Dr.Imron Subhan.webp';
import drSaravanaImg from '../assets/Dr. Saravanakumar.S.webp';

const ExecutiveMembers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Executive Leadership"
        description="Propelling the vision of Emergency Medicine across India."
        breadcrumbs={[
          { label: "About", link: "/about/semi" },
          { label: "Executive Leadership" }
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        
        {/* FIRST ERA: 2012-2023 */}
        <div className="space-y-16">
          
          {/* Dr. Hariprasad */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {/* Image Column */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
               <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center text-gray-400 shadow-inner relative">
                  <img 
                    src={drHariprasadImg} 
                    alt="Dr. K. Hariprasad" 
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-blue-900/5 pointer-events-none"></div>
               </div>
            </div>
            {/* Content Column */}
            <div className="w-full lg:w-3/4">
               <h3 className="text-2xl font-bold text-gray-900 mb-1">Dr. K. Hariprasad</h3>
               <p className="text-blue-700 font-bold text-sm uppercase tracking-wide mb-6">Executive Chair (2012–2023) | Founder Member</p>
               
               <div className="prose prose-lg text-gray-700 leading-relaxed text-left">
                 <p className="font-medium text-gray-900 mb-4">
                   Dr Hariprasad, Founder Member of SEMI, served as Executive Chair from 2012 to 2023, providing visionary leadership during the organisation’s formative and growth years.
                 </p>
                 <p>
                   Dr K. Hariprasad is a pioneer of Emergency Medicine in India and a senior healthcare leader with decades of experience in clinical practice, hospital administration, and system building. He played a seminal role in establishing organised emergency care in the country, including the development of India’s first dedicated Accident & Emergency hospital. Dr Hariprasad has held multiple national leadership positions, contributed significantly to academic growth and quality frameworks, and is widely recognised for his strategic vision and lasting contributions to Emergency Medicine in India.
                 </p>
               </div>
            </div>
          </div>

          {/* Dr. Mahesh Joshi */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {/* Image Column */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
               <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center text-gray-400 shadow-inner relative">
                  <img 
                    src={drMaheshImg} 
                    alt="Dr. Mahesh Joshi" 
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-blue-900/5 pointer-events-none"></div>
               </div>
            </div>
            
            {/* Content Column */}
            <div className="w-full lg:w-3/4">
               <h3 className="text-2xl font-bold text-gray-900 mb-1">Dr. Mahesh Joshi</h3>
               <p className="text-blue-700 font-bold text-sm uppercase tracking-wide mb-6">Executive Co-Chair (2012–2023)</p>
               
               <div className="prose prose-lg text-gray-700 leading-relaxed text-left">
                 <p className="font-medium text-gray-900 mb-4">
                    Dr Mahesh Joshi served as Executive Co-Chair from 2012 to 2023, playing a key role in strengthening governance and national engagement.
                 </p>
                 <p>
                    Dr Mahesh Joshi is a distinguished emergency physician and healthcare leader with extensive experience in clinical practice, healthcare systems, and education. He has played a pivotal role in advancing Emergency Medicine in India and has been recognised nationally and internationally for his contributions to the specialty, including speaking engagements and thought leadership. Dr. Joshi has also led innovative healthcare initiatives, including heading Apollo HomeHealthcare and contributing to community-oriented emergency care strategies. As Executive Co-Chair of SEMI from 2012 to 2023, he helped shape the organisation’s strategic direction and professional growth. His commitment to healthcare excellence and education continues to influence emergency care development across the country.
                 </p>
               </div>
            </div>
          </div>

        </div>

        {/* TRANSITION DIVIDER */}
        <div className="py-16">
          <div className="relative rounded-2xl bg-blue-600 text-white p-8 md:p-12 text-center overflow-hidden shadow-lg">
             <div className="absolute top-0 left-0 w-full h-full bg-blue-700 opacity-20 transform -skew-x-12"></div>
             <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
                  "In 2023, during the SEMI AGM held alongside EMCON 2023 at Hyderabad, A new executive leadership members were approved by SEMI members in 2023 AGM"
                </h2>
             </div>
          </div>
        </div>

        {/* NEW ERA */}
        <div className="space-y-16">
          
            {/* Dr. Imron Subhan */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              {/* Image Column */}
              <div className="w-full lg:w-1/4 flex-shrink-0">
                 <div className="aspect-[3/4] lg:aspect-auto lg:h-full bg-gray-100 rounded-xl overflow-hidden shadow-inner relative">
                    <img 
                      src={drImronImg} 
                      alt="Dr. Imron Subhan" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-blue-900/5 pointer-events-none"></div>
                 </div>
              </div>
              {/* Content Column */}
              <div className="w-full lg:w-3/4">
               <h3 className="text-2xl font-bold text-gray-900 mb-1">Dr. Imron Subhan</h3>
               <p className="text-blue-700 font-bold text-sm uppercase tracking-wide mb-6">Executive Chair</p>
               
               <div className="prose prose-lg text-gray-700 leading-relaxed text-left">
                 <p className="font-medium text-gray-900 mb-4">
                    Dr Imron Subhan was appointed as Executive Chair, bringing renewed strategic direction and focus.
                 </p>
                 <p>
                    Dr Imron Subhan is a distinguished Emergency Medicine physician and leader with more than 14 years’ experience in advancing clinical excellence, education and systems development. He currently serves as Head of Emergency Medicine at Apollo Hospitals, Hyderabad, and has been a key voice in establishing structured Emergency Medicine training, residency leadership, and professional standards across India. A Past President of SEMI, Dr Subhan has represented Indian Emergency Medicine on international platforms including the IFEM, speaking on topics such as gender equity in the specialty, and driving academic, research and clinical quality initiatives. His work continues to shape emergency care systems and nurture the next generation of emergency clinicians nationally. 
                 </p>
               </div>
            </div>
          </div>

            {/* Dr. Saravana Kumar */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              {/* Image Column */}
              <div className="w-full lg:w-1/4 flex-shrink-0">
                 <div className="aspect-[3/4] lg:aspect-auto lg:h-full bg-gray-100 rounded-xl overflow-hidden shadow-inner relative">
                    <img 
                      src={drSaravanaImg} 
                      alt="Dr. S. Saravana Kumar" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-blue-900/5 pointer-events-none"></div>
                 </div>
              </div>
              {/* Content Column */}
              <div className="w-full lg:w-3/4">
               <h3 className="text-2xl font-bold text-gray-900 mb-1">Dr. S. Saravana Kumar</h3>
               <p className="text-blue-700 font-bold text-sm uppercase tracking-wide mb-6">Executive Co-Chair</p>
               
               <div className="prose prose-lg text-gray-700 leading-relaxed text-left">
                 <p className="font-medium text-gray-900 mb-4">
                    Dr Saravana Kumar was appointed as Executive Co-Chair, supporting leadership continuity and future initiatives.
                 </p>
                 <p>
                    Dr Saravana Kumar is a senior Emergency Medicine physician and healthcare systems leader with a distinguished record in clinical governance, quality improvement, and academic advancement. He serves as CEO at Dr. Mehta’s Hospitals, Chennai, and has been instrumental in establishing robust emergency care standards, quality & patient safety programmes, and structured training frameworks nationally. Dr Kumar’s work with SEMI over more than a decade includes strategic leadership roles, development of accreditation and training initiatives, and advancing emergency care policy and systems. His contributions extend to international engagement, including leadership in IFEM-aligned quality and accreditation efforts, and collaboration on emergency care guidelines informed by best practices from organisations such as ISRO in patient safety and systems design. Appointed Executive Co-Chair of SEMI in 2023, he continues to drive excellence, innovation, and scalable impact in Emergency Medicine across India and beyond.
                 </p>
               </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ExecutiveMembers;
