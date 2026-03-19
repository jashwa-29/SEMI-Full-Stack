import React from 'react';
import PageHeader from '../Components/PageHeader';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Terms of Service" 
        description="Please read these terms carefully before using our services."
        breadcrumbs={[{ label: "Terms of Service" }]}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none">
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h3>
          <p className="mb-6 text-gray-700">
            By accessing and using the website of the Society for Emergency Medicine India (SEMI), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">2. Membership Services</h3>
          <p className="mb-6 text-gray-700">
            SEMI provides various membership services including but not limited to educational resources, event registration, and professional networking. We reserve the right to modify, suspend, or discontinue any service at any time without notice. Membership fees are non-refundable unless otherwise stated.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">3. User Conduct</h3>
          <p className="mb-6 text-gray-700">
            You agree to use the website and its associated services only for lawful purposes. You are prohibited from posting or transmitting to or from this site any unlawful, threatening, libelous, defamatory, obscene, pornographic, or other material that would violate any law.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">4. Intellectual Property</h3>
          <p className="mb-6 text-gray-700">
            The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h3>
          <p className="mb-6 text-gray-700">
            In no event will SEMI be liable for any incidental, consequential, or indirect damages (including, but not limited to, damages for loss of profits, business interruption, loss of programs or information, and the like) arising out of the use of or inability to use the service, or any information, or transactions provided on the service, or downloaded from the service, or any delay of such information or service.
          </p>

          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">Questions?</h4>
            <p className="text-blue-800 text-sm">
              If you have any questions about these Terms, please contact us at <a href="mailto:headoffice@semi.org.in" className="underline hover:text-blue-600">headoffice@semi.org.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
