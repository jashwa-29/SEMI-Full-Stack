import React, { useState, useEffect } from 'react';
import PageHeader from '../Components/PageHeader';
import apiClient from '../api/apiClient';

// Shake animation CSS
const shakeStyle = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
  }
  .animate-shake {
    animation: shake 0.4s ease-in-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  .animate-scale-in {
    animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;

const MembershipJoin = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    fullName: '',
    designation: '',
    officeAddress: '',
    homeAddress: '',
    state: '',
    officePhone: '',
    mobilePhone: '',
    email: '',
    qualificationType: 'MBBS', // 'MBBS' or 'Other'
    mbbsCollege: '',
    mbbsYear: '',
    otherDegree: '',
    pgDetails: '',
    mciFile: null,
    pgFile: null,
    otherDocs: null,
    photograph: null,
    attestation: false
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");

  // Inject shake animation style
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = shakeStyle;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const validateField = (name, value) => {
    let error = "";
    
    // Required fields check
    const requiredFields = [
      'fullName', 'designation', 'homeAddress', 'state', 
      'mobilePhone', 'email', 'photograph', 'mciFile', 'pgFile', 'attestation'
    ];

    if (requiredFields.includes(name) && !value) {
      // Provide a more specific message for attestation
      if (name === 'attestation') {
        error = "You must agree to the terms to proceed";
      } else {
        error = "This field is required";
      }
    }

    // Specific field validations
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Invalid email format";
    }

    if (name === 'mobilePhone' && value) {
      const phoneRegex = /^[0-9\s+]{10,15}$/;
      if (!phoneRegex.test(value)) error = "Invalid phone number";
    }

    if (formData.qualificationType === 'MBBS' && name === 'mbbsCollege' && !value) {
      error = "MBBS College is required";
    }

    if (formData.qualificationType === 'MBBS' && name === 'mbbsYear' && !value) {
      error = "Year is required";
    }

    if (formData.qualificationType === 'Other' && name === 'otherDegree' && !value) {
      error = "Degree details are required";
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    // Special checks for conditional fields
    if (formData.qualificationType === 'MBBS' && !formData.mbbsCollege) {
      newErrors.mbbsCollege = "MBBS College is required";
    }
    if (formData.qualificationType === 'MBBS' && !formData.mbbsYear) {
      newErrors.mbbsYear = "Year is required";
    }
    if (formData.qualificationType === 'Other' && !formData.otherDegree) {
      newErrors.otherDegree = "Degree details are required";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const filesArr = Array.from(files);
      if (name === 'otherDocs') {
        // Handle multiple files - ensure each file is under MAX_FILE_SIZE
        const invalidFiles = filesArr.filter(f => f.size > MAX_FILE_SIZE);
        if (invalidFiles.length > 0) {
          setErrors(prev => ({ ...prev, otherDocs: 'Each file must be under 5 MB' }));
          return;
        }
        setFormData(prev => ({ ...prev, [name]: filesArr }));
        setErrors(prev => ({ ...prev, [name]: "" }));
      } else {
        // Handle single file
        const file = filesArr[0];
        if (file && file.size > MAX_FILE_SIZE) {
          setErrors(prev => ({ ...prev, [name]: 'File must be under 5 MB' }));
          return;
        }
        setFormData(prev => ({ ...prev, [name]: file }));
        
        if (name === 'photograph' && file) {
          setPhotoPreview(URL.createObjectURL(file));
        }
        
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const currentErrors = validateForm();
    const hasErrors = Object.keys(currentErrors).length > 0;

    if (!hasErrors) {
      setIsSubmitting(true);
      
      try {
        // Validate file sizes before submitting
        const invalidFiles = [];
        ['photograph', 'mciFile', 'pgFile'].forEach((f) => {
          if (formData[f] && formData[f].size > MAX_FILE_SIZE) invalidFiles.push(f);
        });
        if (formData.otherDocs && formData.otherDocs.length > 0) {
          formData.otherDocs.forEach((file) => {
            if (file.size > MAX_FILE_SIZE) invalidFiles.push('otherDocs');
          });
        }
        if (invalidFiles.length > 0) {
          setErrors(prev => {
            const e = { ...prev };
            invalidFiles.forEach((k) => { e[k] = 'File must be under 5 MB'; });
            return e;
          });
          setIsSubmitting(false);
          return;
        }

        const data = new FormData();
        
        // Append all text fields
        Object.keys(formData).forEach(key => {
          if (!(formData[key] instanceof File) && formData[key] !== null) {
            data.append(key, formData[key]);
          }
        });

        // Append files
        if (formData.photograph) data.append('photograph', formData.photograph);
        if (formData.mciFile) data.append('mciFile', formData.mciFile);
        if (formData.pgFile) data.append('pgFile', formData.pgFile);
        
        // Append multiple other docs
        if (formData.otherDocs && formData.otherDocs.length > 0) {
            formData.otherDocs.forEach(file => {
                data.append('otherDocs', file);
            });
        }

        await apiClient.post('/membership', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        setShowSuccessModal(true);
      } catch (error) {
        console.error("Submission Error:", error);
        
        // Handle field-specific errors from backend (e.g., duplicate email)
        if (error.response?.data?.field) {
            const fieldName = error.response.data.field;
            const errorMessage = error.parsedMessage || error.response.data.message;
            
            setErrors(prev => ({ ...prev, [fieldName]: errorMessage }));
            
            // Scroll to the error field
            const element = document.getElementsByName(fieldName)[0];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (element.type !== 'file') element.focus();
            }
        } else {
            // General error: show error modal with message
            const msg = error.parsedMessage || error.response?.data?.message || error.message || 'Submission failed. Please try again later.';
            console.error('Submission failed:', msg);
            setErrorModalMessage(msg);
            setShowErrorModal(true);
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Find the first error in the order of the form
      const fieldOrder = [
        'date', 'photograph', 'fullName', 'designation', 'officeAddress', 
        'homeAddress', 'state', 'officePhone', 'mobilePhone', 'email',
        'qualificationType', 'mbbsCollege', 'otherDegree', 'pgDetails',
        'mciFile', 'pgFile', 'otherDocs', 'attestation'
      ];

      const firstError = fieldOrder.find(field => currentErrors[field]);
      
      if (firstError) {
        const element = document.getElementsByName(firstError)[0];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Focus the element if it's not a file input
          if (element.type !== 'file') {
            element.focus();
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Become a Member"
        description="Join the community that is redefining emergency care in India. Fill out the form below to start your application."
        breadcrumbs={[
          { label: "Membership", path: "/membership/benefits" },
          { label: "Join SEMI" }
        ]}
      />

      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
              {/* Top Section: Date & Photo - Compact */}
              <div className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8">
                <div className="w-full md:w-48">
                   <label className={`block text-xs font-bold mb-2 uppercase tracking-wider text-gray-500`}>
                     Photograph *
                   </label>
                   <div className={`relative group ${errors.photograph ? 'animate-shake' : ''}`}>
                     <div className={`w-32 h-32 mx-auto md:mx-0 border-2 border-dashed rounded-xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden transition-all relative ${errors.photograph ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-600'}`}>
                        {photoPreview ? (
                          <div className="w-full h-full relative">
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="px-2 py-1 bg-white rounded text-blue-600 text-[10px] font-bold shadow-sm">Change</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-2">
                            <svg className={`w-6 h-6 mx-auto mb-1 ${errors.photograph ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
                            </svg>
                            <p className="text-[9px] text-gray-500">Upload Photo</p>
                          </div>
                        )}
                        <input 
                          type="file" 
                          name="photograph"
                          accept="image/*"
                          onChange={handleChange}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                     </div>
                     <p className="text-xs text-gray-500 mt-1">Max file size: 5 MB</p>
                     {errors.photograph && <p className="text-red-500 text-[10px] font-bold mt-1 text-center md:text-left uppercase">{errors.photograph}</p>}
                   </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                        <label className={`block text-xs font-bold mb-1 uppercase tracking-wider ${errors.date ? 'text-red-500' : 'text-gray-500'}`}>Date</label>
                        <input 
                          type="date" 
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 rounded-lg border text-sm transition-all outline-none ${errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                        />
                     </div>
                     <div className="md:col-span-2">
                      <label className={`block text-xs font-bold mb-1 uppercase tracking-wider ${errors.fullName ? 'text-red-500' : 'text-gray-500'}`}>Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        placeholder="Dr. Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all outline-none ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                      />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                      <label className={`block text-xs font-bold mb-1 uppercase tracking-wider ${errors.designation ? 'text-red-500' : 'text-gray-500'}`}>Designation *</label>
                      <input 
                        type="text" 
                        name="designation"
                        placeholder="e.g. Consultant"
                        value={formData.designation}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all outline-none ${errors.designation ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                      />
                     </div>
                     <div>
                      <label className={`block text-xs font-bold mb-1 uppercase tracking-wider ${errors.email ? 'text-red-500' : 'text-gray-500'}`}>Email ID *</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all outline-none ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                      />
                     </div>
                  </div>
                </div>
              </div>

              {/* Personal Details Grid */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className={`block text-xs font-bold mb-1 uppercase tracking-wider ${errors.mobilePhone ? 'text-red-500' : 'text-gray-500'}`}>Mobile *</label>
                    <input 
                      type="tel" 
                      name="mobilePhone"
                      placeholder="+91 99999 99999"
                      value={formData.mobilePhone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-all outline-none ${errors.mobilePhone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold mb-1 uppercase tracking-wider text-gray-500">Office Phone</label>
                    <input 
                      type="tel" 
                      name="officePhone"
                      placeholder="Landline / Ext"
                      value={formData.officePhone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                   <div className="md:col-span-1">
                    <label className={`block text-xs font-bold mb-1 uppercase tracking-wider ${errors.state ? 'text-red-500' : 'text-gray-500'}`}>State *</label>
                    <input 
                      type="text" 
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-all outline-none ${errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                    />
                  </div>
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1 uppercase tracking-wider ${errors.homeAddress ? 'text-red-500' : 'text-gray-500'}`}>Home Address *</label>
                      <textarea 
                        name="homeAddress"
                        rows="2"
                        placeholder="Residential Address"
                        value={formData.homeAddress}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all outline-none resize-none ${errors.homeAddress ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 uppercase tracking-wider text-gray-500">Office Address</label>
                      <textarea 
                        name="officeAddress"
                        rows="2"
                        placeholder="Hospital / Clinic Address"
                        value={formData.officeAddress}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-blue-500 outline-none resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                 <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 border-l-4 border-blue-600 pl-2">Education</h3>
                    
                    {/* Qualification Type */}
                    <div className="flex gap-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="qualificationType"
                            value="MBBS"
                            checked={formData.qualificationType === 'MBBS'}
                            onChange={handleChange}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">MBBS</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="qualificationType"
                            value="Other"
                            checked={formData.qualificationType === 'Other'}
                            onChange={handleChange}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Other</span>
                        </label>
                    </div>

                    {formData.qualificationType === 'MBBS' ? (
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                           <input 
                              type="text"
                              name="mbbsCollege"
                              placeholder="MBBS College *"
                              value={formData.mbbsCollege}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${errors.mbbsCollege ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                            />
                        </div>
                        <div className="col-span-1">
                           <input 
                              type="number"
                              name="mbbsYear"
                              placeholder="Year *"
                              value={formData.mbbsYear}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${errors.mbbsYear ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                            />
                        </div>
                      </div>
                    ) : (
                      <textarea 
                        name="otherDegree"
                        rows="2"
                        placeholder="Degree Details *"
                        value={formData.otherDegree}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${errors.otherDegree ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`}
                      ></textarea>
                    )}

                    <textarea 
                        name="pgDetails"
                        rows="2"
                        placeholder="Postgraduation Details (Optional)"
                        value={formData.pgDetails}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-blue-500 outline-none"
                    ></textarea>
                 </div>

                 {/* Document Uploads */}
                 <div className="bg-blue-50/30 rounded-2xl p-6 md:p-8 border border-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-bl-full pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Required Documents</h3>
                          <p className="text-xs text-blue-600 font-semibold tracking-wide uppercase">All files must be under 5 MB</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {/* MCI Reg */}
                        <div className={`group relative transition-all duration-300 ${errors.mciFile ? 'animate-shake' : ''}`}>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Registration Certificate *</label>
                          <div className={`relative flex items-center justify-between px-4 py-3 bg-white border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            formData.mciFile 
                              ? 'border-green-500 bg-green-50/30' 
                              : errors.mciFile 
                              ? 'border-red-400 bg-red-50' 
                              : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                          }`}>
                            <div className="flex items-center gap-3 truncate">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.mciFile ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-500'}`}>
                                {formData.mciFile ? (
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                ) : (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                )}
                              </div>
                              <span className={`text-sm truncate ${formData.mciFile ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium'}`}>
                                {formData.mciFile ? formData.mciFile.name : "Upload MCI / SMC Registration *"}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">Browse</span>
                            <input type="file" name="mciFile" onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                          </div>
                          {errors.mciFile && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {errors.mciFile}
                          </p>}
                        </div>
                        
                        {/* PG Cert */}
                        <div className={`group relative transition-all duration-300 ${errors.pgFile ? 'animate-shake' : ''}`}>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">PG Certificate *</label>
                          <div className={`relative flex items-center justify-between px-4 py-3 bg-white border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            formData.pgFile 
                              ? 'border-green-500 bg-green-50/30' 
                              : errors.pgFile 
                              ? 'border-red-400 bg-red-50' 
                              : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                          }`}>
                            <div className="flex items-center gap-3 truncate">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.pgFile ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-500'}`}>
                                {formData.pgFile ? (
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                ) : (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" clipRule="evenodd" /></svg>
                                )}
                              </div>
                              <span className={`text-sm truncate ${formData.pgFile ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium'}`}>
                                {formData.pgFile ? formData.pgFile.name : "Upload PG Degree Certificate *"}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">Browse</span>
                            <input type="file" name="pgFile" onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                          </div>
                          {errors.pgFile && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {errors.pgFile}
                          </p>}
                        </div>

                        {/* Other Docs */}
                        <div className="group relative">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Additional Documents (Optional)</label>
                          <div className={`relative flex items-center justify-between px-4 py-3 bg-white border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                            formData.otherDocs && formData.otherDocs.length > 0 
                              ? 'border-blue-400 bg-blue-50/30 shadow-inner' 
                              : 'border-gray-200 hover:border-blue-300'
                          }`}>
                            <div className="flex items-center gap-3 truncate">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.otherDocs && formData.otherDocs.length > 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-50 text-gray-400'}`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                              </div>
                              <span className={`text-sm truncate ${formData.otherDocs && formData.otherDocs.length > 0 ? 'text-blue-700 font-bold' : 'text-gray-500 font-medium'}`}>
                                {formData.otherDocs && formData.otherDocs.length > 0 ? `${formData.otherDocs.length} Files Selected` : "Upload other relevant certificates"}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg group-hover:bg-gray-200 transition-colors">Select Files</span>
                            <input type="file" name="otherDocs" multiple onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                          </div>
                          {errors.otherDocs && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.otherDocs}</p>}
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Attestation & Submit Section */}
              <div className="pt-8 border-t border-gray-100">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm mb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">Essential Guidelines</h4>
                      <p className="text-xs font-semibold text-gray-800">Dear Applicant,</p>
                      <ul className="space-y-2 text-xs text-gray-700">
                        {[
                          "The decision regarding approval of membership and the type of membership rests solely with the SEMI Board.",
                          "Upon successful verification of the application, the membership fee details and payment link will be shared directly to the registered email ID.",
                          "All membership applications are accepted only through the online process and are handled exclusively by the SEMI Head Office.",
                          "Kindly confirm your current postal address for dispatch of the physical membership ID card. Please note that there is no provision for issuing duplicate or replacement cards, and members are strongly advised to keep the card safe.",
                          "For Full Members with voting rights, possession of the physical membership ID card is mandatory and must be produced at the time of voting."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="font-bold text-blue-600">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>                           
                    <div className="space-y-4 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">Declaration</h4>
                        <div className="bg-white rounded-lg p-4 border border-blue-200 text-xs text-gray-600 italic">
                          "I hereby declare that the information provided is true to the best of my knowledge. I agree to abide by the constitution and bylaws of the Society for Emergency Medicine India."
                        </div>
                      </div>
                      
                      <label className={`flex items-center space-x-3 cursor-pointer p-2 rounded transition-colors ${errors.attestation ? 'bg-red-50 ring-1 ring-red-200' : 'hover:bg-white'}`}>
                        <input 
                          type="checkbox" 
                          name="attestation"
                          checked={formData.attestation}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-gray-900">
                          I confirm and agree to these terms
                        </span>
                      </label>
                      {errors.attestation && <p className="text-red-500 text-[11px] mt-1">{errors.attestation}</p>}
                    </div>
                  </div>
                </div>

                 <div className="flex flex-col items-center justify-center space-y-3">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full max-w-sm px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 text-white'}`}
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Application'}
                  </button>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Securely processed by SEMI Infrastructure
                  </p>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-fade-in" onClick={() => window.location.reload()}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 animate-scale-in">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Aboard!</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your membership application has been submitted successfully. Our team will review your details and get back to you soon.
              </p>
              
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                Return to Homepage
              </button>
            </div>
            

          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowErrorModal(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 animate-scale-in">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Submission Failed</h3>
              <p className="text-gray-600 mb-6">{errorModalMessage}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setShowErrorModal(false)} className="px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50">Close</button>
                <button onClick={() => setShowErrorModal(false)} className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Try Again</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipJoin;
