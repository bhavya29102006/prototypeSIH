import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  Send,
  Filter,
  Eye,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Lock
} from 'lucide-react';

export const TalentMatcher = () => {
  const { jobs, candidates, calculateMatchScore, notify } = useApp();
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '');
  const [expandedCandidateId, setExpandedCandidateId] = useState(null);
  const [invitedMap, setInvitedMap] = useState({});

  const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Calculate ranking of all candidates for the currently selected job
  const rankedCandidates = (candidates || []).map(cand => {
    const jobSkills = activeJob?.requiredSkills || activeJob?.required_skills || {};
    const matchScore = calculateMatchScore(cand.skills, jobSkills);
    return {
      ...cand,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const handleSendInvite = (candName) => {
    setInvitedMap(prev => ({ ...prev, [candName]: true }));
    notify(`Interview invitation dispatched to ${candName} via SkillSync Verified Pipe!`, 'success');
  };

  const toggleExpand = (id) => {
    setExpandedCandidateId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Selector & Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            Automated Skill-Fit Ranker
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Verified Candidates for Active Role
          </h2>
          <p className="text-xs text-slate-500">
            No resume keyword fluff. Candidates are ranked based strictly on proctored assessments and verified project code.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-600 shrink-0">Hiring For:</label>
          <select
            value={selectedJobId}
            onChange={e => setSelectedJobId(e.target.value)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title} ({j.company})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Required Skill Thresholds Strip */}
      {activeJob && (
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Evaluating Against Benchmark:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(activeJob?.requiredSkills || activeJob?.required_skills || {}).map(([skill, req]) => (
              <span
                key={skill}
                className="text-[11px] font-mono bg-white/10 px-2.5 py-1 rounded-lg border border-white/15 text-slate-200"
              >
                {skill}: <strong className="text-emerald-400">≥{req}%</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ranked Candidate List */}
      <div className="space-y-4">
        {rankedCandidates.map((candidate, rankIdx) => {
          const isExpanded = expandedCandidateId === candidate.id;
          const isShortlisted = candidate.matchScore >= (activeJob?.verifiedMatchThreshold || 70);
          const hasBeenInvited = !!invitedMap[candidate.name];

          return (
            <div
              key={candidate.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* Summary Header */}
              <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  {/* Rank indicator */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                    rankIdx === 0
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    #{rankIdx + 1}
                  </div>

                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/20"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                        {candidate.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified Skills
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {candidate.department} • {candidate.college} (Class of {candidate.batchYear}) • CGPA: {candidate.cgpa}
                    </p>
                  </div>
                </div>

                {/* Score & Action Buttons */}
                <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400 font-semibold">Verified Match</div>
                    <div className={`text-xl font-black ${
                      isShortlisted ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {candidate.matchScore}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleExpand(candidate.id)}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1"
                      title="Inspect Skills"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Details</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleSendInvite(candidate.name)}
                      disabled={hasBeenInvited}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        hasBeenInvited
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200'
                      }`}
                    >
                      {hasBeenInvited ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Invite Sent</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Invite to Interview</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Drawer */}
              {isExpanded && (
                <div className="bg-slate-50/70 p-5 sm:p-6 border-t border-slate-200 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-700">
                      Evaluated Skill Match vs Role Requirements:
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Trust Hash: 0x{candidate.id.split('-')[1]}...verified
                    </span>
                  </div>

                  {/* Skills comparative bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(activeJob.requiredSkills).map(([skill, benchmark]) => {
                      const candidateLevel = candidate.skills[skill] || 0;
                      const meetsBenchmark = candidateLevel >= benchmark;

                      return (
                        <div key={skill} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{skill}</span>
                            <span className={`font-mono font-bold ${meetsBenchmark ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {candidateLevel}% / {benchmark}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                            <div
                              className={`h-full rounded-full ${meetsBenchmark ? 'bg-emerald-500' : 'bg-amber-500'}`}
                              style={{ width: `${candidateLevel}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-indigo-600" />
                      {candidate.verifiedProjectsCount} Verified Real-World Projects • {candidate.credentialsCount} Faculty Co-Certifications
                    </span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {candidate.readinessTier}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
