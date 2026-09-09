import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Lock,
  Mail,
  User,
  School,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, handleLogin, handleRegister, currentUser } = useApp();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('aarav.sharma@nexus.edu');
  const [loginPassword, setLoginPassword] = useState('demo123');
  const [loginRole, setLoginRole] = useState('student');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('demo123');
  const [regCollege, setRegCollege] = useState('Apex Institute of Technology');
  const [regRole, setRegRole] = useState('Full-Stack Software Engineer');

  if (!isAuthModalOpen) return null;

  const onQuickDemoLogin = async (roleName, email) => {
    setLoading(true);
    await handleLogin({ email, password: 'demo123', role: roleName });
    setLoading(false);
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleLogin({
      email: loginEmail,
      password: loginPassword,
      role: loginRole
    });
    setLoading(false);
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleRegister({
      name: regName || 'Bhavya Garg',
      email: regEmail || `bhavya.${Date.now().toString().slice(-4)}@nexus.edu`,
      password: regPassword || 'demo123',
      college: regCollege,
      department: 'Computer Science & Engineering',
      targetRole: regRole
    });
    setLoading(false);
  };

  const autoFillNewStudent = () => {
    setRegName('Bhavya Garg');
    setRegEmail(`bhavya.${Math.floor(100 + Math.random() * 900)}@nexus.edu`);
    setRegPassword('demo123');
    setRegCollege('Apex Institute of Technology');
    setRegRole('Full-Stack Software Engineer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                SkillSync Nexus <span className="text-indigo-400 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/50">Auth Gateway</span>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Live Express Backend Authentication (`/api/auth`)
              </p>
            </div>
          </div>

          {/* Quick Demo One-Click Access */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 mb-2">
              <UserCheck className="w-3.5 h-3.5" />
              1-Click Demo Login (Instant Access)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => onQuickDemoLogin('student', 'aarav.sharma@nexus.edu')}
                className="px-2 py-1.5 rounded-lg bg-white/10 hover:bg-indigo-600/60 border border-white/15 text-[11px] font-bold text-white transition-all text-center"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => onQuickDemoLogin('industry', 'recruiter@techcorp.io')}
                className="px-2 py-1.5 rounded-lg bg-white/10 hover:bg-emerald-600/60 border border-white/15 text-[11px] font-bold text-white transition-all text-center"
              >
                💼 Recruiter
              </button>
              <button
                type="button"
                onClick={() => onQuickDemoLogin('faculty', 'faculty@nexus.edu')}
                className="px-2 py-1.5 rounded-lg bg-white/10 hover:bg-purple-600/60 border border-white/15 text-[11px] font-bold text-white transition-all text-center"
              >
                📚 Faculty
              </button>
              <button
                type="button"
                onClick={() => onQuickDemoLogin('institution', 'dean@apex.edu')}
                className="px-2 py-1.5 rounded-lg bg-white/10 hover:bg-amber-600/60 border border-white/15 text-[11px] font-bold text-white transition-all text-center"
              >
                🏛️ Dean
              </button>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 pt-3">
          <button
            onClick={() => setTab('login')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              tab === 'login'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In to Account
          </button>
          <button
            onClick={() => setTab('register')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              tab === 'register'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Register Student (New Profile)
          </button>
        </div>

        {/* Forms Body */}
        <div className="p-6">
          {tab === 'login' ? (
            <form onSubmit={onLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Role / Portal
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['student', 'industry', 'faculty', 'institution'].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setLoginRole(r)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold capitalize border transition-all ${
                        loginRole === r
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                    placeholder="student@nexus.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Verified via Express API :5000
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={onRegisterSubmit} className="space-y-3.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs text-slate-500">Fast Hackathon Testing:</span>
                <button
                  type="button"
                  onClick={autoFillNewStudent}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  ⚡ Auto-Fill Demo Student
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                    placeholder="e.g. Bhavya Garg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                      placeholder="bhavya@nexus.edu"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  College / University
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={regCollege}
                    onChange={(e) => setRegCollege(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                    placeholder="Apex Institute of Technology"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Specialization Track
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium bg-white"
                  >
                    <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                    <option value="Cloud & Platform DevOps">Cloud & Platform DevOps</option>
                    <option value="AI & Machine Learning Engineer">AI & Machine Learning Engineer</option>
                    <option value="Data Engineer & Analytics">Data Engineer & Analytics</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  Auto-creates verified ledger & baseline skills
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Register & Connect'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
