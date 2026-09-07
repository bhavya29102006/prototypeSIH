import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TalentMatcher } from './TalentMatcher';
import { CorporateTrainingHub } from './CorporateTrainingHub';
import { JobPostingModal } from './JobPostingModal';
import {
  Briefcase,
  Users,
  Award,
  GraduationCap,
  Plus,
  TrendingUp,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const IndustryDashboard = () => {
  const { jobs, candidates, trainingPrograms } = useApp();
  const [activeTab, setActiveTab] = useState('matcher'); // 'matcher' | 'jobs' | 'training'
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Recruiter Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{jobs.length}</div>
            <div className="text-xs text-slate-500 font-semibold">Active Openings</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{candidates.length}</div>
            <div className="text-xs text-slate-500 font-semibold">Vetted Candidates</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">100%</div>
            <div className="text-xs text-slate-500 font-semibold">Verified Assessments</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{trainingPrograms.length}</div>
            <div className="text-xs text-slate-500 font-semibold">Active Bootcamps</div>
          </div>
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('matcher')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'matcher'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Auto-Match Candidate Ranker</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'jobs'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage Roles ({jobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('training')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'training'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Corporate Bootcamps ({trainingPrograms.length})</span>
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-100 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Benchmark Opening</span>
        </button>
      </div>

      {/* Sub Views */}
      {activeTab === 'matcher' && (
        <TalentMatcher />
      )}

      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    {job.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {job.id}</span>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{job.title}</h3>
                  <p className="text-xs text-slate-500">{job.company} • {job.location} • {job.stipend}</p>
                </div>
                <div className="text-xs text-slate-600">
                  Applicants Vetted: <strong className="text-slate-900">{job.applicantsCount}</strong> • Threshold: <strong className="text-emerald-700">≥{job.verifiedMatchThreshold}% verified score</strong>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Deadline: {job.deadline}</span>
                  <button
                    onClick={() => setActiveTab('matcher')}
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    View Ranked Candidates →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'training' && (
        <CorporateTrainingHub />
      )}

      {/* Modal */}
      <JobPostingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
