import React from 'react';

export const PageSection = ({ children, className = "", background = "white", id = "" }) => {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-600",
    dark: "bg-gray-900",
    "blue-dark": "bg-blue-600",
  };

  const selectedBg = bgClasses[background] || bgClasses.white;

  return (
    <div id={id} className={`py-16 ${selectedBg} ${className}`}>
      <div className={`max-w-8xl mx-auto px-6 sm:px-8 lg:px-28`}>
        {children}
      </div>
    </div>
  );
};

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
};

export default PageLayout;

