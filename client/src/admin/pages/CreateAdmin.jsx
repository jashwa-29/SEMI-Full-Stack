import React, { useState } from 'react';
import authService from '../services/auth.service';
import { UserPlus, CheckCircle2, AlertCircle, User, Mail, Lock, ShieldAlert } from 'lucide-react';

const CreateAdmin = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isSuperAdmin = currentUser.role === 'superadmin';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authService.createAdmin(form);

      if (response.success) {
        setSuccess(`Admin "${form.name || form.email}" created successfully!`);
        setForm({ name: '', email: '', password: '' });
      }
    } catch (err) {
      setError(err.message || 'Failed to create admin.');
    } finally {
      setLoading(false);
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <ShieldAlert className="h-10 w-10 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500 max-w-sm text-sm">
          Only Super Admins can create new administrators. Please contact your system administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Add a new administrator to the system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-sm shadow-primary-300">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">New Administrator</h2>
              <p className="text-xs text-gray-500">Fill in the details below</p>
            </div>
          </div>

          {success && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm mb-6 border border-green-100">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              {success}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 border border-red-100">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@example.com"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 shadow-md shadow-primary-200 hover:shadow-primary-300 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {loading ? 'Creating Admin...' : 'Create Admin Account'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-primary-800 mb-3 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              Admin Permissions
            </h3>
            <ul className="space-y-2 text-sm text-primary-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                Can manage membership requests
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                Can view newsletter subscribers
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                Can handle live chat support
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                Cannot create or delete other admins
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">Security Note</h3>
            <p className="text-sm text-amber-700">
              Share credentials securely. Admins should change their password on first login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
