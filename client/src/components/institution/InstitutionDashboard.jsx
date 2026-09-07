import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstitutionOverview } from './InstitutionOverview';
import { CurriculumGapReport } from './CurriculumGapReport';
import { StudentDirectory } from './StudentDirectory';
import {
  TrendingUp,
  AlertTriangle,
  Users,
  School,
  FileSpreadsheet
} from 'lucide-react';

export const InstitutionDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'curriculum' | 'students'

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white p-1 rounded-2xl shadow-xs overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Macro Placement Intelligence</span>
        </button>

        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'curriculum'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Syllabus vs Industry Demand Report</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'students'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Batch Cohort Directory</span>
        </button>
      </div>

      {/* Panels */}
      {activeTab === 'overview' && (
        <InstitutionOverview
          onNavigateToCurriculum={() => setActiveTab('curriculum')}
          onNavigateToStudents={() => setActiveTab('students')}
        />
      )}

      {activeTab === 'curriculum' && (
        <CurriculumGapReport />
      )}

      {activeTab === 'students' && (
        <StudentDirectory />
      )}
    </div>
  );
};
