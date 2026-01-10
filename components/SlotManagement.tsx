
import React, { useState } from 'react';
import { OJTPosting } from '../types';
import { MOCK_POSTINGS } from '../constants';

interface SlotManagementProps {
  companyName: string;
}

const SlotManagement: React.FC<SlotManagementProps> = ({ companyName }) => {
  const [postings, setPostings] = useState<OJTPosting[]>(
    MOCK_POSTINGS.filter(p => p.companyName === companyName)
  );
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tech' as any,
    slots: 1,
    skills: ''
  });

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newPosting: OJTPosting = {
      id: `p${Date.now()}`,
      companyName,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      address: 'Office HQ, Tech District', // Simplified for mock
      lat: 14.5995,
      lng: 120.9842,
      requiredSkills: formData.skills.split(',').map(s => s.trim()),
      slotsAvailable: formData.slots,
      status: 'ACTIVE'
    };
    setPostings([newPosting, ...postings]);
    setIsAdding(false);
    setFormData({ title: '', description: '', category: 'Tech', slots: 1, skills: '' });
  };

  const toggleStatus = (id: string) => {
    setPostings(postings.map(p => 
      p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE' } : p
    ));
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white">Manage OJT Slots</h2>
          <p className="text-gray-500 mt-1 font-medium">Control your company's visibility on the discovery map.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
        >
          <span className="text-lg">＋</span>
          <span>Create New Slot</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {postings.map((post) => (
          <div key={post.id} className="glass p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-emerald-500/30 transition-all">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                  post.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {post.status}
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{post.category}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{post.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.requiredSkills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] text-gray-300 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6 shrink-0">
               <div className="text-center px-4 border-r border-white/5">
                 <p className="text-2xl font-black text-white leading-none">{post.slotsAvailable}</p>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Slots</p>
               </div>
               <div className="flex flex-col space-y-2">
                 <button 
                   onClick={() => toggleStatus(post.id)}
                   className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                     post.status === 'ACTIVE' ? 'border border-gray-500/30 text-gray-400 hover:bg-white/5' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                   }`}
                 >
                   {post.status === 'ACTIVE' ? 'Close Slot' : 'Reopen Slot'}
                 </button>
                 <button className="px-4 py-2 border border-red-500/20 text-red-500/60 hover:text-red-400 hover:bg-red-500/5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                   Delete
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="glass w-full max-w-xl p-10 rounded-[2.5rem] border border-white/10 relative animate-in zoom-in-95 duration-300 shadow-2xl">
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black text-white mb-8">Post New OJT Opportunity</h3>
            
            <form onSubmit={handleAddSlot} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Job Title</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. UX Research Intern"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-emerald-500/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as any})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-emerald-500/50 outline-none transition-all appearance-none"
                  >
                    <option value="Tech">Tech</option>
                    <option value="Design">Design</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-emerald-500/50 outline-none transition-all resize-none"
                  placeholder="Tell students about the role..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Available Slots</label>
                  <input 
                    type="number"
                    min="1"
                    required
                    value={formData.slots}
                    onChange={e => setFormData({...formData, slots: parseInt(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-emerald-500/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Skills (Comma separated)</label>
                  <input 
                    required
                    value={formData.skills}
                    onChange={e => setFormData({...formData, skills: e.target.value})}
                    placeholder="Figma, React, etc."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-emerald-500/50 outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 mt-4"
              >
                Publish Posting
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotManagement;
