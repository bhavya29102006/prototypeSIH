import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  Building2,
  ExternalLink
} from 'lucide-react';

export const FacultyUpskilling = () => {
  const { notify } = useApp();

  const fdpList = [
    {
      id: 'fdp-1',
      title: 'Generative AI & LLM Systems: Advanced Engineering for Academicians',
      sponsor: 'Veloce AI Labs',
      duration: '2 Weeks • Interactive Live Masterclasses',
      dates: 'Oct 01 - Oct 15, 2026',
      accreditation: 'AICTE / IEEE Recognized Faculty Certificate',
      stipendSponsor: 'Fully Sponsored + 500 Lab Cloud GPU Hours',
      seatsRemaining: '12 Seats Open',
      topics: ['Transformer Architectures', 'RAG Pipelines & Vector Embeddings', 'Model Evaluation & Alignment']
    },
    {
      id: 'fdp-2',
      title: 'Cloud Native Microservices & Kubernetes in the College Lab',
      sponsor: 'CloudScale Technologies & AWS Academy',
      duration: '10 Days • Hands-on Lab Setup Workshop',
      dates: 'Nov 05 - Nov 15, 2026',
      accreditation: 'Certified Cloud Academia Educator',
      stipendSponsor: 'AWS \$2,000 Institutional Credits Included',
      seatsRemaining: '8 Seats Open',
      topics: ['Docker Multi-stage Builds', 'Kubernetes Pod Networking', 'CI/CD Automated Grading Bots']
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
            Continuous Faculty Development
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Industry Sponsored Faculty Training
          </h2>
          <p className="text-xs text-slate-500">
            Keep your domain knowledge aligned with modern tech so your classroom teaching never lags behind.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fdpList.map((fdp) => (
          <div
            key={fdp.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  {fdp.sponsor}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {fdp.seatsRemaining}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {fdp.title}
              </h3>

              <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 text-xs space-y-1">
                <div className="text-purple-800 font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-600" />
                  {fdp.accreditation}
                </div>
                <div className="text-purple-700 text-[11px]">
                  {fdp.stipendSponsor}
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="text-[11px] font-bold text-slate-700">Curriculum Highlights:</div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {fdp.topics.map((t, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-purple-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {fdp.dates}
              </span>
              <button
                onClick={() => notify(`Enrolled in "${fdp.title}"! Course materials sent to your faculty email.`, 'success')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-xs"
              >
                Enroll in Program
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
