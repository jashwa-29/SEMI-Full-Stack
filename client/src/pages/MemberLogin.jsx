import React, { useState } from 'react';
import PageHeader from '../Components/PageHeader';
import { Link } from 'react-router-dom';

const MemberLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Add logic to authenticate user
    alert("Login functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Member Login"
        description="Welcome back. Access your dashboard, exclusive resources, and community forums."
        breadcrumbs={[
          { label: "Membership", path: "/membership/benefits" },
          { label: "Login" }
        ]}
      />

      <div className="py-16 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 px-8 py-6 text-center">
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
              <p className="text-blue-100 mt-2 text-sm">Enter your credentials to access your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address or Membership ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition-colors"
                    placeholder="Enter your email or ID"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    id="remember-me"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-700">Remember me</label>
                </div>
                <a href="#" className="text-blue-600 hover:text-blue-600 font-medium hover:underline">
                  Forgot password?
                </a>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Not a member yet?{' '}
                <Link to="/membership/join" className="text-blue-600 hover:text-blue-600 font-bold hover:underline">
                  Join SEMI
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Having trouble logging in? <Link to="/contact" className="text-blue-600 hover:underline">Contact Support</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberLogin;



