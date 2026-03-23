import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';

const pageTitles = {
  '/admin/dashboard':    'Dashboard',
  '/admin/memberships':  'Membership Registrations',
  '/admin/create-admin': 'Create Admin',
  '/admin/live-chat':    'Live Chat',
  '/admin/chat-history': 'Chat History',
};

const Header = ({ onMenuToggle }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'Admin Panel';

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-[10] shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">{pageTitle}</h1>
          <p className="text-xs text-gray-400 hidden sm:block">SEMI Admin Panel</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative h-9 w-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-tight">{user.email?.split('@')[0] || 'Admin'}</p>
            <p className="text-xs text-gray-400 capitalize">{user.role || 'Administrator'}</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-primary-200 flex-shrink-0">
            {(user.email || 'A')[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
