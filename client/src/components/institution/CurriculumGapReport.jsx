import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  FileSpreadsheet,
  Download,
  Sparkles,
  TrendingDown,
  CheckCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export const CurriculumGapReport = () => {
  const { institutionData, notify } = useApp();
  const { curriculumSkillGaps } = institutionData;

  const handleExport = () => {
    notify('Academic Council Curriculum Gap Report (PDF/Excel) downloaded.', 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
            Syllabus Alignment Intelligence
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Industry Demand vs College Syllabus Coverage
          </h2>
          <p className="text-xs text-slate-500">
            Automated syllabus audit comparing university textbook topics against verified requirements in 200+ partner job descriptions.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Academic Council Dossier</span>
        </button>
      </div>

      {/* Critical Gaps Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-900">
              High-Severity Curriculum Gaps Flagged Across Batch 2025
            </h3>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
            4 Urgent Revisions Required
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 pl-6">Competency Area</th>
                <th className="p-4 text-center">Industry Demand</th>
                <th className="p-4 text-center">Curriculum Taught</th>
                <th className="p-4 text-center">Deficit Gap</th>
                <th className="p-4">Academic Remediation Recommendation</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {curriculumSkillGaps.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>{item.skill}</span>
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {item.industryDemandPercentage}%
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <span className="font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.collegeCurriculumTaughtPercentage}%
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <span className="font-mono font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      -{item.gapPercentage}%
                    </span>
                  </td>

                  <td className="p-4 max-w-md">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600 leading-snug">
                        {item.recommendation}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 pr-6 text-right whitespace-nowrap">
                    <button
                      onClick={() => notify(`Remediation task created for Department Head: ${item.skill}`, 'success')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      Assign to HOD →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision-Making Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-slate-50 to-amber-50 border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900">
              Transforming Board of Studies (BOS) Decision Making
            </h4>
            <p className="text-slate-600">
              Instead of relying on multi-year textbook publication cycles, college curriculum committees can now adjust laboratory syllabi semester-by-semester using real hiring telemetry.
            </p>
          </div>
        </div>

        <button
          onClick={() => notify('Automated Board of Studies syllabus update draft generated.', 'success')}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shrink-0 transition-all shadow-xs"
        >
          Draft BOS Syllabus Revision
        </button>
      </div>
    </div>
  );
};
