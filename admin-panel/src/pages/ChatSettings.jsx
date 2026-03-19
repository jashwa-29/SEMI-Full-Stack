import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Plus, 
  Trash2, 
  MessageCircle, 
  User, 
  Bot, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ChevronRight,
  Database,
  Shield,
  Zap,
  Layout,
  Search,
  Filter,
  Maximize2,
  Minimize2
} from 'lucide-react';
import Toast from '../components/Toast';
import Modal from '../components/Modal';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const ChatSettings = () => {
  const [visitorFaqs, setVisitorFaqs] = useState([]);
  const [adminCommands, setAdminCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedPaths, setCollapsedPaths] = useState({});
  const [activeTab, setActiveTab] = useState('visitor'); // 'visitor' or 'admin'
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPresetModal, setShowPresetModal] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const [faqsRes, commandsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/chat-settings/visitor_faqs`),
        fetch(`${API_BASE_URL}/api/chat-settings/admin_commands`)
      ]);
 
      const faqsData = await faqsRes.json();
      const commandsData = await commandsRes.json();
 
      if (faqsData.success) setVisitorFaqs(faqsData.data);
      if (commandsData.success) setAdminCommands(commandsData.data || []);
    } catch (err) {
      console.error("Failed to fetch settings:", err);
      showToast("Failed to load settings.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const saveSettings = async () => {
    setSaving(true);
    const token = localStorage.getItem('token');

    try {
      const results = await Promise.all([
        fetch(`${API_BASE_URL}/api/chat-settings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ key: 'visitor_faqs', value: visitorFaqs })
        }),
        fetch(`${API_BASE_URL}/api/chat-settings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ key: 'admin_commands', value: adminCommands })
        })
      ]);

      const data1 = await results[0].json();
      const data2 = await results[1].json();

      if (data1.success && data2.success) {
        showToast("All settings saved successfully!", "success");
        setHasUnsavedChanges(false);
      } else {
        showToast("One or more settings failed to save.", "error");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      showToast("Connection error.", "error");
    } finally {
      setSaving(false);
    }
  };

  const addItem = (type) => {
    if (type === 'faq') {
      setVisitorFaqs([{ label: '', value: '', category: '', answer: '', followUps: [] }, ...visitorFaqs]);
      showToast("New Topic added to top.", "success");
      setHasUnsavedChanges(true);
    } else if (type === 'command') {
      setAdminCommands([{ label: '', value: '' }, ...adminCommands]);
      setHasUnsavedChanges(true);
    }
  };

  const removeItem = (type, index) => {
    if (type === 'faq') {
      const newList = [...visitorFaqs];
      newList.splice(index, 1);
      setVisitorFaqs(newList);
      setHasUnsavedChanges(true);
    } else if (type === 'command') {
      const newList = [...adminCommands];
      newList.splice(index, 1);
      setAdminCommands(newList);
      setHasUnsavedChanges(true);
    }
  };

  const updateDeepFaq = (list, path, field, val) => {
    const updateRecursive = (items, currentPath, depth = 0) => {
      return items.map((item, idx) => {
        if (idx === currentPath[depth]) {
          if (depth === currentPath.length - 1) {
            return { ...item, [field]: val };
          }
          return {
            ...item,
            followUps: updateRecursive(item.followUps || [], currentPath, depth + 1)
          };
        }
        return item;
      });
    };
    return updateRecursive(list, path);
  };

  const addDeepFollowUp = (list, path) => {
    const addRecursive = (items, currentPath, depth = 0) => {
      return items.map((item, idx) => {
        if (idx === currentPath[depth]) {
          if (depth === currentPath.length - 1) {
            return {
              ...item,
              followUps: [...(item.followUps || []), { label: '', value: '', category: '', answer: '', followUps: [] }]
            };
          }
          return {
            ...item,
            followUps: addRecursive(item.followUps || [], currentPath, depth + 1)
          };
        }
        return item;
      });
    };
    
    // Expand parent on add
    const pathKey = path.join('-');
    setCollapsedPaths(prev => ({ ...prev, [pathKey]: false }));
    
    setHasUnsavedChanges(true);
    return addRecursive(list, path);
  };

  const moveTopic = (index, direction) => {
    const newList = [...visitorFaqs];
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= newList.length) return;
    const temp = newList[index];
    newList[index] = newList[newIdx];
    newList[newIdx] = temp;
    setVisitorFaqs(newList);
    setHasUnsavedChanges(true);
  };

  const removeDeepFaq = (list, path) => {
    const removeRecursive = (items, currentPath, depth = 0) => {
      if (depth === currentPath.length - 1) {
        setHasUnsavedChanges(true);
        return items.filter((_, idx) => idx !== currentPath[depth]);
      }
      return items.map((item, idx) => {
        if (idx === currentPath[depth]) {
          return {
            ...item,
            followUps: removeRecursive(item.followUps || [], currentPath, depth + 1)
          };
        }
        return item;
      });
    };
    return removeRecursive(list, path);
  };

  const updateItem = (type, index, field, val, path = null) => {
    if (type === 'faq') {
      if (path) {
        setVisitorFaqs(updateDeepFaq(visitorFaqs, path, field, val));
      } else {
        const newList = [...visitorFaqs];
        newList[index] = { ...newList[index], [field]: val };
        setVisitorFaqs(newList);
      }
    } else if (type === 'command') {
      const newList = [...adminCommands];
      newList[index] = { ...newList[index], [field]: val };
      setAdminCommands(newList);
    }
    setHasUnsavedChanges(true);
  };

  const toggleCollapse = (pathKey) => {
    setCollapsedPaths(prev => ({
      ...prev,
      [pathKey]: !prev[pathKey]
    }));
  };

  const toggleAll = (collapse) => {
    if (collapse) {
      const allPaths = {};
      const traverse = (items, path = []) => {
        items.forEach((item, idx) => {
          const currentPath = [...path, idx].join('-');
          allPaths[currentPath] = true;
          if (item.followUps) traverse(item.followUps, [...path, idx]);
        });
      };
      traverse(visitorFaqs);
      setCollapsedPaths(allPaths);
    } else {
      setCollapsedPaths({});
    }
  };

  const loadSemiPresets = () => {
    const presets = [
      {
        label: "Join SEMI (Membership)",
        value: "membership joining fee",
        category: "Membership",
        answer: "", 
        followUps: [
          { 
            label: "Life Membership", 
            value: "life member fee", 
            category: "Membership",
            answer: "Life Membership is for doctors with recognized EM degrees. The fee is Rs. 3,000. You'll need to submit scans of your MCI/SMC registration and PG degree certificate.", 
            followUps: [
              { label: "Application Link", value: "join link", category: "Membership", answer: "You can apply online through the 'Become a Member' page. The Board typically reviews applications within 2-4 weeks.", followUps: [] }
            ] 
          },
          { 
            label: "Associate Member", 
            value: "associate fee", 
            category: "Membership",
            answer: "Associate Membership (Rs. 1,500) is open to residents, paramedics, and other EM enthusiasts. It's a great entry point into the SEMI network.", 
            followUps: [] 
          },
          { 
            label: "Benefits", 
            value: "member benefits", 
            category: "Membership",
            answer: "Enjoy voting rights (Life Members), NJEM journal access, and significant discounts on EM India conference registrations.", 
            followUps: [] 
          }
        ]
      },
      {
        label: "Training & Courses",
        value: "nbls ncls training",
        category: "Courses",
        answer: "SEMI set the standards for EM training in India. Which clinical course are you looking for?",
        followUps: [
          { label: "NBLS (Basic Life Support)", value: "nbls info", category: "Courses", answer: "National Basic Life Support (NBLS) provides standardized CPR training based on Indian healthcare conditions.", followUps: [] },
          { label: "NCLS (Cardiac Life Support)", value: "ncls info", category: "Courses", answer: "NCLS covers advanced electrical therapy, rhythm recognition, and pharmacology for cardiac arrests.", followUps: [] },
          { label: "NTLS (Trauma Life Support)", value: "ntls info", category: "Courses", answer: "NTLS focus on the 'Golden Hour' management of trauma patients within a structured clinical framework.", followUps: [] }
        ]
      },
      {
        label: "About SEMI",
        value: "semi info hq",
        category: "General",
        answer: "",
        followUps: [
          { label: "Our History", value: "history", category: "General", answer: "Founded in 1999, SEMI is the oldest and largest professional body for Emergency Physicians in India.", followUps: [] },
          { label: "Headquarters", value: "hq address", category: "General", answer: "Our Head Office is located at Apollo Health City, Jubilee Hills, Hyderabad, 500034.", followUps: [] },
          { label: "EM India Conference", value: "emindia", category: "General", answer: "The EM India (EMCON) annual conference is usually held in November. It's the highlight of the EM academic calendar in India.", followUps: [] }
        ]
      }
    ];

    setVisitorFaqs(presets);
    setShowPresetModal(false);
    showToast("Premium SEMI Presets loaded successfully!", "success");
    setHasUnsavedChanges(true);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative">
          <Loader2 size={48} className="text-primary-600 animate-spin mb-4" />
          <div className="absolute inset-0 bg-primary-100/20 blur-xl rounded-full scale-150 -z-10 animate-pulse"></div>
        </div>
        <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] mt-2">Syncing with Core...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {toast.show && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast({ ...toast, show: false })} />
      )}

      {/* Hero Header */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary-50 to-indigo-50 rounded-[2.5rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-primary-100 shadow-sm">
                System Engine v2.0
              </div>
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Bot <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Intelligence</span> Hub
            </h1>
            <p className="text-slate-500 font-medium text-sm max-w-lg">
              Architect your visitor's journey through automated FAQ branches and lead-capture logic.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* <button 
              onClick={() => setShowPresetModal(true)}
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all border border-emerald-100 shadow-sm"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              Load Presets
            </button> */}
            <button 
              onClick={saveSettings}
              disabled={saving}
              className={`group flex items-center gap-3 px-8 py-3 rounded-2xl font-bold text-xs transition-all duration-300 shadow-xl 
                ${hasUnsavedChanges && !saving 
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-200 animate-pulse' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'
                } 
                disabled:opacity-50`}
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : (hasUnsavedChanges ? <AlertCircle size={16} /> : <Save size={16} className="group-hover:scale-110 transition-transform" />)}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Navigation Sidebar */}
        <div className="lg:w-72 flex-shrink-0 space-y-4">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-4 sticky top-8">
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveTab('visitor')}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${activeTab === 'visitor' ? 'bg-primary-600 text-white shadow-xl shadow-primary-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <Bot size={18} className={activeTab === 'visitor' ? 'text-white' : 'text-primary-500 group-hover:scale-110 transition-transform'} />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-widest">Automation Flow</p>
                    <p className={`text-[10px] font-medium leading-none mt-1 opacity-70`}>{visitorFaqs.length} Active Topics</p>
                  </div>
                </button>
                <button 
                  onClick={() => setActiveTab('admin')}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <Zap size={18} className={activeTab === 'admin' ? 'text-white' : 'text-indigo-500 group-hover:scale-110 transition-transform'} />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-widest">Agent Shortcuts</p>
                    <p className={`text-[10px] font-medium leading-none mt-1 opacity-70`}>{adminCommands.length} Slash Commands</p>
                  </div>
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 px-2 space-y-6">
                 <div>
                    <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-2">System Health</h5>
                    <div className="space-y-3">
                       <div className="flex items-center justify-between px-2">
                          <span className="text-[10px] font-bold text-slate-600">Sync Status</span>
                          <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                       </div>
                       <div className="flex items-center justify-between px-2">
                          <span className="text-[10px] font-bold text-slate-600">Database</span>
                          <span className="text-[9px] font-black text-emerald-600">CONNECTED</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                    <div className="flex gap-3 items-start">
                       <Shield size={16} className="text-slate-400" />
                       <div>
                          <p className="text-[10px] font-black text-slate-900">SECURE CONSOLE</p>
                          <p className="text-[9px] text-slate-500 mt-1 font-medium leading-relaxed">Changes take effect immediately upon saving.</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
           {activeTab === 'visitor' ? (
              <div className="space-y-6 animate-slideIn">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-slate-100/50 sticky top-8 z-20 shadow-xl shadow-slate-100/20">
                   <div className="relative flex-1 group">
                      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                      <input 
                        type="text"
                        placeholder="Search for questions or answers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 outline-none transition-all pl-12 shadow-sm"
                      />
                   </div>
                   <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleAll(Object.keys(collapsedPaths).length === 0)}
                        className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-100 text-slate-600 hover:text-primary-600 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
                      >
                        {Object.keys(collapsedPaths).length === 0 ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                        {Object.keys(collapsedPaths).length === 0 ? 'Compact' : 'Expand'}
                      </button>
                      <button 
                        onClick={() => addItem('faq')}
                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary-600 text-white hover:bg-primary-700 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-200 active:scale-95"
                      >
                        <Plus size={14} strokeWidth={3} /> New Topic
                      </button>
                   </div>
                </div>

                <div className="space-y-4">
                  {/* Category Datalist */}
                  <datalist id="category-list">
                    {['Membership', 'Courses', 'General', 'Technical', 'Support', 'Pricing'].map(c => (
                      <option key={c} value={c} />
                    ))}
                    {Array.from(new Set(function getCats(items) {
                      let cats = [];
                      items.forEach(item => {
                        if (item.category) cats.push(item.category);
                        if (item.followUps) cats.push(...getCats(item.followUps));
                      });
                      return cats;
                    }(visitorFaqs))).map(c => <option key={c} value={c} />)}
                  </datalist>

                  {visitorFaqs.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100 opacity-50">
                       <Bot size={48} className="mx-auto text-slate-200 mb-4" />
                       <p className="text-slate-400 font-bold">No automation nodes found.</p>
                    </div>
                  ) : (
                    visitorFaqs.map((faq, idx) => {
                       const renderFaqItem = (node, nIdx, path = []) => {
                          const currentPath = [...path, nIdx];
                          const pathKey = currentPath.join('-');
                          const isNested = path.length > 0;
                          const isCollapsed = collapsedPaths[pathKey];
                          
                          if (searchQuery && !node.label?.toLowerCase().includes(searchQuery.toLowerCase()) && !node.answer?.toLowerCase().includes(searchQuery.toLowerCase())) {
                            const hasMatchingChild = (item) => item.followUps?.some(child => 
                              child.label?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              child.answer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              hasMatchingChild(child)
                            );
                            if (!hasMatchingChild(node)) return null;
                          }

                          const levelClasses = [
                            'bg-white border-slate-200 shadow-sm',
                            'bg-slate-50/50 border-slate-100 ml-8',
                            'bg-blue-50/20 border-blue-100 ml-16'
                          ];
                          const cardClass = levelClasses[Math.min(path.length, levelClasses.length - 1)];

                          return (
                            <div key={pathKey} className={`group/card rounded-[2rem] border-2 transition-all duration-500 overflow-hidden ${cardClass} ${isNested ? 'mt-4' : 'mb-8 shadow-md'} ${isCollapsed ? 'max-h-24' : 'hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-100/20'}`}>
                               <div className="p-6 flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-5 cursor-pointer flex-1 min-w-0" onClick={() => toggleCollapse(pathKey)}>
                                     <div className={`size-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isCollapsed ? 'bg-slate-100 text-slate-400 rotate-0' : 'bg-primary-600 text-white rotate-90 shadow-lg shadow-primary-200'}`}>
                                        <ChevronRight size={18} />
                                     </div>
                                     <div className="space-y-1 flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                           <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isNested ? 'text-indigo-400' : 'text-primary-400'}`}>
                                              {isNested ? `Response Path` : 'Main Menu Topic'}
                                           </span>
                                           {!isNested && node.category && (
                                              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase tracking-widest rounded border border-emerald-200">
                                                 {node.category}
                                              </span>
                                           )}
                                        </div>
                                        <h3 className="text-sm font-black text-slate-800 truncate leading-tight">
                                           {node.label || <span className="text-slate-300 italic">Empty Topic</span>}
                                        </h3>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                     {!isNested && (
                                        <div className="flex items-center gap-1">
                                           <button 
                                              disabled={idx === 0}
                                              onClick={(e) => { e.stopPropagation(); moveTopic(idx, -1); }}
                                              className="size-8 rounded-lg bg-slate-50 text-slate-400 hover:text-primary-600 disabled:opacity-20 transition-all border border-slate-100"
                                           >
                                              <ChevronRight size={14} className="-rotate-90 mx-auto" strokeWidth={3} />
                                           </button>
                                           <button 
                                              disabled={idx === visitorFaqs.length - 1}
                                              onClick={(e) => { e.stopPropagation(); moveTopic(idx, 1); }}
                                              className="size-8 rounded-lg bg-slate-50 text-slate-400 hover:text-primary-600 disabled:opacity-20 transition-all border border-slate-100"
                                           >
                                              <ChevronRight size={14} className="rotate-90 mx-auto" strokeWidth={3} />
                                           </button>
                                        </div>
                                     )}
                                     <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100/50 rounded-full">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                           {(node.followUps?.length || 0)} Options
                                        </span>
                                     </div>
                                     <button 
                                        onClick={(e) => {
                                           e.stopPropagation();
                                           if (isNested) setVisitorFaqs(removeDeepFaq(visitorFaqs, currentPath));
                                           else removeItem('faq', idx);
                                        }}
                                        className="size-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover/card:opacity-100"
                                     >
                                        <Trash2 size={16} />
                                     </button>
                                  </div>
                               </div>

                               {!isCollapsed && (
                                  <div className="px-6 pb-6 pt-2 animate-fadeIn space-y-6">
                                     <div className={!isNested ? "grid md:grid-cols-2 gap-4" : "block"}>
                                        <div className="space-y-1">
                                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Button text for visitor</label>
                                           <input 
                                              type="text" 
                                              value={node.label || ''}
                                              onChange={(e) => updateItem('faq', idx, 'label', e.target.value, isNested ? currentPath : null)}
                                              placeholder="What user clicks... e.g. Pricing"
                                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 outline-none transition-all"
                                           />
                                        </div>
                                        {!isNested && (
                                           <div className="space-y-1">
                                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-emerald-600">Category for sorting</label>
                                              <input 
                                                 type="text" 
                                                 value={node.category || ''}
                                                 onChange={(e) => updateItem('faq', idx, 'category', e.target.value, isNested ? currentPath : null)}
                                                 placeholder="Filter key... e.g. General"
                                                 list="category-list"
                                                 className="w-full bg-emerald-50/30 border border-emerald-100/50 rounded-xl px-4 py-2.5 text-sm font-bold text-emerald-700 placeholder:text-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all"
                                              />
                                           </div>
                                        )}
                                     </div>

                                     <div className="space-y-1">
                                        <div className="flex items-center justify-between ml-1">
                                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                              <MessageCircle size={10} className="text-primary-500" /> Bot Reply Message
                                           </label>
                                           {!node.answer && (
                                              <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Display Sub-Menu</span>
                                           )}
                                        </div>
                                        <textarea 
                                           value={node.answer || ''}
                                           onChange={(e) => updateItem('faq', idx, 'answer', e.target.value, isNested ? currentPath : null)}
                                           placeholder="Type bot response here... Supporting {name}. Leave empty to show sub-topics instead."
                                           rows="3"
                                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 focus:bg-white focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 outline-none transition-all resize-none shadow-inner"
                                        />
                                     </div>

                                     <div className="pt-6 border-t border-slate-50">
                                        <div className="flex items-center justify-between mb-4">
                                           <div className="flex items-center gap-2">
                                              <Layout size={12} className="text-slate-400" />
                                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Connect follow-up flow</span>
                                           </div>
                                           <button 
                                              onClick={() => setVisitorFaqs(addDeepFollowUp(visitorFaqs, currentPath))}
                                              className="flex items-center gap-2 text-[9px] font-black text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl transition-all uppercase tracking-widest border border-slate-900 shadow-lg shadow-slate-100"
                                           >
                                              <Plus size={10} strokeWidth={3} /> New Sub-Option
                                           </button>
                                        </div>
                                        
                                        {node.followUps && node.followUps.length > 0 ? (
                                           <div className="space-y-2 border-l-2 border-slate-100 relative">
                                              <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-slate-200 to-transparent"></div>
                                              {node.followUps.map((child, cIdx) => renderFaqItem(child, cIdx, currentPath))}
                                           </div>
                                        ) : (
                                           <div className="py-4 px-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex items-center justify-center opacity-40">
                                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">No terminal paths</p>
                                           </div>
                                        )}
                                     </div>
                                  </div>
                               )}
                            </div>
                          );
                       };
                       return renderFaqItem(faq, idx);
                    })
                  )}
                </div>
              </div>
           ) : (
              <div className="space-y-6 animate-slideIn">
                <div className="bg-white/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-slate-100/50 shadow-xl shadow-slate-100/20 flex items-center justify-between">
                   <div>
                      <h2 className="text-xl font-black text-slate-900 leading-tight">Admin Efficiency</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Slash Commands & Rapid Replies</p>
                   </div>
                   <button 
                      onClick={() => addItem('command')}
                      className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-200"
                   >
                      <Zap size={14} fill="currentColor" /> Add Shortcut
                   </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {adminCommands.map((cmd, idx) => (
                    <div key={idx} className="group p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4">
                          <button 
                             onClick={() => removeItem('command', idx)}
                             className="size-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                             <Trash2 size={14} />
                          </button>
                       </div>
                       <div className="space-y-4">
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-1">Trigger Command</label>
                             <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 font-black">/</span>
                                <input 
                                   type="text" 
                                   value={cmd.label}
                                   onChange={(e) => updateItem('command', idx, 'label', e.target.value)}
                                   placeholder="pricing"
                                   className="w-full bg-indigo-50/30 border border-indigo-100/50 rounded-xl px-7 py-2 text-sm font-black text-indigo-700 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                                />
                             </div>
                          </div>
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Bot Response</label>
                             <textarea 
                                value={cmd.value}
                                onChange={(e) => updateItem('command', idx, 'value', e.target.value)}
                                placeholder="Auto-reply text..."
                                rows="2"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 focus:bg-white focus:ring-4 focus:ring-primary-500/5 outline-none transition-all resize-none"
                             />
                          </div>
                       </div>
                    </div>
                  ))}
                  {adminCommands.length === 0 && (
                    <div className="col-span-2 py-20 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100 opacity-50">
                       <Zap size={48} className="mx-auto text-slate-200 mb-4" />
                       <p className="text-slate-400 font-bold">No custom commands mapped.</p>
                    </div>
                  )}
                </div>
              </div>
           )}


        </div>
      </div>
      {/* Preset Confirmation Modal */}
      <Modal
        isOpen={showPresetModal}
        onClose={() => setShowPresetModal(false)}
        title="Load Industry Presets"
        footer={(
          <div className="flex items-center justify-end gap-3 w-full">
            <button
              onClick={() => setShowPresetModal(false)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={loadSemiPresets}
              className="px-8 py-2.5 rounded-xl text-xs font-bold bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-100 transition-all uppercase tracking-widest"
            >
              Overwrite & Load
            </button>
          </div>
        )}
      >
        <div className="flex flex-col items-center text-center p-4">
          <div className="size-20 bg-amber-50 rounded-[2.5rem] flex items-center justify-center text-amber-500 mb-6 border border-amber-100 shadow-sm">
            <Sparkles size={40} className="animate-pulse" />
          </div>
          <h4 className="text-xl font-black text-slate-900 mb-2">Initialize SEMI Presets?</h4>
          <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
            This operation will <span className="text-red-500 font-bold">replace</span> your current bot automation setup with our pre-configured medical industry flows.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black rounded-lg border border-slate-100">MEMBERSHIPS</span>
            <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black rounded-lg border border-slate-100">NBLS/NCLS</span>
            <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black rounded-lg border border-slate-100">HQ DATA</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatSettings;
