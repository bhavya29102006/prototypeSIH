import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  ChevronRight,
  Filter
} from 'lucide-react';

// Explainable AI (XAI) Match Rationale Generator
const getJobXAIExplanation = (studentSkills, reqSkills, matchScore) => {
  const reqEntries = Object.entries(reqSkills || {});
  if (reqEntries.length === 0) {
    return "Matched on foundational software development and problem-solving benchmarks.";
  }

  const strongMatches = [];
  const gaps = [];

  for (const [skill, reqVal] of reqEntries) {
    const studentVal = studentSkills[skill] || 0;
    if (studentVal >= reqVal) {
      strongMatches.push({ skill, surplus: studentVal - reqVal });
    } else {
      gaps.push({ skill, deficit: reqVal - studentVal, reqVal, studentVal });
    }
  }

  strongMatches.sort((a, b) => b.surplus - a.surplus);
  gaps.sort((a, b) => b.deficit - a.deficit);

  if (matchScore >= 75) {
    if (gaps.length === 0) {
      return "Direct Top Fit: Your verified assessment scores exceed every single technical benchmark required for this role.";
    }
    const topMatchNames = strongMatches.slice(0, 2).map(m => m.skill).join(' & ');
    return `Strong Match: Your verified proficiency in ${topMatchNames} meets or exceeds requirements. Bridging ${gaps[0].skill} by ${gaps[0].deficit}% will make your application top 5% competitive.`;
  } else if (matchScore >= 50) {
    const gapNames = gaps.slice(0, 2).map(g => `${g.skill} (-${g.deficit}%)`).join(', ');
    return `Moderate Match: Strong foundational scores, but requires upskilling in: ${gapNames}. Consider taking the targeted skill bridge module.`;
  } else {
    return `Growth Role: Significant skill gaps identified in ${gaps.slice(0, 2).map(g => g.skill).join(' and ')}. Focus on foundational projects before applying.`;
  }
};

export const StudentJobs = () => {
  const { student, jobs, applyToJob, calculateMatchScore, trainingPrograms } = useApp();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'high_match' | 'internship'

  const appliedList = student?.appliedJobs || student?.applied_jobs || [];
  const studentSkills = student?.skills || {};

  const jobMatches = (jobs || []).map(job => {
    const reqSkills = job.requiredSkills || job.required_skills || {};
    const score = calculateMatchScore(studentSkills, reqSkills);
    const hasApplied = appliedList.some(a => a.jobId === job.id);
    const application = appliedList.find(a => a.jobId === job.id);

    return {
      ...job,
      requiredSkills: reqSkills,
      matchScore: score,
      hasApplied,
      applicationStatus: application ? application.status : null
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const filtered = jobMatches.filter(job => {
    if (filterType === 'high_match') return job.matchScore >= 75;
    if (filterType === 'internship') return job.type.toLowerCase().includes('internship');
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and Filter Control */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            Intelligent Matcher
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Matched Internships & Career Opportunities
          </h2>
          <p className="text-xs text-slate-500">
            Ranked by your authenticated skill score rather than resume keywords.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Roles ({jobs.length})
          </button>
          <button
            onClick={() => setFilterType('high_match')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'high_match'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Top Match (≥75%)
          </button>
          <button
            onClick={() => setFilterType('internship')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'internship'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Internships
          </button>
        </div>
      </div>

      {/* Corporate Sponsored Training Alert */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-2xl border border-indigo-700/50 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Corporate Direct-Hire Upskilling
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-white">
            {trainingPrograms[0].title}
          </h3>
          <p className="text-xs text-indigo-200">
            Sponsored by <strong>{trainingPrograms[0].company}</strong> • {trainingPrograms[0].incentive}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-indigo-300">Targeting Gap</div>
            <div className="text-xs font-bold text-white font-mono">{trainingPrograms[0].targetGap}</div>
          </div>
          <span className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-extrabold shadow-sm">
            Enrolled (Auto-Tracked)
          </span>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((job) => {
          const isHighMatch = job.matchScore >= 75;
          const isMediumMatch = job.matchScore >= 50 && job.matchScore < 75;

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Company & Role Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl border border-slate-200">
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {job.title}
                      </h3>
                      <div className="text-xs font-bold text-slate-500 mt-0.5">
                        {job.company}
                      </div>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className={`p-2.5 rounded-xl border text-center shrink-0 min-w-[76px] ${
                    isHighMatch
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isMediumMatch
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    <div className="text-xs font-semibold leading-none">Fit Score</div>
                    <div className="text-base font-black leading-tight mt-0.5">
                      {job.matchScore}%
                    </div>
                  </div>
                </div>

                {/* Job Details Pill Row */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-bold text-emerald-700">
                    💰 {job.stipend}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Deadline: {job.deadline}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* Required Skills Match Comparison */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-700">
                    Verified Competency Alignment:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(job.requiredSkills || job.required_skills || {}).map(([skill, reqLevel]) => {
                      const studentVal = (student?.skills && student.skills[skill]) || 0;
                      const meets = studentVal >= reqLevel;

                      return (
                        <span
                          key={skill}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                            meets
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          {meets ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> : <AlertCircle className="w-2.5 h-2.5 text-rose-500" />}
                          <span>{skill}</span>
                          <span className="opacity-75">({studentVal}/{reqLevel}%)</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Explainable AI (XAI) Match Rationale */}
                <div className="bg-indigo-50/70 rounded-xl p-3.5 border border-indigo-100/90 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-extrabold text-indigo-950">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>AI Recommendation Rationale (XAI)</span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                      Transparent Fit
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-900 leading-relaxed">
                    {getJobXAIExplanation(studentSkills, job.requiredSkills, job.matchScore)}
                  </p>
                </div>

                {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {job.applicantsCount} Verified Applicants
                </span>

                {job.hasApplied ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {job.applicationStatus || 'Applied'}
                  </span>
                ) : (
                  <button
                    onClick={() => applyToJob(job.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-100 transition-all"
                  >
                    <span>One-Click Verified Apply</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
