import PageHeader from '../Components/PageHeader';
import vol1issue1_full from '../assets/pdfs/Volume 1 Issue 1 (January–April 2023).pdf';
import vol1issue1_short from '../assets/pdfs/Volume 1 Issue 1.pdf';
import vol1issue3 from '../assets/pdfs/Volume 1 Issue 3 (September–December 2023).pdf';
import vol2issue1 from '../assets/pdfs/Volume 2 Issue 1 (January–April 2024).pdf';
import vol2issue3 from '../assets/pdfs/Volume 2 Issue 3 (September–December 2024).pdf';
import vol3issue1 from '../assets/pdfs/Volume 3 Issue 1 (January–April 2025).pdf';

const Publications = () => {
  const njemJournals = [
    {
      title: "NJEM Volume 3 Issue 1",
      period: "January–April 2025",
      file: vol3issue1,
      status: "Latest Issue",
      color: "from-blue-600 to-indigo-700"
    },
    {
      title: "NJEM Volume 2 Issue 3",
      period: "September–December 2024",
      file: vol2issue3,
      status: "Recent",
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "NJEM Volume 2 Issue 1",
      period: "January–April 2024",
      file: vol2issue1,
      status: "Archive",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "NJEM Volume 1 Issue 3",
      period: "September–December 2023",
      file: vol1issue3,
      status: "Archive",
      color: "from-pink-500 to-rose-600"
    },
    {
      title: "NJEM Volume 1 Issue 1 (Full)",
      period: "January–April 2023",
      file: vol1issue1_full,
      status: "Archive",
      color: "from-rose-500 to-orange-600"
    },
    {
      title: "NJEM Volume 1 Issue 1",
      period: "January–April 2023",
      file: vol1issue1_short,
      status: "Archive",
      color: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Advancing Knowledge Through Publications"
        description="SEMI's comprehensive publication portfolio includes peer-reviewed journals, groundbreaking research, annual reports, and training materials that shape emergency medicine practice across India and internationally."
        breadcrumbs={[
          { label: "Resources", link: "/resources/publications" },
          { label: "Publications" }
        ]}
      />

      {/* NJEM Journals Section */}
      <div id="journals" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">National Journal of Emergency Medicine (NJEM)</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            SEMI's official peer-reviewed journal featuring groundbreaking research, clinical reviews, and case studies from across India.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {njemJournals.map((journal, index) => (
            <div key={journal.title} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
              <div className={`h-3 bg-gradient-to-r ${journal.color}`}></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    journal.status === 'Latest Issue' ? 'bg-blue-100 text-blue-600' :
                    journal.status === 'Recent' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {journal.status}
                  </span>
                  <div className="text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {journal.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {journal.period}
                </p>
                
                <a 
                  href={journal.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg"
                >
                  Download PDF
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default Publications;


