import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  School,
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const Navbar = () => {
  const { role, setRole, student, resetAllData, isLiveBackend } = useApp();

  const roleConfigs = [
    {
      id: 'student',
      label: 'Student Portal',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
      activeBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 'industry',
      label: 'Industry / Recruiter',
      icon: Briefcase,
      color: 'from-emerald-600 to-teal-600',
      activeBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'faculty',
      label: 'Academician / Faculty',
      icon: BookOpen,
      color: 'from-violet-600 to-purple-600',
      activeBadge: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'institution',
      label: 'Institution / Dean',
      icon: School,
      color: 'from-amber-600 to-orange-600',
      activeBadge: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  SkillSync <span className="text-indigo-600 font-black">Nexus</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-indigo-500" />
                  Verified Bridge
                </span>
                {isLiveBackend && (
                  <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Express API :5000
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                Connecting Students, Industry, Faculty & Institutions
              </p>
            </div>
          </div>

          {/* Interactive Persona Switcher Tabs */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 shadow-inner overflow-x-auto">
            {roleConfigs.map((config) => {
              const Icon = config.icon;
              const isActive = role === config.id;
              return (
                <button
                  key={config.id}
                  onClick={() => setRole(config.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-extrabold scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Tools & Profile */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={resetAllData}
              title="Reset Demo Data"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-semibold border border-transparent hover:border-slate-200 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Reset State</span>
            </button>

            {role === 'student' && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-8 h-8 rounded-full ring-2 ring-indigo-500/30 object-cover"
                />
                <div className="hidden xl:block text-left text-xs">
                  <div className="font-bold text-slate-800 leading-tight">{student.name}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {student.readinessScore}% Ready
                  </div>
                </div>
              </div>
            )}

            {role === 'industry' && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Recruiter Portal
              </div>
            )}

            {role === 'faculty' && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                Academician Hub
              </div>
            )}

            {role === 'institution' && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Apex Inst. Dean
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
