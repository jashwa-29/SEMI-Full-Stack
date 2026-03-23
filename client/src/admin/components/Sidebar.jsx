import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserPlus, LogOut, X, Shield, Users, MessageCircle, History, Settings, Mail } from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { path: '/admin/memberships',   label: 'Memberships',   icon: Users },
  { path: '/admin/email-templates', label: 'Email Templates', icon: Mail },
  { path: '/admin/create-admin',  label: 'Create Admin',  icon: UserPlus },
  // { path: '/admin/live-chat',     label: 'Live Chat',     icon: MessageCircle },
  { path: '/admin/chat-history',  label: 'Chat History',  icon: History },
  { path: '/admin/chat-settings', label: 'Chat Settings', icon: Settings },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center shadow shadow-primary-300">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            Semi<span className="text-primary-600">Admin</span>
          </span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User badge */}
      <div className="px-4 py-3 mx-3 mt-4 bg-primary-50 rounded-xl border border-primary-100">
        <p className="text-[10px] text-primary-500 font-semibold uppercase tracking-wider">Logged in as</p>
        <p className="text-sm font-semibold text-primary-800 mt-0.5 truncate">{currentUser.email || 'Admin'}</p>
        <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-600 text-white capitalize">
          {currentUser.role || 'admin'}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-5 space-y-1 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Navigation</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-150 ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={18} className="flex-shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-100 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
        >
          <LogOut size={18} className="flex-shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 h-full flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[400] bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <aside className="fixed inset-y-0 left-0 z-[410] w-64 lg:hidden shadow-xl animate-fadeIn">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
