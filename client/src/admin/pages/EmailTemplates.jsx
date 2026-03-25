import React, { useState, useEffect, useMemo } from 'react';
import { 
  Mail, Save, FileText, CheckCircle2, AlertCircle, 
  RefreshCw, PenLine, User, Globe, Layout, Monitor
} from 'lucide-react';
import templateService from '../services/template.service';

export default function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const currentTemplate = useMemo(() => {
    const t = templates[activeTab];
    if (!t) return { name: '', subject: '', content: '', paymentLink: '' };
    return t;
  }, [templates, activeTab]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await templateService.getTemplates();
      // Ensure we only store serializable data
      const data = Array.isArray(res.data) ? res.data : [];
      setTemplates(data);
    } catch (err) {
      setError('Failed to fetch templates. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!currentTemplate || !currentTemplate._id) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await templateService.updateTemplate(currentTemplate._id, currentTemplate);
      // Ensure we merge the update correctly
      setTemplates(prev => prev.map(t => t._id === currentTemplate._id ? { ...t, ...res.data } : t));
      setSuccess('Template saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save template. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setTemplates(prev => prev.map((t, idx) => 
      idx === activeTab ? { ...t, [field]: value } : t
    ));
  };

  const insertTag = (tag) => {
    const editor = document.getElementById('template-body-editor');
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = String(currentTemplate.content || '');
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    handleChange('content', before + tag + after);
    
    setTimeout(() => {
      editor.focus();
      const newCursorPos = start + tag.length;
      editor.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary-600 animate-spin" />
        </div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
            <p className="text-sm text-gray-500">Configure approval emails and payment links.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button 
            onClick={fetchTemplates}
            title="Reload Templates"
            className="p-2.5 text-gray-400 hover:text-primary-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 shadow-sm md:shadow-none"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button 
            onClick={handleUpdate}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-200 transition-all disabled:opacity-50"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl overflow-x-auto no-scrollbar">
        {templates.map((t, i) => (
          <button
            key={t._id}
            onClick={() => { setActiveTab(i); setError(''); setSuccess(''); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === i 
                ? 'bg-white text-primary-600 shadow-sm shadow-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className={`h-4 w-4 ${activeTab === i ? 'text-primary-500' : 'text-gray-300'}`} />
            {String(t.name || `Template ${i + 1}`)}
          </button>
        ))}
      </div>

      {/* Editor Body */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
        {/* Alerts Overlay */}
        {(error || success) && (
          <div className={`px-6 py-4 flex items-center gap-3 border-b ${error ? 'bg-red-50 border-red-100 text-red-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
            {error ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            <span className="text-xs font-bold uppercase tracking-wider">{String(error || success)}</span>
          </div>
        )}

        <div className="p-6 md:p-10 space-y-8">
          {/* Top Section: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Template Label</label>
              <div className="relative group">
                <PenLine className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none group-focus-within:text-primary-500 transition-colors" />
                <input 
                  type="text" 
                  value={String(currentTemplate.name || '')}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Member Approval"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-semibold focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100/30 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Subject Line</label>
              <div className="relative group">
                <Monitor className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none group-focus-within:text-primary-500 transition-colors" />
                <input 
                  type="text" 
                  value={String(currentTemplate.subject || '')}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="e.g. Your Application is Approved!"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100/30 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Default Payment Link</label>
            <div className="relative group">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="text" 
                value={String(currentTemplate.paymentLink || '')}
                onChange={(e) => handleChange('paymentLink', e.target.value)}
                placeholder="https://payment.example.com/..."
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100/30 outline-none transition-all font-mono text-primary-600"
              />
            </div>
          </div>

          <hr className="border-gray-50" />

          {/* Editor Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-900 border-l-4 border-primary-600 pl-3">
                <Layout className="h-4 w-4" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Email Content</h3>
              </div>
              <div className="flex items-center gap-2 p-1.5 bg-gray-50 rounded-xl border border-gray-100">
                <button 
                  onClick={() => insertTag('{{name}}')}
                  className="px-3 py-1.5 text-[10px] font-bold bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-sm transition-all flex items-center gap-2"
                >
                  <User className="h-3.5 w-3.5" /> + Name
                </button>
                <button 
                  onClick={() => insertTag('{{paymentLink}}')}
                  className="px-3 py-1.5 text-[10px] font-bold bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-sm transition-all flex items-center gap-2"
                >
                  <Globe className="h-3.5 w-3.5" /> + Payment Button
                </button>
              </div>
            </div>

            <div className="bg-gray-50/30 rounded-3xl p-1 border border-gray-100 focus-within:ring-4 focus-within:ring-primary-100/50 transition-all">
              <textarea 
                id="template-body-editor"
                value={String(currentTemplate.content || '')}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={12}
                placeholder="Compose your approval email here..."
                className="w-full bg-transparent p-6 text-sm text-gray-700 leading-relaxed outline-none resize-none"
              />
              <div className="px-6 py-3 bg-white border-t border-gray-100 rounded-b-3xl">
                <p className="text-[10px] text-gray-400 italic">Formatting tip: You can use HTML tags like &lt;b&gt; or &lt;br&gt; for simple styling.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Card */}
      <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary-500/20 transition-all duration-700" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Layout className="h-5 w-5 text-primary-400" />
             </div>
             <h3 className="font-bold text-lg">Knowledge Base: Placeholders</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <p className="text-primary-300 font-mono text-xs uppercase tracking-widest font-bold">Candidate Name</p>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Use <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono break-all">{"{{name}}"}</code> to automatically address the specific individual applying for membership.
               </p>
            </div>
            <div className="space-y-2">
               <p className="text-primary-300 font-mono text-xs uppercase tracking-widest font-bold">Direct Payment</p>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Use <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono break-all">{"{{paymentLink}}"}</code> to insert the professional payment button linked to your redirect URL.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
