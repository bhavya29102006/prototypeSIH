import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  Plus,
  Calendar,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

export const CorporateTrainingHub = () => {
  const { trainingPrograms, notify } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Quick state for posting a new program
  const [title, setTitle] = useState('');
  const [targetGap, setTargetGap] = useState('Docker & Containerization, Cloud Architecture');
  const [duration, setDuration] = useState('3 Weeks • Capstone Track');
  const [incentive, setIncentive] = useState('Direct PPO Interview for top 10% scorers');

  const handleCreate = (e) => {
    e.preventDefault();
    notify(`Training Program "${title}" published to college student cohorts!`, 'success');
    setShowCreateModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
            Talent Pipeline Pre-Conditioning
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Corporate Sponsored Training Programs
          </h2>
          <p className="text-xs text-slate-500">
            Don't wait for colleges to update old syllabi. Train students on your specific tech stack before graduation.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-100 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Training Track</span>
        </button>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainingPrograms.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {prog.tag}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {prog.company}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {prog.title}
                </h3>
                <div className="text-xs text-indigo-600 font-semibold mt-1">
                  Targeted Skill Gaps: <span className="font-mono text-slate-700">{prog.targetGap}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                <div className="text-slate-500 font-medium">Student Incentive & Outcome:</div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  {prog.incentive}
                </div>
              </div>

              {/* Progress and Cohort Stats */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <div className="text-lg font-black text-emerald-900">{prog.studentsEnrolled}</div>
                  <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" />
                    Students Enrolled
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-100">
                  <div className="text-lg font-black text-indigo-900">{prog.completionRate}</div>
                  <div className="text-[11px] text-indigo-700 font-medium flex items-center gap-1 mt-0.5">
                    <TrendingUp className="w-3 h-3" />
                    Completion Rate
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">
                {prog.duration}
              </span>
              <button
                onClick={() => notify(`Downloaded live cohort assessment analytics for ${prog.title}`, 'info')}
                className="text-emerald-700 font-bold hover:underline"
              >
                View Assessment Roster →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creating New Program */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Post Corporate Upskilling Track</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Track Title</label>
                <input
                  type="text"
                  placeholder="e.g. Real-Time Distributed Telemetry Lab"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Skill Competencies</label>
                <input
                  type="text"
                  value={targetGap}
                  onChange={e => setTargetGap(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Duration & Format</label>
                <input
                  type="text"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hiring Incentive / Reward</label>
                <input
                  type="text"
                  value={incentive}
                  onChange={e => setIncentive(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                >
                  Publish Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
