import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  DollarSign,
  Clock,
  Building2,
  CheckCircle2,
  Send,
  Sparkles,
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';

export const CollaborationBoard = () => {
  const { collaborations, applyForCollaboration, notify } = useApp();
  const [selectedType, setSelectedType] = useState('all');
  const [activeRfp, setActiveRfp] = useState(null);
  const [proposalText, setProposalText] = useState('');

  const filtered = collaborations.filter(item => {
    if (selectedType === 'classroom') return item.type.includes('Classroom');
    if (selectedType === 'consultancy') return item.type.includes('Consultancy');
    if (selectedType === 'fdp') return item.type.includes('Faculty');
    return true;
  });

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (!activeRfp) return;

    applyForCollaboration(activeRfp.id);
    setActiveRfp(null);
    setProposalText('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Filter */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
            Industry-Academia Exchange
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Live Industry Collaboration Opportunities
          </h2>
          <p className="text-xs text-slate-500">
            Bring real company problems, consultancy grants, and datasets directly into your college teaching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedType === 'all'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({collaborations.length})
          </button>
          <button
            onClick={() => setSelectedType('classroom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedType === 'classroom'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Live Projects
          </button>
          <button
            onClick={() => setSelectedType('consultancy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedType === 'consultancy'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Consultancy
          </button>
          <button
            onClick={() => setSelectedType('fdp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedType === 'fdp'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Faculty Training
          </button>
        </div>
      </div>

      {/* Collaboration Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((rfp) => (
          <div
            key={rfp.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-5"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                    {rfp.type}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {rfp.company}
                  </span>
                  <span className="text-xs text-slate-400">• Domain: <strong className="text-slate-700">{rfp.domain}</strong></span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {rfp.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200/80 text-right">
                  <div className="text-[10px] uppercase font-bold text-purple-700">Grant / Funding</div>
                  <div className="text-sm font-black text-purple-950">{rfp.sponsorAmount}</div>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {rfp.description}
            </p>

            {/* Deliverables Checklist */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Collaborative Outcomes & Deliverables:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                {rfp.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer and Proposal CTA */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Duration: {rfp.duration}
                </span>
                <span>• {rfp.facultyApplicants} Faculty Proposals Received</span>
              </div>

              <button
                onClick={() => setActiveRfp(rfp)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-sm shadow-purple-100 transition-all shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Collaboration Proposal</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Proposal Submission Modal */}
      {activeRfp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase">Submit Expression of Interest</span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{activeRfp.title}</h3>
              </div>
              <button onClick={() => setActiveRfp(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmitProposal} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Faculty Lead & Department</label>
                <input
                  type="text"
                  disabled
                  value="Prof. Ananya Sen, Ph.D. — Department of Computer Science"
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Proposed Classroom / Lab Integration Plan</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline how you will incorporate this project into your 4th-year laboratory syllabus, how many students will participate, and target completion timeline..."
                  value={proposalText}
                  onChange={e => setProposalText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-900 space-y-1 text-[11px]">
                <strong>SkillSync Verified Guarantee:</strong> Your proposal will be directly routed to the company's University Relations and Engineering Leads.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveRfp(null)}
                  className="px-4 py-2 rounded-xl border text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-sm"
                >
                  Dispatch Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
