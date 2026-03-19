import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, description, breadcrumbs, children }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-blue-600 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white opacity-20 blur-3xl"></div>
        </div>

        <div className="relative max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {title}
            </h1>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto mb-8 rounded-full shadow-lg"></div>
            {description && (
              <p className="text-xl text-blue-100 leading-relaxed mb-8 font-light">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white shadow-sm relative z-10">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 flex-wrap font-medium">
            <span className="text-gray-400">You are here:</span>
            <Link to="/" className="hover:text-blue-600 transition-colors hover:underline">Home</Link>
            {breadcrumbs && breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <span className="text-gray-300">›</span>
                {crumb.link ? (
                  <Link to={crumb.link} className="hover:text-blue-600 transition-colors hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-blue-600 font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
