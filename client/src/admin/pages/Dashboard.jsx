import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  MessageSquare, 
  Mail, 
  Activity, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  TrendingUp,
  UserPlus,
  RefreshCw,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import membershipService from '../services/membership.service';
import { chatService } from '../services/chat.service';
import newsletterService from '../services/newsletter.service';
import systemService from '../services/system.service';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    admins: [],
    members: [],
    chats: [],
    subscribers: []
  });
  const [health, setHealth] = useState({
    status: 'DOWN',
    dbStatus: 'DISCONNECTED',
    uptime: 0,
    version: '1.0.4'
  });
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isSuperAdmin = currentUser.role === 'superadmin';

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const promises = [
        membershipService.getAll(),
        chatService.getHistory({ limit: 5 }),
        newsletterService.getSubscribers(),
        systemService.getHealth()
      ];

      // Only fetch admins if superadmin
      if (isSuperAdmin) {
        promises.unshift(authService.getAdmins());
      }

      const results = await Promise.all(promises);
      
      let adminsData = [];
      let membersRes, chatsRes, subsRes, healthRes;

      if (isSuperAdmin) {
        const [adminsRes, ...others] = results;
        adminsData = adminsRes.data || [];
        [membersRes, chatsRes, subsRes, healthRes] = others;
      } else {
        [membersRes, chatsRes, subsRes, healthRes] = results;
      }

      setData({
        admins: adminsData,
        members: membersRes.data || [],
        chats: chatsRes.data || [],
        subscribers: subsRes.data || []
      });

      setHealth({
        status: healthRes.status || 'UP',
        dbStatus: healthRes.dbStatus || 'CONNECTED',
        uptime: healthRes.uptime || 0,
        version: '1.0.4'
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load dashboard data. Some sections might be incomplete.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    setDeleteLoading(id);
    try {
      await authService.deleteAdmin(id);
      setData(prev => ({
        ...prev,
        admins: prev.admins.filter(a => a._id !== id)
      }));
    } catch (err) {
      alert(err.message || 'Failed to delete admin.');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Stats calculation
  const stats = {
    totalMembers: data.members.length,
    pendingMembers: data.members.filter(m => m.status === 'pending').length,
    activeChats: data.chats.length,
    totalSubs: data.subscribers.length,
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm animate-pulse">
        <div className="h-12 w-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium font-outfit uppercase tracking-widest text-xs">Assembling your insights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Overview</h1>
          <p className="text-gray-500 mt-1 font-medium italic">Welcome back, {currentUser.name || 'Admin'}. Here is what is happening today.</p>
        </div>
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-sm shadow-sm"
        >
          <RefreshCw className="h-4 w-4" />
          Update Data
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl flex items-center gap-3 border border-red-100 shadow-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Members', val: stats.totalMembers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', path: '/admin/memberships' },
          { label: 'Pending Approvals', val: stats.pendingMembers, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', path: '/admin/memberships' },
          { label: 'Newsletter Subs', val: stats.totalSubs, icon: Mail, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Chat History', val: stats.activeChats, icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', path: '/admin/chat-history' },
        ].map((stat, i) => (
          <div 
            key={i} 
            onClick={() => stat.path && navigate(stat.path)}
            className={`p-6 rounded-3xl bg-white border ${stat.border} shadow-sm hover:shadow-md transition-all group ${stat.path ? 'cursor-pointer hover:border-primary-200' : 'cursor-default'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500 opacity-40" />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity: Memberships */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Activity className="h-5 w-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              </div>
              <button 
                onClick={() => navigate('/admin/memberships')}
                className="text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-x-auto text-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-[0.1em] text-[10px]">Applicant</th>
                    <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-[0.1em] text-[10px]">Email</th>
                    <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-[0.1em] text-[10px]">Status</th>
                    <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-[0.1em] text-[10px] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.members.slice(0, 5).map((m) => (
                    <tr key={m._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[10px] font-black">
                            {m.fullName?.charAt(0) || 'U'}
                          </div>
                          <p className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{m.fullName || 'Anonymous'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{m.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase
                          ${m.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            m.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                            m.status === 'on-review' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                            'bg-amber-50 text-amber-700 border border-amber-100'}
                        `}>
                          <span className={`h-1.5 w-1.5 rounded-full ${m.status === 'approved' ? 'bg-emerald-500' : m.status === 'rejected' ? 'bg-red-500' : m.status === 'on-review' ? 'bg-indigo-500' : 'bg-amber-500'}`} />
                          {m.status === 'on-review' ? 'On Review' : m.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => navigate('/admin/memberships')}
                          className="p-1 px-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg transition-all text-xs font-bold text-gray-500 uppercase tracking-tighter"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.members.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">No recent applications found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Admin Management (Condensed) */}
          {isSuperAdmin && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Admin Team</h2>
                </div>
                <button 
                  onClick={() => navigate('/admin/create-admin')}
                  className="p-2 bg-primary-100 text-primary-700 rounded-xl hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                  title="Add Admin"
                >
                  <UserPlus className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                {data.admins.map(admin => (
                  <div key={admin._id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600 font-black">
                        {admin.name?.charAt(0) || admin.email.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">{admin.name || 'Admin User'}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{admin.role}</p>
                      </div>
                    </div>
                    {admin._id !== currentUser.id && (
                      <button 
                        onClick={() => handleDeleteAdmin(admin._id)}
                        disabled={deleteLoading === admin._id}
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        {deleteLoading === admin._id ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Newsletter & Quick Insights */}
        <div className="space-y-8">
          {/* Newsletter Subscribers */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Mail className="h-5 w-5 text-emerald-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">New Subscribers</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {data.subscribers.slice(0, 6).map((sub, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50/50 border border-transparent hover:border-emerald-100 hover:bg-emerald-50/20 transition-all">
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-800 truncate">{sub.email}</p>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Joined {new Date(sub.subscribedAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {data.subscribers.length === 0 && (
                <div className="text-center py-8">
                  <Mail className="mx-auto h-12 w-12 text-gray-200 mb-2" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No subscribers yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Insights / System Health */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-lg shadow-indigo-200 relative overflow-hidden group">
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6" />
                System Health
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-80">
                    <span>Membership Sync</span>
                    <span>{stats.totalMembers ? Math.round(((stats.totalMembers - stats.pendingMembers) / stats.totalMembers) * 100) : 0}%</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)] transition-all duration-1000" 
                      style={{ width: `${stats.totalMembers ? Math.round(((stats.totalMembers - stats.pendingMembers) / stats.totalMembers) * 100) : 0}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">Database</p>
                    <p className={`text-[10px] font-bold ${health.dbStatus === 'CONNECTED' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {health.dbStatus}
                    </p>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">API Status</p>
                    <p className={`text-[10px] font-bold ${health.status === 'UP' ? 'text-emerald-400' : 'text-red-400'}`}>
                      ONLINE
                    </p>
                  </div>
                </div>

                <p className="text-xs font-medium opacity-70 leading-relaxed italic">
                  Systems active for {Math.floor(health.uptime / 3600)}h {Math.floor((health.uptime % 3600) / 60)}m. Socket relay initialized and secure.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                  <CheckCircle2 className="h-3 w-3" /> API v{health.version} Status: {health.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
