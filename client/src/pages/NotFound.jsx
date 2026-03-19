import React from 'react';
import PageHeader from '../Components/PageHeader';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
        breadcrumbs={[{ label: '404' }]}
      >
        <div className="bg-red-50 rounded-xl p-6 border border-red-200 max-w-2xl mx-auto mt-8">
          <div className="flex items-center justify-center space-x-3 text-red-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0V9h2a1 1 0 100-2h-2z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-lg">We couldn't find that page</span>
          </div>
        </div>
      </PageHeader>

      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">404</h2>
          <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">Go to Homepage</a>
            <a href="/contact" className="px-6 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-100 transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
