import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  Award,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const StudentDirectory = () => {
  const { candidates, notify } = useApp();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');

  const filtered = candidates.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(search.toLowerCase()) ||
                          cand.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'all' || cand.department.toLowerCase() === selectedDept.toLowerCase();
    const matchesTier = selectedTier === 'all' || cand.readinessTier.toLowerCase().includes(selectedTier.toLowerCase());

    return matchesSearch && matchesDept && matchesTier;
  });

  const handleNotifyRemedial = (name) => {
    notify(`Remedial bridging roadmap and lab schedule sent to ${name}!`, 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search & Filter Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Student Cohort Intelligence
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Batch 2025 Student Directory
          </h2>
          <p className="text-xs text-slate-500">
            Track individual competency progression and take proactive action for students needing upskilling.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate or dept..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-48 sm:w-56"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          >
            <option value="all">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="ECE">ECE</option>
          </select>

          {/* Tier Filter */}
          <select
            value={selectedTier}
            onChange={e => setSelectedTier(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          >
            <option value="all">All Readiness Tiers</option>
            <option value="Tier 1">Tier 1 - Job Ready</option>
            <option value="Tier 2">Tier 2 - Needs Upskilling</option>
            <option value="Tier 3">Tier 3 - High Skill Gap</option>
          </select>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 pl-6">Student</th>
                <th className="p-4">Dept & CGPA</th>
                <th className="p-4">Readiness Status</th>
                <th className="p-4">Key Verified Strengths</th>
                <th className="p-4">Verified Proofs</th>
                <th className="p-4 pr-6 text-right">Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filtered.map((cand) => {
                const isTier1 = cand.readinessTier.includes('Tier 1');
                const isTier2 = cand.readinessTier.includes('Tier 2');
                const isTier3 = cand.readinessTier.includes('Tier 3');

                const topSkills = Object.entries(cand.skills)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 2);

                return (
                  <tr key={cand.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <div className="font-extrabold text-slate-900">{cand.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: {cand.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-medium">
                      <div>{cand.department}</div>
                      <div className="text-[10px] text-slate-400">CGPA: <strong className="text-slate-700">{cand.cgpa}</strong></div>
                    </td>

                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        isTier1
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : isTier2
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {isTier1 ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3" />}
                        {cand.readinessTier}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {topSkills.map(([s, score]) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                            {s.split('/')[0]}: {score}%
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="text-[11px] text-slate-600">
                        <strong>{cand.verifiedProjectsCount}</strong> Projects • <strong>{cand.credentialsCount}</strong> Certs
                      </div>
                    </td>

                    <td className="p-4 pr-6 text-right whitespace-nowrap">
                      {isTier3 ? (
                        <button
                          onClick={() => handleNotifyRemedial(cand.name)}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] shadow-xs"
                        >
                          Send Remedial Path
                        </button>
                      ) : isTier2 ? (
                        <button
                          onClick={() => handleNotifyRemedial(cand.name)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] shadow-xs"
                        >
                          Assign Bootcamp
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-bold text-[11px]">
                          Auto-Matched to Openings
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
