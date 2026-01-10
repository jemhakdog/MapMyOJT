
import React, { useState } from 'react';
import { DailyLog, UserRole } from '../types';
import { checkLogQuality } from '../geminiService';

interface TrackingSystemProps {
  role: UserRole;
  studentId: string;
}

const TrackingSystem: React.FC<TrackingSystemProps> = ({ role, studentId }) => {
  const [logs, setLogs] = useState<DailyLog[]>([
    { id: 'l1', studentId: 'std-1', studentName: 'Alex Rivera', businessId: 'bus-1', date: '2026-01-08', hours: 8, tasks: 'Designed the main dashboard high-fidelity prototypes in Figma and conducted basic user testing.', status: 'APPROVED' },
    { id: 'l2', studentId: 'std-1', studentName: 'Alex Rivera', businessId: 'bus-1', date: '2026-01-09', hours: 7.5, tasks: 'Refined the component library and started implementation on the map discovery feature.', status: 'PENDING' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ date: new Date().toISOString().split('T')[0], hours: 8, tasks: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // AI Enhancement
    const enhancedTasks = await checkLogQuality(formData.tasks);
    
    const newLog: DailyLog = {
      id: Date.now().toString(),
      studentId: studentId,
      studentName: 'Alex Rivera', // In real app, from user state
      businessId: 'bus-1',
      date: formData.date,
      hours: formData.hours,
      tasks: enhancedTasks || formData.tasks,
      status: 'PENDING'
    };
    
    setLogs([newLog, ...logs]);
    setFormData({ ...formData, tasks: '' });
    setIsSubmitting(false);
  };

  const handleStatusChange = (logId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setLogs(logs.map(log => log.id === logId ? { ...log, status: newStatus } : log));
  };

  return (
    <div className="flex-1 overflow-y-auto pr-2 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight">OJT Performance Logs</h2>
          <p className="text-gray-500 mt-2 font-medium">Verified tracking of professional accomplishments.</p>
        </div>
        
        {role === UserRole.STUDENT && (
           <div className="glass px-8 py-4 rounded-3xl border border-emerald-500/30 flex items-center space-x-4 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Progress</span>
                <span className="text-2xl font-black text-emerald-400">15.5 / 400 hrs</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative">
                 <div className="absolute inset-0 border-4 border-emerald-500 rounded-full" style={{ clipPath: 'inset(0 0 50% 0)' }}></div>
                 <span className="text-[10px] font-black text-emerald-500">4%</span>
              </div>
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Input Card */}
        {role === UserRole.STUDENT && (
          <div className="xl:col-span-1">
            <div className="glass p-8 rounded-[2rem] border border-white/10 sticky top-0">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center">
                <span className="mr-3">🖊️</span> Create Log
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Rendered Hours</label>
                  <input 
                    type="number" 
                    required
                    step="0.5"
                    value={formData.hours}
                    onChange={(e) => setFormData({...formData, hours: parseFloat(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Achievements</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.tasks}
                    onChange={(e) => setFormData({...formData, tasks: e.target.value})}
                    placeholder="Describe your daily impact..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl transition-all disabled:opacity-50 shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full"></div>
                      <span>AI Polishing...</span>
                    </>
                  ) : (
                    <span>Log Accomplishment</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className={role === UserRole.STUDENT ? "xl:col-span-3 space-y-6" : "xl:col-span-4 space-y-6"}>
          {logs.map((log, idx) => (
            <div 
              key={log.id} 
              className="glass p-8 rounded-3xl border border-white/10 hover:border-emerald-500/20 transition-all group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Vertical accent */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                log.status === 'APPROVED' ? 'bg-emerald-500' :
                log.status === 'REJECTED' ? 'bg-red-500' :
                'bg-amber-500'
              } opacity-50 group-hover:opacity-100 transition-opacity`} />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="text-xl font-bold text-white">
                      {new Date(log.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 font-black uppercase tracking-[0.15em]">
                      {log.hours} Hours
                    </span>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      log.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      log.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                      <span>{log.status}</span>
                    </div>
                  </div>
                  
                  {role === UserRole.BUSINESS && (
                    <div className="mb-4 flex items-center space-x-2">
                       <img src={`https://picsum.photos/seed/${log.studentName}/100`} className="w-6 h-6 rounded-full border border-white/10" />
                       <span className="text-xs font-bold text-emerald-400">{log.studentName}</span>
                    </div>
                  )}

                  <p className="text-gray-400 leading-relaxed text-lg max-w-4xl italic group-hover:text-gray-300 transition-colors">
                    "{log.tasks}"
                  </p>
                </div>

                {role === UserRole.BUSINESS && log.status === 'PENDING' && (
                  <div className="flex flex-row lg:flex-col items-center gap-3">
                    <button 
                      onClick={() => handleStatusChange(log.id, 'APPROVED')}
                      className="w-full lg:w-32 py-3 bg-emerald-500 text-black text-xs font-black rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
                    >
                      Verify
                    </button>
                    <button 
                      onClick={() => handleStatusChange(log.id, 'REJECTED')}
                      className="w-full lg:w-32 py-3 border border-red-500/30 text-red-400 text-xs font-black rounded-xl hover:bg-red-500/10 transition-all"
                    >
                      Dispute
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingSystem;
