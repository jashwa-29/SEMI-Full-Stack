import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Eye, 
  Search, 
  RefreshCcw, 
  Calendar,
  User,
  Clock,
  MessageCircle,
  X,
  Bot,
  Filter,
  Tag,
  ChevronRight,
  Hash,
  Activity,
  ArrowRight,
  FileDown,
  Shield
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { chatService } from '../services/chat.service';
import Toast from '../components/Toast';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';

const ChatHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [availableCategories, setAvailableCategories] = useState(['All']);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const [historyRes, categoriesRes] = await Promise.all([
        chatService.getHistory({ page, limit }),
        chatService.getCategories()
      ]);
      
      setHistory(historyRes?.data || []);
      setTotal(historyRes?.total || 0);
      
      const incoming = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
      const combined = [...new Set(['All', ...incoming])];
      setAvailableCategories(combined);
    } catch (err) {
      console.error('Failed to load chat data', err);
      showToast('Failed to load archives.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const filteredHistory = history.filter(h => {
    const matchesSearch = (h.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (h.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (h.visitorId || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || (h.category || 'General Enquiry') === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const exportToExcel = (data, fileName = 'leads-export') => {
    const leads = data.map(chat => ({
      'Lead ID': chat._id,
      'Visitor ID': chat.visitorId,
      'Lead Name': chat.name || 'Anonymous',
      'Lead Email': chat.email || 'Not Provided',
      'Lead Phone': chat.phone || 'Not Provided',
      'Pipeline/Category': chat.category || 'General',
      'Total Exchanges': chat.messages?.length || 0,
      'Acquisition Date': new Date(chat.createdAt).toLocaleString(),
      'Last Pulse': new Date(chat.updatedAt).toLocaleString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(leads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lead Archive");
    
    // Column formatting
    worksheet['!cols'] = [
        {wch: 25}, {wch: 20}, {wch: 20}, {wch: 30}, {wch: 15}, {wch: 20}, {wch: 15}, {wch: 25}, {wch: 25}
    ];

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleBulkExport = async () => {
    try {
      showToast('Generating lead analytics file...', 'info');
      const res = await chatService.getHistory({ page: 1, limit: 1000 });
      if (res?.data) {
        exportToExcel(res.data, `bulk-leads-inventory-${new Date().toISOString().split('T')[0]}`);
        showToast('Bulk lead data exported successfully!');
      }
    } catch (err) {
      showToast('Lead export encountered an error.', 'error');
    }
  };

  const handleSingleExport = () => {
    if (!selectedChat) return;
    exportToExcel([selectedChat], `lead-profile-${(selectedChat.name || selectedChat.visitorId).substring(0, 15)}`);
    showToast('Isolated lead data exported.');
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-fadeIn pb-20 px-4">
      {toast.show && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast({ ...toast, show: false })} />
      )}

      {/* Header & Stats Banner */}
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 text-slate-900 shadow-xl shadow-slate-200/40">
        <div className="absolute top-0 right-0 p-10 opacity-5 blur-2xl pointer-events-none text-primary-600">
            <Activity size={300} strokeWidth={0.5} />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 shadow-sm">
                <span className="size-2 rounded-full bg-primary-500 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-600">Archival Vault v2.4</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none text-slate-900">
              Interaction <span className="text-primary-600 italic">Timeline</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-xl text-sm leading-relaxed">
              Every conversation is a data point. Review automated outcomes, visitor sentiments, and conversion paths in real-time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary-200 transition-all hover:shadow-lg hover:shadow-primary-500/5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Logs</p>
                <p className="text-4xl font-black tabular-nums tracking-tighter text-slate-900">{total}</p>
            </div>
            <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary-200 transition-all hover:shadow-lg hover:shadow-primary-500/5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unique Paths</p>
                <p className="text-4xl font-black tabular-nums tracking-tighter text-slate-900">{availableCategories.length - 1}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col xl:flex-row gap-6 items-center justify-between pb-2">
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="relative group flex-1 sm:w-80">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, email or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="relative group sm:w-64">
            <Filter size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-14 pl-14 pr-10 rounded-2xl bg-white border border-slate-100 shadow-sm text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 appearance-none cursor-pointer transition-all"
            >
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Channels' : cat}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronRight className="rotate-90" size={16} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleBulkExport}
            className="flex items-center gap-3 h-14 px-8 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200 font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
          >
            <FileDown size={16} />
            Bulk Export Leads
          </button>
          
          <button 
            onClick={fetchHistory}
            className="flex items-center gap-3 h-14 px-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:bg-slate-50 text-slate-600 font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
          >
            <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh Vault
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Interaction Identity</th>
                <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Process Pipeline</th>
                <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Total Traffic</th>
                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Captured Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-6">
                       <div className="size-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                         <RefreshCcw className="animate-spin" size={32} strokeWidth={1.5} />
                       </div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Decrypting Interaction Logs...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="size-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-200">
                            <Hash size={40} strokeWidth={1} />
                        </div>
                        <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">No Interaction Records Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredHistory.map((chat) => (
                  <tr key={chat._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-5">
                        <div className="size-14 rounded-3xl bg-slate-900 text-white flex items-center justify-center text-lg font-black shadow-xl shadow-slate-200 transform group-hover:scale-110 transition-transform">
                          {chat.name?.charAt(0) || 'V'}
                        </div>
                        <div className="space-y-1">
                          <p className="text-base font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-none tracking-tight">
                            {chat.name || 'Anonymous Visitor'}
                          </p>
                          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-2">
                            {chat.email ? (
                                <>
                                    <span className="size-1 bg-slate-300 rounded-full"></span>
                                    {chat.email}
                                </>
                            ) : (
                                <>
                                    <span className="size-1 bg-slate-300 rounded-full"></span>
                                    ID: {chat.visitorId.substring(0, 15)}...
                                </>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-7">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all
                          ${chat.category === 'Membership' ? 'bg-indigo-50/50 text-indigo-700 border-indigo-100 shadow-indigo-100/50' :
                            chat.category === 'Courses' ? 'bg-emerald-50/50 text-emerald-700 border-emerald-100 shadow-emerald-100/50' :
                            chat.category === 'General' ? 'bg-blue-50/50 text-blue-700 border-blue-100 shadow-blue-100/50' :
                            'bg-slate-50 text-slate-600 border-slate-100'}
                          group-hover:translate-y-[-2px] hover:shadow-lg
                        `}>
                          <Tag size={12} className="opacity-50" />
                          {chat.category || 'Standard Input'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-7 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/50 rounded-2xl text-slate-900 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                        <MessageSquare size={12} className="text-slate-400" />
                        {chat.messages.length} Exchanges
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center justify-end gap-10">
                        <div className="hidden xl:flex flex-col items-end whitespace-nowrap">
                           <p className="text-sm font-black text-slate-900 tracking-tight">
                             {formatDate(chat.updatedAt)}
                           </p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                             {formatTime(chat.updatedAt)}
                           </p>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedChat(chat);
                            setShowModal(true);
                          }}
                          className="flex items-center justify-between gap-4 h-14 min-w-[180px] pl-6 pr-5 rounded-3xl bg-slate-900 text-white hover:bg-primary-600 shadow-xl shadow-slate-200 hover:shadow-primary-200 transition-all active:scale-95 group/btn"
                        >
                          <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Action</p>
                            <p className="text-[11px] font-black uppercase tracking-widest">Detail View</p>
                          </div>
                          <div className="size-8 rounded-2xl bg-white/10 flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
                            <ArrowRight size={16} strokeWidth={3} />
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {total > limit && (
          <div className="p-8 border-t border-slate-50 bg-slate-50/20">
            <Pagination 
              currentPage={page} 
              totalItems={total} 
              itemsPerPage={limit} 
              onPageChange={setPage} 
            />
          </div>
        )}
      </div>

      {/* Transcript Intelligence Modal */}
      <Modal 
        isOpen={showModal && !!selectedChat} 
        onClose={() => setShowModal(false)}
        size="4xl"
        customHeader={selectedChat && (
          <div className="relative p-10 bg-white border-b border-slate-100 rounded-t-2xl">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none text-primary-600">
                  <MessageSquare size={200} />
              </div>
              
              <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                      <div className="size-20 rounded-2xl bg-primary-50 flex items-center justify-center border border-primary-100 shadow-sm">
                          <Eye size={36} className="text-primary-600" />
                      </div>
                      <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-1">Interaction Identifier</p>
                          <h3 className="text-4xl font-black tracking-tighter leading-none text-slate-900">{selectedChat.name || 'Anonymous Visitor'}</h3>
                          <div className="flex gap-4 mt-3">
                              <span className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                  <Tag size={12} /> {selectedChat.category || 'General'}
                              </span>
                              <span className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                  <Clock size={12} /> {formatDate(selectedChat.createdAt)}
                              </span>
                          </div>
                      </div>
                  </div>
                  <button
                      onClick={() => setShowModal(false)}
                      className="size-14 rounded-[1.5rem] bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center border border-slate-100 group active:scale-95"
                  >
                      <X size={24} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform" />
                  </button>
              </div>
          </div>
        )}
        footer={selectedChat && (
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between w-full">
            <div className="hidden md:flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
              <Shield size={14} /> Lead Data Encryption Active
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleSingleExport}
                className="group flex-1 sm:flex-none flex items-center justify-center gap-3 h-14 px-8 rounded-3xl bg-emerald-50 text-emerald-700 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-100 transition-all active:scale-95"
              >
                <FileDown size={16} />
                Export as Lead
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="group flex-1 sm:flex-none flex items-center justify-center gap-4 h-14 px-8 rounded-3xl bg-primary-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 active:scale-95"
              >
                Close Transcript
              </button>
            </div>
          </div>
        )}
      >
        {selectedChat && (
          <div className="bg-slate-50/50 space-y-8 -m-6 p-6"> {/* Negative margin to negate Modal body padding if needed, but we can just use the natural padding */}
              {/* Reference ID Chip */}
              <div className="flex justify-center mb-4">
                  <div className="px-6 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                      <Hash size={12} strokeWidth={3} /> {selectedChat.visitorId}
                  </div>
              </div>

              {selectedChat.messages.map((msg, idx) => {
                const isBot = msg.sender === 'bot';
                const isAdmin = msg.isAdmin || isBot; // Treat bot as "us"

                return (
                  <div key={idx} className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'} my-1`}>
                    <div className={`flex items-end gap-3 max-w-[85%] ${isAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar / Icon */}
                      <div className={`size-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm
                        ${isBot ? 'bg-slate-700' : isAdmin ? 'bg-primary-600' : 'bg-slate-900'}`}>
                        {isBot ? <Bot size={18} className="text-white" /> : isAdmin ? <Shield size={18} className="text-white" /> : <User size={18} className="text-white" />}
                      </div>

                      <div className={`flex flex-col gap-1.5`}>
                         {/* Message Bubble */}
                         <div className={`relative px-5 py-4 rounded-3xl shadow-sm
                           ${isBot 
                             ? 'bg-slate-700 text-white rounded-tr-none' 
                             : isAdmin 
                             ? 'bg-primary-600 text-white rounded-tr-none' 
                             : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                           }`}
                         >
                           <p className="text-[13px] font-medium leading-relaxed">{msg.text}</p>
                         </div>
                         
                         <div className={`flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1 px-1 ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                           {isBot ? (
                             <>
                               <span className="text-slate-500">Automated Response</span>
                               <span className="size-1 bg-slate-200 rounded-full"></span>
                             </>
                           ) : isAdmin ? (
                             <>
                               <span className="text-primary-500">Operation Center</span>
                               <span className="size-1 bg-primary-200 rounded-full"></span>
                             </>
                           ) : (
                             <>
                               <span>Visitor Origin</span>
                               <span className="size-1 bg-slate-200 rounded-full"></span>
                             </>
                           )}
                           <span>{formatTime(msg.timestamp)}</span>
                         </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ChatHistory;
