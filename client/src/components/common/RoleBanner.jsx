import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Briefcase, BookOpen, School, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const RoleBanner = () => {
  const { role } = useApp();

  const roleMeta = {
    student: {
      title: 'Student Growth & Verification Hub',
      badge: 'Continuous Career Readiness',
      description: 'Take dynamic skill quizzes early in college, pinpoint exact gaps against industry benchmarks, and build a verified digital portfolio that recruiters trust over paper resumes.',
      colorTheme: 'from-indigo-900 via-indigo-800 to-slate-900',
      badgeColor: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',
      icon: GraduationCap,
      accent: 'indigo'
    },
    industry: {
      title: 'Industry Recruitment & Benchmark Hub',
      badge: 'Zero Resume Noise • 100% Verified Skills',
      description: 'Define exact skill benchmarks, auto-match with vetted candidates backed by proctored assessments, and post corporate training to prepare students for your open positions.',
      colorTheme: 'from-emerald-950 via-teal-900 to-slate-900',
      badgeColor: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
      icon: Briefcase,
      accent: 'emerald'
    },
    faculty: {
      title: 'Academician & Industry Collaboration Hub',
      badge: 'Curriculum-to-Industry Alignment',
      description: 'Discover live industry problem statements, secure corporate consultancy grants, co-mentor classroom projects with tech leaders, and attend sponsored faculty bootcamps.',
      colorTheme: 'from-purple-950 via-violet-900 to-slate-900',
      badgeColor: 'bg-purple-500/20 text-purple-200 border-purple-400/30',
      icon: BookOpen,
      accent: 'purple'
    },
    institution: {
      title: 'Institutional Dean & Accreditation Dashboard',
      badge: 'Batch-Wide Placement Intelligence',
      description: 'Get actionable data-driven insights into cohort-wide competencies, department placement readiness, and identify critical syllabus topics lagging behind market demand.',
      colorTheme: 'from-amber-950 via-slate-900 to-slate-950',
      badgeColor: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
      icon: School,
      accent: 'amber'
    }
  };

  const current = roleMeta[role] || roleMeta.student;
  const Icon = current.icon;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${current.colorTheme} text-white p-6 sm:p-8 shadow-xl mb-8 border border-white/10`}>
      {/* Background Decorative Glow */}
      <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${current.badgeColor}`}>
              <Icon className="w-3.5 h-3.5" />
              {current.badge}
            </span>
            <span className="text-xs text-white/50 font-mono hidden sm:inline">• Live Active Persona</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            {current.title}
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
            {current.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner">
            <Icon className="w-8 h-8 text-white/90" />
          </div>
        </div>
      </div>
    </div>
  );
};
