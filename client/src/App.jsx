import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { RoleBanner } from './components/common/RoleBanner';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/common/AuthModal';
import { StudentDashboard } from './components/student/StudentDashboard';
import { IndustryDashboard } from './components/industry/IndustryDashboard';
import { FacultyDashboard } from './components/faculty/FacultyDashboard';
import { InstitutionDashboard } from './components/institution/InstitutionDashboard';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

const MainLayout = () => {
  const { role } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RoleBanner />

        {role === 'student' && <StudentDashboard />}
        {role === 'industry' && <IndustryDashboard />}
        {role === 'faculty' && <FacultyDashboard />}
        {role === 'institution' && <InstitutionDashboard />}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">SkillSync Nexus</span>
            <span>• SIH Prototype</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              API Connected
            </span>
            <span>•</span>
            <span>Internal Hackathon Build</span>
          </div>
        </div>
      </footer>

      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
