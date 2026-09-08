import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkillGapAnalyzer } from './SkillGapAnalyzer';
import { SkillQuiz } from './SkillQuiz';
import { VerifiedPortfolio } from './VerifiedPortfolio';
import { StudentJobs } from './StudentJobs';
import { ResumeSkillExtractor } from './ResumeSkillExtractor';
import {
  Compass,
  FileBadge,
  Sparkles,
  Briefcase,
  Layers,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';

export const StudentDashboard = () => {
  const { student, jobs } = useApp();
  const [activeTab, setActiveTab] = useState('gap'); // 'gap' | 'quiz' | 'portfolio' | 'jobs'

  const studentSkills = student?.skills || {};
  const studentSkillsCount = Object.keys(studentSkills).length;
  const readySkillsCount = Object.values(studentSkills).filter(v => v >= 75).length;
  const readinessScoreVal = student?.readinessScore ?? student?.readiness_score ?? 0;
  const verifiedProjectsCount = (student?.verifiedProjects || student?.verified_projects || []).length;
  const matchedJobsCount = (jobs || []).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{readinessScoreVal}%</div>
            <div className="text-xs text-slate-500 font-semibold">Career Readiness Score</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{readySkillsCount} / {studentSkillsCount}</div>
            <div className="text-xs text-slate-500 font-semibold">Industry-Ready Skills</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <FileBadge className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{verifiedProjectsCount}</div>
            <div className="text-xs text-slate-500 font-semibold">Verified Projects Tracked</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{matchedJobsCount}</div>
            <div className="text-xs text-slate-500 font-semibold">Matched Openings</div>
          </div>
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="flex border-b border-slate-200 bg-white p-1 rounded-2xl shadow-xs overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('gap')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'gap'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Skill Gap Analyzer (Radar)</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Take Skill Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'portfolio'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileBadge className="w-4 h-4" />
          <span>Verified Digital Portfolio</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'jobs'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Matched Internships & Jobs ({jobs.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'gap' && (
        <SkillGapAnalyzer onStartQuiz={() => setActiveTab('quiz')} />
      )}

      {activeTab === 'quiz' && (
        <SkillQuiz onFinished={() => setActiveTab('gap')} />
      )}

            {activeTab === 'resume' && (
        <ResumeSkillExtractor onNavigateToRadar={() => setActiveTab('gap')} />
      )}

      {activeTab === 'portfolio' && (
        <VerifiedPortfolio />
      )}

      {activeTab === 'jobs' && (
        <StudentJobs />
      )}
    </div>
  );
};
