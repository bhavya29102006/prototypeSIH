import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';

const COMMON_SKILLS = [
  'JavaScript / TypeScript',
  'React.js',
  'Node.js / Express',
  'REST & GraphQL APIs',
  'SQL & Database Design',
  'Docker & Containerization',
  'Cloud Architecture (AWS/GCP)',
  'CI/CD & DevOps',
  'System Design & Scalability',
  'Professional Communication'
];

export const JobPostingModal = ({ isOpen, onClose }) => {
  const { addJob } = useApp();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('CloudScale Technologies');
  const [logo, setLogo] = useState('⚡');
  const [location, setLocation] = useState('Bengaluru / Hybrid');
  const [type, setType] = useState('Internship -> Full-Time');
  const [stipend, setStipend] = useState('₹40,000 / mo + PPO');
  const [deadline, setDeadline] = useState('Nov 15, 2026');
  const [description, setDescription] = useState('');
  const [matchThreshold, setMatchThreshold] = useState(70);

  const [requiredSkills, setRequiredSkills] = useState({
    'JavaScript / TypeScript': 75,
    'React.js': 75,
    'Node.js / Express': 70
  });

  if (!isOpen) return null;

  const handleSkillThresholdChange = (skill, val) => {
    setRequiredSkills(prev => ({ ...prev, [skill]: parseInt(val, 10) }));
  };

  const handleAddSkillRequirement = (skill) => {
    if (!requiredSkills[skill]) {
      setRequiredSkills(prev => ({ ...prev, [skill]: 70 }));
    }
  };

  const handleRemoveSkillRequirement = (skill) => {
    setRequiredSkills(prev => {
      const copy = { ...prev };
      delete copy[skill];
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    addJob({
      title,
      company,
      logo,
      location,
      type,
      stipend,
      deadline,
      description: description || `Looking for verified ${title} candidates evaluated on real coding benchmarks.`,
      requiredSkills,
      verifiedMatchThreshold: matchThreshold
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified Hiring Architecture
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Post Role with Competency Benchmarks
            </h2>
            <p className="text-xs text-slate-500">
              Set exact verified proficiency requirements. The platform only routes candidates meeting these verified scores.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Role Title</label>
              <input
                type="text"
                placeholder="e.g. Distributed Systems Intern"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Internship -> Full-Time">Internship &rarr; Full-Time</option>
                <option value="6-Month Internship">6-Month Internship</option>
                <option value="Full-Time Graduate">Full-Time Graduate</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Stipend / Package</label>
              <input
                type="text"
                value={stipend}
                onChange={e => setStipend(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Explain project impact, team culture, and core responsibilities..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Skill Benchmark Configurator */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  Required Verified Skill Benchmarks (0 - 100%)
                </div>
                <div className="text-[11px] text-slate-500">
                  Candidates below these thresholds are flagged with bridging roadmaps.
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Auto-Rank Enabled
              </span>
            </div>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {Object.entries(requiredSkills).map(([skill, val]) => (
                <div key={skill} className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 flex-1 truncate">{skill}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="30"
                      max="95"
                      step="5"
                      value={val}
                      onChange={e => handleSkillThresholdChange(skill, e.target.value)}
                      className="w-24 accent-emerald-600"
                    />
                    <span className="text-xs font-mono font-bold text-slate-700 w-10 text-right">{val}%</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkillRequirement(skill)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add more skills picker */}
            <div className="pt-2 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] font-semibold text-slate-400">Add Benchmark:</span>
              {COMMON_SKILLS.filter(s => !requiredSkills[s]).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddSkillRequirement(s)}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white hover:bg-emerald-50 border border-slate-300 text-slate-700 hover:border-emerald-300 transition-all font-medium"
                >
                  <Plus className="w-2.5 h-2.5 text-emerald-600" />
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all"
            >
              Publish & Auto-Match Candidates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
