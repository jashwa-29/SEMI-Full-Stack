import React, { useState, useEffect } from 'react';
import { Mail, Save, FileText, CheckCircle2, AlertCircle, RefreshCw, PenLine } from 'lucide-react';
import templateService from '../services/template.service';

export default function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await templateService.getTemplates();
      setTemplates(res.data);
    } catch (err) {
      setError('Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  const currentTemplate = templates[activeTab];

  const handleUpdate = async () => {
    if (!currentTemplate) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await templateService.updateTemplate(currentTemplate._id, currentTemplate);
      setTemplates(prev => prev.map(t => t._id === currentTemplate._id ? res.data : t));
      setSuccess('Template saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save template');
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
    const content = currentTemplate.content || '';
    handleChange('content', content + ' ' + tag + ' ');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary-600 animate-spin" />
        </div>
        <p className="text-sm font-medium text-gray-400">Loading templates…</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary-600" />
            Email Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">Customize the approval emails sent to candidates.</p>
        </div>
        <button onClick={fetchTemplates} className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl mb-6">
        {templates.map((t, i) => (
          <button
            key={t._id}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === i 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {t.name || `Template ${i + 1}`}
          </button>
        ))}
      </div>

      {/* Editor Card */}
      {currentTemplate && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="space-y-6">
            {/* Name & Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Template Label</label>
                <div className="relative">
                  <PenLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                  <input 
                    type="text" 
                    value={currentTemplate.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-primary-400 transition-all font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Subject</label>
                <input 
                  type="text" 
                  value={currentTemplate.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-primary-400 transition-all"
                />
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pl-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Body</label>
                <div className="flex gap-2">
                  {['{{name}}', '{{paymentLink}}'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => insertTag(tag)}
                      className="text-[9px] font-mono bg-primary-50 text-primary-600 px-2 py-0.5 rounded border border-primary-100 hover:bg-primary-100 transition-colors"
                    >
                      +{tag}
                    </button>
                  ))}
                </div>
              </div>
              <textarea 
                value={currentTemplate.content}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={12}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-primary-400 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Feedback & Actions */}
            <div className="flex items-center justify-between pt-4 gap-4">
              <div className="flex-1">
                {error && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {error}</p>}
                {success && <p className="text-xs text-emerald-500 font-medium flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {success}</p>}
              </div>
              <button 
                onClick={handleUpdate}
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary-200 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Guide */}
      <div className="mt-12 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <PenLine className="h-6 w-6 text-primary-400" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-lg">Quick Tip: Placeholders</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Use <span className="text-primary-400 font-mono">{"{{name}}"}</span> to mention the candidate and <span className="text-primary-400 font-mono">{"{{paymentLink}}"}</span> to include the payment button. The system will handle the rest!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
