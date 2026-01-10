
import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';

interface AuthFormProps {
  onLogin: (user: UserProfile) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    affiliation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const newUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: isLogin ? (role === UserRole.STUDENT ? 'Alex Rivera' : 'Sarah Chen') : formData.name,
      email: formData.email,
      role: role,
      skills: role === UserRole.STUDENT ? ['React', 'TypeScript'] : ['Product Strategy'],
      avatar: `https://images.unsplash.com/photo-${role === UserRole.STUDENT ? '1539571696357-5a69c17a67c6' : '1494790108377-be9c29b29330'}?w=200&h=200&fit=crop`,
      affiliation: formData.affiliation || (role === UserRole.BUSINESS ? 'Nexus Labs' : 'State University'),
      isVerified: role !== UserRole.BUSINESS, 
      joinedAt: Date.now(),
      visibility: 'PUBLIC',
      notificationsEnabled: true,
      ojtStatus: role === UserRole.STUDENT ? 'SEARCHING' : undefined,
      companyStatus: role === UserRole.BUSINESS ? 'HIRING' : undefined,
      bio: role === UserRole.STUDENT ? 'Passionate software engineering student looking for challenges.' : 'Leading innovation in the tech sector.'
    };
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            <span className="text-black text-3xl font-black">M</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">MapMyOJT</h1>
          <p className="text-gray-500 font-medium">Personal and clear OJT discovery</p>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="flex bg-white/5 rounded-xl p-1 mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${isLogin ? 'bg-emerald-500 text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${!isLogin ? 'bg-emerald-500 text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-3 gap-2 mb-6">
                {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(UserRole[r])}
                    className={`py-2 px-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border transition-all ${role === UserRole[r] ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'glass border-white/5 text-gray-500'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Full Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-emerald-500/50 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Email Address</label>
              <input 
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-emerald-500/50 outline-none transition-all"
                placeholder="name@university.edu"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Password</label>
              <input 
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-emerald-500/50 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Affiliation (School/Company)</label>
                <input 
                  type="text"
                  required
                  value={formData.affiliation}
                  onChange={e => setFormData({...formData, affiliation: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-emerald-500/50 outline-none transition-all"
                  placeholder={role === UserRole.BUSINESS ? "Nexus Labs" : "State University"}
                />
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 uppercase tracking-widest text-xs"
            >
              {isLogin ? 'Enter Console' : 'Complete Registration'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <a href="#" className="text-xs text-emerald-400/60 hover:text-emerald-400 font-bold tracking-widest uppercase transition-all">Forgot Credentials?</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
