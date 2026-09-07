import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Code,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const ClassroomProjectIntegrator = () => {
  const { notify } = useApp();

  const activeCurriculumProjects = [
    {
      id: 'cp-1',
      title: 'CloudScale Distributed Telemetry Laboratory Capstone',
      courseCode: 'CS-401: Distributed Systems Lab',
      semester: '7th Semester B.Tech CSE',
      enrolledStudents: 42,
      industryPartner: 'CloudScale Technologies',
      industryMentor: 'Vikram Sethi (Principal Architect)',
      currentMilestone: 'Milestone 2: Kafka Consumer Lag Profiling',
      progress: 65,
      nextMentorReviewDate: 'Sept 18, 2026'
    },
    {
      id: 'cp-2',
      title: 'FinPulse ACID Concurrency Benchmarking Case Study',
      courseCode: 'CS-302: Advanced Database Management',
      semester: '6th Semester B.Tech IT',
      enrolledStudents: 38,
      industryPartner: 'FinPulse Systems',
      industryMentor: 'Radhika Nair (Staff Engineer)',
      currentMilestone: 'Milestone 1: PostgreSQL Isolation Levels Audit',
      progress: 30,
      nextMentorReviewDate: 'Sept 25, 2026'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
            Real-World Classroom Integration
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Active Industry Co-Taught Capstones
          </h2>
          <p className="text-xs text-slate-500">
            Monitor real-world corporate problem statements directly integrated into regular semester laboratory coursework.
          </p>
        </div>

        <button
          onClick={() => notify('Curriculum integration toolkit and syllabus rubric downloaded.', 'success')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-xs font-bold transition-all shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>Download Syllabus Rubric</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {activeCurriculumProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-5"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {project.courseCode} • {project.semester}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1.5">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Co-Mentored with <strong>{project.industryPartner}</strong> ({project.industryMentor})
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400 font-semibold">Classroom Progress</div>
                <div className="text-2xl font-black text-purple-600">{project.progress}%</div>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <div className="text-slate-400 font-semibold text-[10px] uppercase">Enrolled Students</div>
                <div className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-purple-600" />
                  {project.enrolledStudents} Students in 10 Cohorts
                </div>
              </div>

              <div>
                <div className="text-slate-400 font-semibold text-[10px] uppercase">Active Milestone</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  {project.currentMilestone}
                </div>
              </div>

              <div>
                <div className="text-slate-400 font-semibold text-[10px] uppercase">Next Industry Sync</div>
                <div className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {project.nextMentorReviewDate}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500">
                Automated Git repo grading enabled via SkillSync Webhooks
              </span>
              <button
                onClick={() => notify(`Opening cohort grading matrix for ${project.title}`, 'info')}
                className="text-purple-600 font-bold hover:underline flex items-center gap-1"
              >
                <span>View Student Group Submissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
