import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CollaborationBoard } from './CollaborationBoard';
import { ClassroomProjectIntegrator } from './ClassroomProjectIntegrator';
import { FacultyUpskilling } from './FacultyUpskilling';
import {
  BookOpen,
  DollarSign,
  Code,
  Sparkles,
  Users,
  GraduationCap
} from 'lucide-react';

export const FacultyDashboard = () => {
  const { collaborations } = useApp();
  const [activeTab, setActiveTab] = useState('board'); // 'board' | 'projects' | 'upskilling'

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Academician Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{collaborations.length}</div>
            <div className="text-xs text-slate-500 font-semibold">Active Industry RFPs</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">₹6.5L+</div>
            <div className="text-xs text-slate-500 font-semibold">Available Grants</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">2</div>
            <div className="text-xs text-slate-500 font-semibold">Live Classroom Capstones</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">80</div>
            <div className="text-xs text-slate-500 font-semibold">Students in Live Labs</div>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white p-1 rounded-2xl shadow-xs overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('board')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'board'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Industry Collaboration Marketplace ({collaborations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Live Classroom Capstones (2 Active)</span>
        </button>

        <button
          onClick={() => setActiveTab('upskilling')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'upskilling'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Sponsored Faculty Training (FDP)</span>
        </button>
      </div>

      {/* Sub Panels */}
      {activeTab === 'board' && (
        <CollaborationBoard />
      )}

      {activeTab === 'projects' && (
        <ClassroomProjectIntegrator />
      )}

      {activeTab === 'upskilling' && (
        <FacultyUpskilling />
      )}
    </div>
  );
};
