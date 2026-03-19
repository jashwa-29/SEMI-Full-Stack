import React from 'react';
import PageHeader from '../Components/PageHeader';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Privacy Policy" 
        description="We are committed to protecting your privacy and personal data."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none">
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">1. Information We Collect</h3>
          <p className="mb-6 text-gray-700">
            We collect information you provide directly to us when you apply for membership, register for an event, subscribe to our newsletter, or communicate with us. This information may include your name, email address, phone number, postal address, professional credentials, and payment information.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">2. Use of Information</h3>
          <p className="mb-6 text-gray-700">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
            <li>Process your membership application and renewals.</li>
            <li>Provide, maintain, and improve our services.</li>
            <li>Send you technical notices, updates, security alerts, and administrative messages.</li>
            <li>Respond to your comments, questions, and requests.</li>
            <li>Communicate with you about news and events related to Emergency Medicine.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-4">3. Data Sharing</h3>
          <p className="mb-6 text-gray-700">
            We do not share your personal information with third parties except as compelled by law or to protect our rights. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">4. Data Security</h3>
          <p className="mb-6 text-gray-700">
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">5. Your Rights</h3>
          <p className="mb-6 text-gray-700">
            You have the right to request access to the personal information we hold about you, to request that we correct any inaccuracies, and to request that we delete your personal information, subject to certain exceptions required by law.
          </p>

          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">Contact Us</h4>
            <p className="text-blue-800 text-sm">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:headoffice@semi.org.in" className="underline hover:text-blue-600">headoffice@semi.org.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
