import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  INITIAL_STUDENT,
  INDUSTRY_JOBS,
  CANDIDATES_POOL,
  FACULTY_COLLABORATIONS,
  CORPORATE_TRAINING_PROGRAMS,
  INSTITUTION_METRICS
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current active role view: 'student' | 'industry' | 'faculty' | 'institution'
  const [role, setRole] = useState('student');

  // Backend connection status
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [loading, setLoading] = useState(true);

  // Core Data States
  const [student, setStudent] = useState(INITIAL_STUDENT);
  const [jobs, setJobs] = useState(INDUSTRY_JOBS);
  const [candidates, setCandidates] = useState(CANDIDATES_POOL);
  const [collaborations, setCollaborations] = useState(FACULTY_COLLABORATIONS);
  const [trainingPrograms, setTrainingPrograms] = useState(CORPORATE_TRAINING_PROGRAMS);
  const [institutionData, setInstitutionData] = useState(INSTITUTION_METRICS);

  // Active Toast Notifications
  const [toasts, setToasts] = useState([]);

  const notify = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper to calculate verified skill match percentage between candidate skills & job requirements
  const calculateMatchScore = (candidateSkills = {}, requiredSkills = {}) => {
    if (!requiredSkills || Object.keys(requiredSkills).length === 0) return 100;
    
    let totalWeight = 0;
    let earnedWeight = 0;

    Object.entries(requiredSkills).forEach(([skillName, requiredLevel]) => {
      totalWeight += requiredLevel;
      const candidateLevel = candidateSkills[skillName] || 0;
      earnedWeight += Math.min(candidateLevel, requiredLevel);
    });

    if (totalWeight === 0) return 100;
    return Math.round((earnedWeight / totalWeight) * 100);
  };

  // Initial load from Express backend (falls back to mock data if offline)
  const syncWithBackend = async () => {
    try {
      const health = await api.checkHealth();
      if (health && health.status === 'healthy') {
        setIsLiveBackend(true);
        // console.log('syncing with express backend on :5000...');

        const [fetchedStudent, fetchedJobs, fetchedCollabs, fetchedTraining, fetchedMetrics, fetchedCandidates] = await Promise.all([
          api.getStudent('std-2024-8821').catch(() => INITIAL_STUDENT),
          api.getJobs().catch(() => INDUSTRY_JOBS),
          api.getCollaborations().catch(() => FACULTY_COLLABORATIONS),
          api.getTraining().catch(() => CORPORATE_TRAINING_PROGRAMS),
          api.getInstitutionMetrics().catch(() => INSTITUTION_METRICS),
          api.getInstitutionStudents().catch(() => CANDIDATES_POOL)
        ]);

        if (fetchedStudent) {
          setStudent(prev => ({
            ...prev,
            ...fetchedStudent,
            batchYear: fetchedStudent.batchYear || fetchedStudent.batch_year || prev.batchYear || '2025 (Final Year)',
            portfolioHash: fetchedStudent.portfolioHash || fetchedStudent.portfolio_hash || prev.portfolioHash,
            lastAssessmentDate: fetchedStudent.lastAssessmentDate || fetchedStudent.last_assessment_date || prev.lastAssessmentDate,
            readinessScore: fetchedStudent.readinessScore ?? fetchedStudent.readiness_score ?? prev.readinessScore ?? 78,
            skills: fetchedStudent.skills || prev.skills || {},
            verifiedProjects: fetchedStudent.verifiedProjects || fetchedStudent.verified_projects || prev.verifiedProjects || [],
            credentials: fetchedStudent.credentials || prev.credentials || [],
            appliedJobs: fetchedStudent.appliedJobs || fetchedStudent.applied_jobs || prev.appliedJobs || []
          }));
        }
        if (fetchedJobs && Array.isArray(fetchedJobs)) {
          setJobs(fetchedJobs.map(j => ({
            ...j,
            applicantsCount: j.applicantsCount ?? j.applicants_count ?? 0,
            requiredSkills: j.requiredSkills ?? j.required_skills ?? {},
            preferredSkills: j.preferredSkills ?? j.preferred_skills ?? [],
            verifiedMatchThreshold: j.verifiedMatchThreshold ?? j.verified_match_threshold ?? 70
          })));
        }
        if (fetchedCollabs && Array.isArray(fetchedCollabs)) {
          setCollaborations(fetchedCollabs.map(c => ({
            ...c,
            sponsorAmount: c.sponsorAmount ?? c.sponsor_amount ?? '',
            facultyApplicants: c.facultyApplicants ?? c.faculty_applicants ?? 0
          })));
        }
        if (fetchedTraining && Array.isArray(fetchedTraining)) {
          setTrainingPrograms(fetchedTraining.map(t => ({
            ...t,
            targetGap: t.targetGap ?? t.target_gap ?? '',
            studentsEnrolled: t.studentsEnrolled ?? t.students_enrolled ?? 0,
            completionRate: t.completionRate ?? t.completion_rate ?? '0%'
          })));
        }
        if (fetchedMetrics) {
          setInstitutionData(prev => ({
            ...prev,
            ...fetchedMetrics,
            collegeName: fetchedMetrics.collegeName ?? fetchedMetrics.college_name ?? prev.collegeName,
            totalStudents: fetchedMetrics.totalStudents ?? fetchedMetrics.total_students ?? prev.totalStudents,
            placementReadinessIndex: fetchedMetrics.placementReadinessIndex ?? fetchedMetrics.placement_readiness_index ?? prev.placementReadinessIndex,
            departmentBreakdown: fetchedMetrics.departmentBreakdown ?? fetchedMetrics.department_breakdown ?? prev.departmentBreakdown,
            curriculumSkillGaps: fetchedMetrics.curriculumSkillGaps ?? fetchedMetrics.curriculum_skill_gaps ?? prev.curriculumSkillGaps
          }));
        }
        if (fetchedCandidates && Array.isArray(fetchedCandidates)) {
          setCandidates(fetchedCandidates);
        }
      } else {
        setIsLiveBackend(false);
      }
    } catch (err) {
      console.warn('Backend connection error, continuing in local fallback mode:', err);
      setIsLiveBackend(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncWithBackend();
  }, []);

  // Record quiz score and upgrade student skills via Backend API
  const recordQuizResults = async (scorePercentage, targetedSkillsUpgrades) => {
    // Optimistic UI update
    setStudent(prev => {
      const updatedSkills = { ...prev.skills };
      Object.entries(targetedSkillsUpgrades).forEach(([skill, boost]) => {
        const current = updatedSkills[skill] || 30;
        updatedSkills[skill] = Math.min(100, Math.round(current + boost));
      });
      const skillValues = Object.values(updatedSkills);
      const newReadiness = Math.round(skillValues.reduce((a, b) => a + b, 0) / skillValues.length);
      return {
        ...prev,
        skills: updatedSkills,
        readinessScore: newReadiness,
        lastAssessmentDate: new Date().toISOString().split('T')[0]
      };
    });

    if (isLiveBackend) {
      try {
        const res = await api.submitQuiz(student.id, targetedSkillsUpgrades);
        if (res.student) {
          setStudent(res.student);
          // Refresh candidates list from backend
          const updatedCands = await api.getInstitutionStudents();
          if (updatedCands) setCandidates(updatedCands);
        }
      } catch (err) {
        console.error('API Quiz sync error:', err);
      }
    }

    notify(`Assessment completed! Your verified skills have been securely saved to the database.`, 'success');
  };

  // Apply to a job listing via Backend API
  const applyToJob = async (jobId) => {
    if (student.appliedJobs && student.appliedJobs.some(j => j.jobId === jobId)) {
      notify('You have already applied for this opening!', 'info');
      return;
    }

    const job = jobs.find(j => j.id === jobId);
    const matchScore = calculateMatchScore(student.skills, job ? job.requiredSkills : {});

    // Optimistic UI update
    setStudent(prev => ({
      ...prev,
      appliedJobs: [...(prev.appliedJobs || []), {
        jobId,
        appliedAt: new Date().toISOString().split('T')[0],
        status: matchScore >= (job?.verifiedMatchThreshold || 70) ? 'Auto-Shortlisted (Verified)' : 'Under Review'
      }]
    }));

    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicantsCount: (j.applicantsCount || 0) + 1 } : j));

    if (isLiveBackend) {
      try {
        await api.applyJob(student.id, jobId, matchScore);
      } catch (err) {
        console.error('API Job apply error:', err);
      }
    }

    notify(`Application submitted to ${job ? job.company : 'Company'}! Match Score: ${matchScore}%`, 'success');
  };

  // Industry: Post a new job via Backend API
  const addJob = async (newJobData) => {
    const tempJob = {
      ...newJobData,
      id: `job-${Date.now()}`,
      applicantsCount: 0,
      status: 'Actively Hiring'
    };

    setJobs(prev => [tempJob, ...prev]);

    if (isLiveBackend) {
      try {
        const created = await api.postJob(newJobData);
        if (created) {
          setJobs(prev => [created, ...prev.filter(j => j.id !== tempJob.id)]);
        }
      } catch (err) {
        console.error('API Post job error:', err);
      }
    }

    notify(`New opening for "${newJobData.title}" posted to database with verified skill filters!`, 'success');
  };

  // Faculty: Apply for industry collaboration via Backend API
  const applyForCollaboration = async (rfpId) => {
    setCollaborations(prev => prev.map(item => {
      if (item.id === rfpId) {
        return {
          ...item,
          facultyApplicants: (item.facultyApplicants || 0) + 1
        };
      }
      return item;
    }));

    if (isLiveBackend) {
      try {
        await api.applyCollaboration(rfpId);
      } catch (err) {
        console.error('API apply collaboration error:', err);
      }
    }

    notify(`Collaboration proposal submitted to industry lead!`, 'success');
  };

  // Reset to initial state for demo testing via Backend API
  const resetAllData = async () => {
    if (isLiveBackend) {
      try {
        await api.resetDatabase();
        await syncWithBackend();
      } catch (err) {
        console.error('API reset error:', err);
      }
    } else {
      setStudent(INITIAL_STUDENT);
      setJobs(INDUSTRY_JOBS);
      setCollaborations(FACULTY_COLLABORATIONS);
      setCandidates(CANDIDATES_POOL);
      setTrainingPrograms(CORPORATE_TRAINING_PROGRAMS);
      setInstitutionData(INSTITUTION_METRICS);
    }
    notify('Database successfully reset to initial seed state.', 'info');
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      student,
      setStudent,
      recordQuizResults,
      applyToJob,
      jobs,
      addJob,
      candidates,
      collaborations,
      applyForCollaboration,
      trainingPrograms,
      institutionData,
      calculateMatchScore,
      toasts,
      notify,
      removeToast,
      resetAllData,
      isLiveBackend,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
