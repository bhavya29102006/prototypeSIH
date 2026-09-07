import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  ExternalLink,
  Award,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  FileBadge,
  Code,
  Calendar,
  Lock,
  Building2,
  Sparkles
} from 'lucide-react';

export const VerifiedPortfolio = () => {
  const { student, notify } = useApp();
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://skillsync-nexus.edu/verify/${student.id}`);
    setCopied(true);
    notify('Verified Portfolio URL copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Portfolio Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl ring-4 ring-indigo-50 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full text-white ring-2 ring-white" title="Verified by SkillSync Engine">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900">{student.name}</h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Student
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {student.department} • {student.college} • {student.batchYear || student.batch_year}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                Trust Hash: <strong className="text-indigo-600">{student.portfolioHash || student.portfolio_hash}</strong>
              </span>
              <span>• CGPA: <strong className="text-slate-700">{student.cgpa}</strong></span>
            </div>
          </div>
        </div>

        {/* Share & Export Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Link Copied' : 'Copy Verified Link'}</span>
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share with Recruiter</span>
          </button>
        </div>
      </div>

      {/* Verified Skills Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileBadge className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Assessed & Cryptographically Verified Competencies
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Updated via automated coding tests & live instructor reviews
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(student?.skills || {}).map(([skill, score]) => (
            <div
              key={skill}
              className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-indigo-300 transition-all space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{skill}</span>
                <span className={`font-mono font-extrabold px-2 py-0.5 rounded text-[11px] ${
                  score >= 75
                    ? 'bg-emerald-100 text-emerald-800'
                    : score >= 50
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {score}%
                </span>
              </div>
              
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    score >= 75 ? 'bg-emerald-500' : score >= 50 ? 'bg-indigo-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  SkillSync Verified
                </span>
                <span>{score >= 75 ? 'Industry Ready' : score >= 50 ? 'Practicing' : 'Foundational'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Real-World Projects Ledger */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Verified Project Artifacts & Code Reviews
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Not just claimed on paper — audited by instructors & company mentors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(student?.verifiedProjects || student?.verified_projects || []).map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    {proj.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {proj.grade}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {proj.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] bg-white border border-slate-200 text-slate-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Verified By
                  </div>
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-indigo-600" />
                    {proj.verifiedBy}
                  </div>
                </div>

                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                >
                  <span>Inspect Code</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Credentials */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            Institutional & Industry Co-Certifications
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(student?.credentials || []).map((cred) => (
            <div
              key={cred.id}
              className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 flex items-start gap-3"
            >
              <div className="p-2.5 rounded-lg bg-indigo-600 text-white shrink-0">
                <FileBadge className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-xs font-extrabold text-slate-900">{cred.title}</div>
                <div className="text-[11px] text-slate-600">Issued by: <strong>{cred.issuer}</strong> ({cred.issuedDate})</div>
                <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-slate-500">
                  <span>ID: {cred.credentialHash}</span>
                  <span className="text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded font-sans font-semibold">
                    {cred.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">Verified Recruiter Access</h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Recruiters opening this link will see your authenticated competencies without needing to review self-written keywords.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-400">Public Trust Link</div>
              <div className="text-xs font-mono text-indigo-700 font-semibold break-all select-all">
                https://skillsync-nexus.edu/verify/{student.id}?sig=0x9a8fe31c
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
