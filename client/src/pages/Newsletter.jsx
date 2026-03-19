import React from 'react';
import PageHeader from '../Components/PageHeader';
import yearbook2023 from '../assets/pdfs/NewsLetter/SEMI - Year Book 2023-2024 (1).pdf';
import yearbook2025 from '../assets/pdfs/NewsLetter/SEMI - Yearbook 2025 (1)-compressed.pdf';

const Newsletter = () => {
  const newsletters = [
    {
      title: "SEMI Year Book 2024 - 2025",
      period: "2024 - 2025",
      file: yearbook2025,
      description: "Bringing you the latest updates, achievements, and future vision of SEMI for the upcoming year.",
      color: "from-blue-600 to-indigo-700",
      tag: "Latest"
    },
    {
      title: "SEMI Year Book 2023-2024",
      period: "2023 - 2024",
      file: yearbook2023,
      description: "A comprehensive report on the activities, milestones, and progress made by SEMI during the 2023-2024 term.",
      color: "from-indigo-500 to-purple-600",
      tag: "Archive"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="SEMI Newsletters & Year Books"
        description="Stay updated with the latest annual reports, achievement summaries, and future roadmaps of the Society for Emergency Medicine India."
        breadcrumbs={[
          { label: "News", link: "/news/newsletter" },
          { label: "Newsletter" }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {newsletters.map((item, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white border border-gray-100 rounded-3xl p-8 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full -mr-8 -mt-8`}></div>
                
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${item.color} text-white shadow-sm`}>
                    {item.tag}
                  </span>
                  <div className="text-blue-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168 0.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332 0.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332 0.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-blue-600 font-semibold text-sm mb-4">{item.period}</p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {item.description}
                </p>

                <a 
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg group/btn w-full justify-center"
                >
                  Download Year Book
                  <svg className="ml-2 w-5 h-5 transform group-hover/btn:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      

    </div>
  );
};

export default Newsletter;


