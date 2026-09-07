import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
  Award,
  Building2,
  ArrowUpRight,
  ShieldCheck,
  School
} from 'lucide-react';

export const InstitutionOverview = ({ onNavigateToCurriculum, onNavigateToStudents }) => {
  const { institutionData } = useApp();
  const {
    collegeName,
    totalStudents,
    batch,
    placementReadinessIndex,
    placedCount,
    placedPercentage,
    readyForPlacementCount,
    readyPercentage,
    needsBridgingCount,
    needsBridgingPercentage,
    highRiskCount,
    highRiskPercentage,
    departmentBreakdown
  } = institutionData;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner with Readiness Gauge */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              Executive Institutional Intelligence
            </span>
            <span className="text-xs text-slate-500 font-medium">• {batch}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {collegeName}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Real-time batch telemetry aggregated across <strong>{totalStudents} final-year students</strong>. Every student's skill readiness is dynamically scored from verified code tests and capstones.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={onNavigateToCurriculum}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-100 transition-all flex items-center gap-1.5"
            >
              <span>View Curriculum Gap Alerts</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateToStudents}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
            >
              Inspect At-Risk Student Cohort
            </button>
          </div>
        </div>

        {/* Big Placement Readiness Gauge Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center min-w-[240px] shrink-0">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-300">
            Batch Readiness Index
          </div>

          <div className="relative my-3 flex items-center justify-center">
            <svg width="120" height="120" className="rotate-[-90deg]">
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="#1e293b"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="#6366f1"
                strokeWidth="10"
                fill="none"
                strokeDasharray="301"
                strokeDashoffset={301 - (301 * placementReadinessIndex) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white">{placementReadinessIndex}%</span>
              <span className="text-[10px] text-emerald-400 font-bold">+12% vs last yr</span>
            </div>
          </div>

          <div className="text-xs text-slate-300 font-medium max-w-[180px]">
            {placedCount + readyForPlacementCount} of {totalStudents} Students Placement-Ready
          </div>
        </div>
      </div>

      {/* Cohort Readiness Funnel */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Batch Placement Readiness Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Categorized into 4 actionable tiers based on authenticated skill profiles
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
            Total Batch: {totalStudents}
          </span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
          <div
            className="bg-emerald-500 h-full transition-all"
            style={{ width: `${placedPercentage}%` }}
            title={`Placed: ${placedPercentage}%`}
          />
          <div
            className="bg-indigo-500 h-full transition-all"
            style={{ width: `${readyPercentage}%` }}
            title={`Ready: ${readyPercentage}%`}
          />
          <div
            className="bg-amber-400 h-full transition-all"
            style={{ width: `${needsBridgingPercentage}%` }}
            title={`Needs Bridging: ${needsBridgingPercentage}%`}
          />
          <div
            className="bg-rose-500 h-full transition-all"
            style={{ width: `${highRiskPercentage}%` }}
            title={`High Risk: ${highRiskPercentage}%`}
          />
        </div>

        {/* 4 Cards Breakdown */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">1. Placed</span>
              <span className="text-xs font-mono font-bold text-emerald-900">{placedPercentage}%</span>
            </div>
            <div className="text-2xl font-black text-emerald-950 mt-1">{placedCount}</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">Offer Letters Verified</div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-800">2. Interview Ready</span>
              <span className="text-xs font-mono font-bold text-indigo-900">{readyPercentage}%</span>
            </div>
            <div className="text-2xl font-black text-indigo-950 mt-1">{readyForPlacementCount}</div>
            <div className="text-[11px] text-indigo-700 mt-0.5">Skill Fit &gt;75% for Roles</div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">3. Needs Bridging</span>
              <span className="text-xs font-mono font-bold text-amber-900">{needsBridgingPercentage}%</span>
            </div>
            <div className="text-2xl font-black text-amber-950 mt-1">{needsBridgingCount}</div>
            <div className="text-[11px] text-amber-700 mt-0.5">1-2 Specific Gaps (Docker/APIs)</div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800">4. High Risk Gap</span>
              <span className="text-xs font-mono font-bold text-rose-900">{highRiskPercentage}%</span>
            </div>
            <div className="text-2xl font-black text-rose-950 mt-1">{highRiskCount}</div>
            <div className="text-[11px] text-rose-700 mt-0.5">Urgent Remediation Required</div>
          </div>
        </div>
      </div>

      {/* Department Comparison Cards */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Departmental Placement & Skill Health
            </h3>
            <p className="text-xs text-slate-500">
              Compare average student verified score and placement conversion across branches
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentBreakdown.map((dept) => {
            const placementRate = Math.round((dept.placed / dept.total) * 100);

            return (
              <div
                key={dept.department}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3"
              >
                <div className="text-xs font-extrabold text-slate-900 leading-snug">
                  {dept.department}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Avg Skill Score</span>
                    <span className="font-mono font-bold text-indigo-600">{dept.avgSkillScore}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Placement Rate</span>
                    <span className="font-mono font-bold text-emerald-600">{placementRate}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">At-Risk Students</span>
                    <span className="font-mono font-bold text-rose-600">{dept.atRisk}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-400">
                  <span>Cohort: {dept.total} Students</span>
                  <span>{dept.placed} Placed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
