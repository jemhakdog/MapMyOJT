
import React from 'react';
import { UserRole } from '../types';

interface SidebarProps {
  currentView: string;
  setView: (view: any) => void;
  role: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, role, onLogout }) => {
  const navItems = [
    // Shared
    { id: 'profile', label: 'My Profile', icon: '👤', roles: [UserRole.STUDENT, UserRole.BUSINESS, UserRole.COORDINATOR] },
    
    // Students
    { id: 'map', label: 'Discovery', icon: '🗺️', roles: [UserRole.STUDENT] },
    { id: 'logs-std', label: 'My Work Logs', icon: '📝', roles: [UserRole.STUDENT] },
    
    // Business
    { id: 'dashboard-bus', label: 'Company Hub', icon: '🏢', roles: [UserRole.BUSINESS] },
    { id: 'logs-bus', label: 'Intern Logs', icon: '✅', roles: [UserRole.BUSINESS] },
    { id: 'slots', label: 'OJT Slots', icon: '➕', roles: [UserRole.BUSINESS] },

    // Coordinator
    { id: 'dashboard-coord', label: 'Oversight', icon: '📊', roles: [UserRole.COORDINATOR] },
    { id: 'verifications', label: 'Verifications', icon: '🛡️', roles: [UserRole.COORDINATOR] },

    // Shared
    { id: 'chat', label: 'Messages', icon: '💬', roles: [UserRole.STUDENT, UserRole.BUSINESS] },
  ];

  return (
    <div className="w-64 h-full glass border-r border-white/10 flex flex-col p-6 space-y-8 z-50">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <span className="text-black text-xl font-black">M</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">MapMyOJT</h1>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto">
        {navItems
          .filter(item => item.roles.includes(role))
          .map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                currentView === item.id 
                  ? 'bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${currentView === item.id ? '' : 'filter grayscale opacity-60'}`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
      </nav>

      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Session</p>
          <p className="text-xs text-white font-medium truncate">{role} Mode</p>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all border border-red-500/20 text-xs font-bold uppercase tracking-widest"
        >
          <span>Sign Out</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
