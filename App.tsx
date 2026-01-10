
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MapDiscovery from './components/MapDiscovery';
import DirectChat from './components/DirectChat';
import TrackingSystem from './components/TrackingSystem';
import SlotManagement from './components/SlotManagement';
import AuthForm from './components/AuthForm';
import ProfileEditor from './components/ProfileEditor';
import { UserRole, OJTPosting, UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<string>('map');
  const [activeContact, setActiveContact] = useState<{ id: string, name: string, avatar: string } | null>(null);

  // Persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('mapmyojt_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setInitialView(parsed.role);
    }
  }, []);

  const setInitialView = (role: UserRole) => {
    const defaultViews: Record<UserRole, string> = {
      [UserRole.STUDENT]: 'map',
      [UserRole.BUSINESS]: 'dashboard-bus',
      [UserRole.COORDINATOR]: 'dashboard-coord'
    };
    setCurrentView(defaultViews[role]);
  };

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem('mapmyojt_user', JSON.stringify(newUser));
    setInitialView(newUser.role);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mapmyojt_user');
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('mapmyojt_user', JSON.stringify(updatedUser));
  };

  const handleStartChat = (posting: OJTPosting) => {
    setActiveContact({
      id: posting.id,
      name: posting.companyName,
      avatar: `https://picsum.photos/seed/${posting.companyName}/200`
    });
    setCurrentView('chat');
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#030303] text-white overflow-hidden selection:bg-emerald-500 selection:text-black">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-emerald-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150" />
      </div>

      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        role={user.role} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col p-8 relative z-10 overflow-hidden">
        {/* Universal Top Nav */}
        <header className="flex items-center justify-between mb-10 shrink-0">
          <div>
            <div className="flex items-center space-x-2 mb-1">
               <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></span>
               <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
                 Live {user.role} Console
               </span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight capitalize">
              {currentView === 'profile' ? "Account Settings" : currentView.replace('-', ' ')}
            </h2>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/5 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100`} className="w-full h-full" alt="User" />
                 </div>
               ))}
            </div>
            <div className="h-10 w-px bg-white/10" />
            <button onClick={() => setCurrentView('profile')} className="flex items-center space-x-4 group">
              <div className="text-right">
                <p className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">{user.name}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{user.affiliation}</p>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <img src={user.avatar} className="relative w-12 h-12 rounded-2xl border border-white/10 p-0.5 object-cover shadow-2xl" alt="Profile" />
              </div>
            </button>
          </div>
        </header>

        {/* Content Portal */}
        <div className="flex-1 relative overflow-hidden flex flex-col h-full w-full">
          {/* Business Verification Gate */}
          {user.role === UserRole.BUSINESS && !user.isVerified && currentView !== 'dashboard-bus' && currentView !== 'profile' && (
            <div className="absolute inset-0 z-[100] glass flex items-center justify-center p-12 text-center rounded-[3rem]">
               <div className="max-w-md">
                  <div className="text-6xl mb-6">🛡️</div>
                  <h3 className="text-2xl font-black mb-4">Verification Pending</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Your business account is currently being reviewed. Once verified, you can post OJT slots and manage intern logs.
                  </p>
                  <button 
                    onClick={() => setCurrentView('dashboard-bus')}
                    className="px-8 py-3 bg-emerald-500 text-black font-black rounded-xl uppercase tracking-widest text-xs"
                  >
                    Back to Dashboard
                  </button>
               </div>
            </div>
          )}

          {currentView === 'profile' && <ProfileEditor user={user} onUpdate={handleUpdateUser} />}
          {currentView === 'map' && <MapDiscovery onStartChat={handleStartChat} />}
          
          {currentView === 'chat' && (
            <div className="flex h-full space-x-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-80 hidden lg:flex flex-col space-y-4 shrink-0">
                <div className="glass p-5 rounded-2xl border border-white/10">
                   <input 
                     type="text" 
                     placeholder="Search active threads..." 
                     className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:ring-1 ring-emerald-500/50 transition-all"
                   />
                </div>
                <div className="flex-1 glass rounded-2xl border border-white/10 overflow-y-auto p-3 space-y-2">
                   {[
                     { id: 'bus-1', name: 'Sarah Chen', org: 'Nexus Labs', lastMsg: 'Your React tasks look solid.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
                     { id: 'bus-2', name: 'James Miller', org: 'Vivid Media', lastMsg: 'When can you start?', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' }
                   ].map(contact => (
                     <button 
                       key={contact.id}
                       onClick={() => setActiveContact(contact)}
                       className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all border ${activeContact?.id === contact.id ? 'bg-emerald-500/10 border-emerald-500/40 shadow-xl' : 'border-transparent hover:bg-white/5'}`}
                     >
                       <img src={contact.avatar} className="w-12 h-12 rounded-full border border-white/10 shadow-lg" />
                       <div className="text-left overflow-hidden">
                         <p className="text-sm font-black text-white truncate">{contact.name}</p>
                         <p className="text-[10px] text-emerald-500 font-bold uppercase mb-1">{contact.org}</p>
                         <p className="text-[10px] text-gray-500 truncate">{contact.lastMsg}</p>
                       </div>
                     </button>
                   ))}
                </div>
              </div>
              <DirectChat currentUser={user} activeContact={activeContact} />
            </div>
          )}

          {(currentView === 'logs-std' || currentView === 'logs-bus') && (
            <TrackingSystem role={user.role} studentId={user.id} />
          )}

          {currentView === 'slots' && user.role === UserRole.BUSINESS && (
            <SlotManagement companyName={user.affiliation || 'Nexus Labs'} />
          )}

          {currentView === 'dashboard-bus' && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-700 h-full">
                <div className="md:col-span-2 space-y-8 overflow-y-auto pr-4">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="glass p-8 rounded-[2.5rem] border border-white/10 text-center group hover:border-emerald-500/30 transition-all">
                       <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-4">Active Interns</span>
                       <span className="text-6xl font-black text-white group-hover:scale-110 inline-block transition-transform">12</span>
                    </div>
                    <div className="glass p-8 rounded-[2.5rem] border border-white/10 text-center group hover:border-amber-500/30 transition-all">
                       <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-4">Pending Logs</span>
                       <span className="text-6xl font-black text-amber-400 group-hover:scale-110 inline-block transition-transform">04</span>
                    </div>
                    <div className="glass p-8 rounded-[2.5rem] border border-white/10 text-center group hover:border-blue-500/30 transition-all">
                       <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-4">Recruitment</span>
                       <span className="text-6xl font-black text-blue-400 group-hover:scale-110 inline-block transition-transform">08</span>
                    </div>
                  </div>
                  
                  <div className="glass p-10 rounded-[3rem] border border-white/10">
                    <h3 className="text-2xl font-black mb-8">Performance Leaderboard</h3>
                    <div className="space-y-4">
                       {[
                         { name: 'Alex Rivera', hours: 154, progress: 85, avatar: 'https://picsum.photos/seed/alex/100' },
                         { name: 'Maria Lopez', hours: 98, progress: 55, avatar: 'https://picsum.photos/seed/maria/100' },
                         { name: 'Kevin Tan', hours: 45, progress: 25, avatar: 'https://picsum.photos/seed/kevin/100' },
                       ].map(p => (
                         <div key={p.name} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                           <div className="flex items-center space-x-4">
                             <img src={p.avatar} className="w-10 h-10 rounded-full border border-white/10" />
                             <div>
                               <p className="font-bold text-white">{p.name}</p>
                               <p className="text-xs text-gray-500">{p.hours} hours logged</p>
                             </div>
                           </div>
                           <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${p.progress}%` }} />
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="glass p-8 rounded-[2.5rem] border border-white/10 h-full overflow-y-auto">
                   <h3 className="text-xl font-black mb-6 flex items-center">
                     <span className="mr-2">✨</span> AI Insights
                   </h3>
                   <div className="space-y-6">
                      <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                         <p className="text-xs text-emerald-400 font-bold mb-2 uppercase tracking-widest">Talent Alert</p>
                         <p className="text-sm text-gray-300 leading-relaxed">
                           Alex Rivera is performing 40% above the average internship benchmark. Consider fast-tracking for a Junior role.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {currentView === 'dashboard-coord' && (
             <div className="space-y-8 animate-in fade-in duration-700 h-full overflow-y-auto pr-4">
               <div className="grid grid-cols-4 gap-6">
                  {[
                    { label: 'Total Internships', val: '458', icon: '🎓' },
                    { label: 'Partner Schools', val: '24', icon: '🏫' },
                    { label: 'Verified Partners', val: '112', icon: '🏢' },
                    { label: 'Success Rate', val: '98%', icon: '🚀' },
                  ].map(stat => (
                    <div key={stat.label} className="glass p-8 rounded-3xl border border-white/10">
                      <div className="text-3xl mb-4">{stat.icon}</div>
                      <div className="text-4xl font-black mb-1">{stat.val}</div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
               </div>

               <div className="glass p-10 rounded-[3rem] border border-white/10">
                  <h3 className="text-2xl font-black mb-10 flex items-center justify-between">
                    <span>Program Distribution</span>
                    <span className="text-sm text-emerald-500 font-bold">Academic Year 2026</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-10 h-48">
                     <div className="space-y-6">
                        {['Computer Science', 'Info Tech', 'Engineering', 'BusAdmin'].map((prog, i) => (
                          <div key={prog} className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span>{prog}</span>
                              <span className="text-gray-500">{90 - (i * 15)}% Placement</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-emerald-500" style={{ width: `${90 - (i * 15)}%` }} />
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
             </div>
          )}

          {currentView === 'verifications' && user.role === UserRole.COORDINATOR && (
            <div className="space-y-6 animate-in fade-in duration-500 h-full overflow-y-auto pr-4">
               <div className="glass p-10 rounded-[3rem] border border-white/10">
                 <h3 className="text-2xl font-black mb-8">Business Verifications</h3>
                 <div className="space-y-4">
                    {[
                      { name: 'Nexus Labs', rep: 'Sarah Chen', industry: 'Software', date: '2 hours ago' },
                      { name: 'Quantum Fin', rep: 'Bob Vance', industry: 'Finance', date: '1 day ago' },
                    ].map((b, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center font-black text-emerald-500 text-xl">
                            {b.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-lg font-bold">{b.name}</p>
                            <p className="text-xs text-gray-500">Rep: {b.rep} • {b.industry}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button className="px-6 py-2 bg-emerald-500 text-black rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400">Approve</button>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
