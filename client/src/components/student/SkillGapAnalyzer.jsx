import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TARGET_ROLE_BENCHMARKS } from '../../data/mockData';
import { SkillRadarChart } from '../common/SkillRadarChart';
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Target,
  Clock,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const SkillGapAnalyzer = ({ onStartQuiz }) => {
  const { student } = useApp();
  const [selectedRoleId, setSelectedRoleId] = useState(TARGET_ROLE_BENCHMARKS[0].roleId);

  const selectedBenchmark = TARGET_ROLE_BENCHMARKS.find(b => b.roleId === selectedRoleId) || TARGET_ROLE_BENCHMARKS[0];

  // Calculate gaps
  const gapBreakdown = Object.entries(selectedBenchmark.requiredSkills).map(([skill, reqLevel]) => {
    const studentLevel = (student?.skills && student.skills[skill]) || 0;
    const diff = studentLevel - reqLevel;
    const isGap = diff < 0;
    return {
      skill,
      studentLevel,
      reqLevel,
      diff,
      isGap,
      percentageMet: Math.min(100, Math.round((studentLevel / reqLevel) * 100))
    };
  });

  const criticalGaps = gapBreakdown.filter(g => g.diff <= -15);
  const minorGaps = gapBreakdown.filter(g => g.diff < 0 && g.diff > -15);
  const strengths = gapBreakdown.filter(g => g.diff >= 0);

  // Overall match score for this role
  let totalReq = 0;
  let totalStudentCapped = 0;
  gapBreakdown.forEach(g => {
    totalReq += g.reqLevel;
    totalStudentCapped += Math.min(g.studentLevel, g.reqLevel);
  });
  const overallRoleFit = Math.round((totalStudentCapped / totalReq) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Benchmark Selector Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              Benchmark Target Analysis
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              What Are You Preparing For?
            </h2>
            <p className="text-xs text-slate-500">
              Select a target career profile to dynamically compare your verified skills with current industry hiring thresholds.
            </p>
          </div>

          {/* Quick Dropdown / Buttons */}
          <div className="flex flex-wrap gap-2">
            {TARGET_ROLE_BENCHMARKS.map((bench) => (
              <button
                key={bench.roleId}
                onClick={() => setSelectedRoleId(bench.roleId)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedRoleId === bench.roleId
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {bench.title.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Role Meta Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500">{selectedBenchmark.companyExample}</div>
            <div className="text-base font-bold text-slate-900">{selectedBenchmark.title}</div>
            <div className="text-xs text-slate-600 mt-0.5">{selectedBenchmark.description}</div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">Market Package</div>
              <div className="text-sm font-extrabold text-emerald-600">{selectedBenchmark.averagePackage}</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-center min-w-[90px]">
              <div className="text-xs text-slate-500 font-semibold">Your Fit</div>
              <div className={`text-xl font-black ${overallRoleFit >= 75 ? 'text-emerald-600' : overallRoleFit >= 55 ? 'text-amber-600' : 'text-rose-600'}`}>
                {overallRoleFit}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Radar Chart Visualizer */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Skill Competency Radar</h3>
              <p className="text-xs text-slate-500">Overlay: Your Verified Profile vs Industry Requirement</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Live Evaluation
            </span>
          </div>

          <div className="my-4 w-full flex justify-center">
            <SkillRadarChart
              skills={student.skills}
              targetSkills={selectedBenchmark.requiredSkills}
              size={400}
            />
          </div>

          <div className="w-full bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong>Platform Diagnostic:</strong> {selectedBenchmark.gapAnalysisSummary}
            </span>
          </div>
        </div>

        {/* Actionable Gap Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Critical Gaps Alert Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">
                  Target Gaps to Close ({criticalGaps.length + minorGaps.length})
                </h3>
              </div>
              <button
                onClick={onStartQuiz}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
              >
                <span>Take Diagnostic Quiz</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              These are competencies where companies require higher verified mastery. Closing these will qualify you for direct interview auto-matching.
            </p>

            <div className="space-y-3">
              {gapBreakdown.filter(g => g.isGap).map((item) => (
                <div key={item.skill} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{item.skill}</span>
                    <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {item.diff}% Gap
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-indigo-600 h-full rounded-l-full"
                      style={{ width: `${item.studentLevel}%` }}
                      title={`You: ${item.studentLevel}%`}
                    />
                    <div
                      className="bg-amber-400 h-full opacity-40"
                      style={{ width: `${Math.abs(item.diff)}%` }}
                      title={`Gap to reach: ${item.reqLevel}%`}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>Your Verified: <strong className="text-slate-700">{item.studentLevel}%</strong></span>
                    <span>Industry Benchmark: <strong className="text-slate-700">{item.reqLevel}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Strengths */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900">
                Industry-Ready Strengths ({strengths.length})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {strengths.map(s => (
                <span
                  key={s.skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  <span>{s.skill}</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 rounded">
                    {s.studentLevel}%
                  </span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Suggested Curated Roadmap & Bridging Action Plan */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Personalized Learning & Bridging Roadmap
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Custom-tailored actions based directly on your missing competencies for <strong>{selectedBenchmark.title}</strong>.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl">
            Prioritized by Industry Impact
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedBenchmark.suggestedRoadmap.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    item.tag === 'Critical Gap' || item.tag === 'High Priority Gap'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  }`}>
                    {item.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.estimatedHours}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.skill}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.action}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  Free Lab Modules
                </span>
                <button
                  onClick={onStartQuiz}
                  className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                  title="Test Skill"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
