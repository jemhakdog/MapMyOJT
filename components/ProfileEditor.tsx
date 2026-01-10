
import React, { useState } from 'react';
import { UserProfile, UserRole, OJTStatus, CompanyStatus } from '../types';

interface ProfileEditorProps {
  user: UserProfile;
  onUpdate: (updatedUser: UserProfile) => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SAVED'>('IDLE');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('SAVING');
    setTimeout(() => {
      onUpdate(formData);
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('IDLE'), 2000);
    }, 800);
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center space-x-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-500" />
            <img 
              src={formData.avatar} 
              className="relative w-32 h-32 rounded-[2.2rem] border-2 border-white/10 object-cover shadow-2xl" 
              alt="Profile" 
            />
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black border-4 border-black hover:scale-110 transition-transform">
              📸
            </button>
          </div>
          <div>
            <h2 className="text-4xl font-black text-white">{formData.name}</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-1">{formData.affiliation}</p>
            <div className="flex items-center space-x-3 mt-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                formData.role === UserRole.STUDENT ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                {formData.role}
              </span>
              {formData.isVerified && (
                <span className="flex items-center space-x-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                  <span>Verified</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={saveStatus === 'SAVING'}
          className={`px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${
            saveStatus === 'SAVED' ? 'bg-emerald-500 text-black' : 
            'bg-white text-black hover:bg-emerald-400 active:scale-95'
          }`}
        >
          {saveStatus === 'SAVING' ? 'Updating...' : saveStatus === 'SAVED' ? 'Changes Saved' : 'Update Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
          {/* Public Identity */}
          <section className="glass p-10 rounded-[3rem] border border-white/10">
            <h3 className="text-xl font-black text-white mb-8 flex items-center">
              <span className="mr-3">👤</span> Public Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Display Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-emerald-500/50 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Affiliation</label>
                <input 
                  type="text" 
                  value={formData.affiliation}
                  onChange={e => setFormData({...formData, affiliation: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-emerald-500/50 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">
                  {formData.role === UserRole.BUSINESS ? 'Company Vision' : 'Professional Bio'}
                </label>
                <textarea 
                  rows={4}
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-emerald-500/50 outline-none transition-all resize-none"
                  placeholder="Tell the Nexus community about yourself..."
                />
              </div>
            </div>
          </section>

          {/* Skill Matrix */}
          <section className="glass p-10 rounded-[3rem] border border-white/10">
            <h3 className="text-xl font-black text-white mb-8 flex items-center">
              <span className="mr-3">⚡</span> {formData.role === UserRole.BUSINESS ? 'Required Talent' : 'Skill Matrix'}
            </h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {formData.skills.map(skill => (
                <button 
                  key={skill}
                  onClick={() => removeSkill(skill)}
                  className="group px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:border-red-500/30 hover:text-red-400 transition-all flex items-center"
                >
                  {skill}
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
                </button>
              ))}
              <input 
                type="text"
                placeholder="Add skill..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSkill(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-sm text-emerald-400 placeholder:text-emerald-500/30 outline-none w-32 focus:w-48 transition-all"
              />
            </div>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Tip: Press Enter to add tags. Click to remove.</p>
          </section>
        </div>

        <div className="space-y-10">
          {/* Status & Availability */}
          <section className="glass p-10 rounded-[3rem] border border-white/10">
            <h3 className="text-xl font-black text-white mb-8">Status</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Current State</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-emerald-500/50 appearance-none transition-all"
                  value={formData.role === UserRole.STUDENT ? formData.ojtStatus : formData.companyStatus}
                  onChange={e => {
                    const val = e.target.value;
                    if (formData.role === UserRole.STUDENT) setFormData({...formData, ojtStatus: val as OJTStatus});
                    else setFormData({...formData, companyStatus: val as CompanyStatus});
                  }}
                >
                  {formData.role === UserRole.STUDENT ? (
                    <>
                      <option value="SEARCHING">Searching for OJT</option>
                      <option value="HIRED">Currently Hired</option>
                      <option value="COMPLETED">OJT Completed</option>
                      <option value="INACTIVE">Not Seeking</option>
                    </>
                  ) : (
                    <>
                      <option value="HIRING">Actively Hiring</option>
                      <option value="CLOSED">Applications Closed</option>
                    </>
                  )}
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div>
                  <p className="text-xs font-bold text-white uppercase">Profile Visibility</p>
                  <p className="text-[10px] text-gray-500 font-medium">Allow others to find you</p>
                </div>
                <button 
                  onClick={() => setFormData({...formData, visibility: formData.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'})}
                  className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${formData.visibility === 'PUBLIC' ? 'bg-emerald-500' : 'bg-gray-700'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${formData.visibility === 'PUBLIC' ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="glass p-10 rounded-[3rem] border border-white/10">
            <h3 className="text-xl font-black text-white mb-8">System</h3>
            <div className="space-y-4">
              <button 
                onClick={() => setFormData({...formData, notificationsEnabled: !formData.notificationsEnabled})}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{formData.notificationsEnabled ? '🔔' : '🔕'}</span>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white uppercase">Notifications</p>
                    <p className="text-[10px] text-gray-500">{formData.notificationsEnabled ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${formData.notificationsEnabled ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gray-600'}`} />
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                <span className="text-lg">🔒</span>
                <div className="text-left">
                  <p className="text-xs font-bold text-white uppercase group-hover:text-emerald-400 transition-colors">Change Password</p>
                  <p className="text-[10px] text-gray-500">Security & Credentials</p>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
